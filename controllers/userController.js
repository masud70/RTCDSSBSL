const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register user controller
module.exports = {
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
        console.log(req.body);
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
