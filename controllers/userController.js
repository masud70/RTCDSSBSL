const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Sequelize } = require("sequelize");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mdmasud.csecu@gmail.com",
        pass: "icdwxmlvppmejbkw",
    },
});

//Register user controller
module.exports = {
    checkPhone: (req, res, next) => {
        req.db.User.findAll({ where: { phone: req.params.phone } })
            .then((data) => {
                if (data.length > 0) {
                    res.json({
                        status: true,
                        message: "Phone number found in database.",
                    });
                } else {
                    res.json({
                        status: false,
                        message: "Phone number not found in database.",
                    });
                }
            })
            .catch((error) => {
                next(error.message);
            });
    },

    checkMail: (req, res, next) => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const email = req.params.email;
        req.db.Otp.destroy({ where: { email: email } });
        req.db.Otp.create({ email: email, otp: otp })
            .then((data) => {
                if (!data) next("Otp generation failed.");
                console.log(data);
                var mailOptions = {
                    from: "mdmasud.csecu@gmail.com",
                    to: email,
                    subject: "Email verification",
                    html:
                        "Your OPT code is <h1>" +
                        otp +
                        "</h1>Please use this OTP to proceed.",
                };

                transporter.sendMail(mailOptions, function (errorMail, info) {
                    if (errorMail) {
                        next(errorMail.message);
                    } else {
                        res.json({
                            status: true,
                            message: "Email sent to " + email,
                            info,
                        });
                    }
                });
            })
            .catch((error) => {
                next(error.message);
            });
    },

    verifyOtp: (req, res, next) => {
        const data = req.params.data;
        const email = data.split("+")[0];
        const otp = data.split("+")[1];
        req.db.Otp.findOne({ where: { email: email, otp: otp } })
            .then((data) => {
                console.log(data);
                if (data) {
                    res.json({ status: true, message: "OTP verified!" });
                } else {
                    res.json({ status: false, message: "Incorrect OTP." });
                }
            })
            .catch((error) => {
                next(error.message);
            });
    },

    ratingHandler: (req, res, next) => {
        const rate = req.params.rate;
        const uid = req.body.auth.userId;
        req.db.Rate.destroy({ where: { UserId: uid } });
        req.db.Rate.create({ rate: rate, UserId: uid })
            .then((data) => {
                if (data) {
                    req.db.Rate.findOne({
                        attributes: [
                            [
                                Sequelize.fn("AVG", Sequelize.col("rate")),
                                "rate",
                            ],
                        ],
                        raw: true,
                    })
                        .then((data) => {
                            if (data) {
                                req.io.emit("updateRating", data.rate);
                                res.json({ status: true, rate: data.rate });
                            } else next("There was an error.");
                        })
                        .catch((error2) => next(error2.message));
                } else next("There was an error.");
            })
            .catch((error) => {
                next(error.message);
            });
    },

    getRating: (req, res, next) => {
        req.db.Rate.findOne({
            attributes: [[Sequelize.fn("AVG", Sequelize.col("rate")), "rate"]],
            raw: true,
        })
            .then((data) => {
                if (data) res.json({ status: true, rate: data.rate });
                else next("There was an error.");
            })
            .catch((error2) => next(error2.message));
    },

    getImageLink: (req, res, next) => {
        const phone = req.params.phone;

        req.db.User.findOne({ where: { phone: phone } })
            .then((data) => {
                if (data) res.json({ status: true, imageLink: data.avatar });
                else
                    res.json({
                        status: false,
                        message: "Phone number is not registered.",
                    });
            })
            .catch((error) => next(error.message));
    },

    // ============================================================== //
    registerController: (req, res, next) => {
        let user = req.body;
        const hashedPassword = bcrypt.hashSync("User@123", 10);
        user.password = hashedPassword;

        req.db.User.findAll({ where: { phone: user.phone } })
            .then((users) => {
                if (users.length > 0) next("Phone number already registered.");
                else {
                    req.db.User.create(user)
                        .then((resp) => {
                            console.log(resp);
                            res.json({
                                status: true,
                                message: "User registered successfully!",
                                newUser: user,
                            });
                        })
                        .catch((error2) => next(error2.message));
                }
            })
            .catch((error) => next(error.message));
    },

    loginController: (req, res, next) => {
        console.log("Login data", req.body);
        req.db.User.findOne({ where: { phone: req.body.phone } })
            .then((user) => {
                console.log(user);
                if (
                    user &&
                    bcrypt.compareSync(req.body.password, user.password)
                ) {
                    const token = jwt.sign(
                        {
                            phone: req.body.phone,
                            userId: user.id,
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "7d",
                        }
                    );
                    delete user.dataValues.password;
                    user.dataValues.token = token;
                    res.json({
                        status: true,
                        message: "Authentication successful",
                        userData: user,
                    });
                } else next("Inavalid password or user does not exists.");
            })
            .catch((er1) => next(er1.message));
    },

    getDataController: (req, res, next) => {
        req.db.User.findByPk(req.body.auth.userId, {
            attributes: {
                exclude: ["password"],
            },
        })
            .then((resp) => {
                if (resp) {
                    res.json({ status: true, userData: resp });
                } else next("Data not found.");
            })
            .catch((error) => next(error.message));
    },
};
