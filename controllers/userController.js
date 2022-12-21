const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/People");

//Register user controller
const registerController = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const username = req.body.email.split("@")[0];

        const newUser = new User({
            ...req.body,
            username: username,
            password: hashedPassword,
        });
        const result = await newUser.save();
        console.log(result);
        res.json({
            status: true,
            message: "User was added successfully!",
        });
    } catch {
        res.status(500).json({
            status: false,
            message: "Unknown error occurred!",
        });
    }
};

const loginController = async (req, res) => {
    try {
        const user = await User.findOne({
            mobile: req.body.mobile,
            status: "active",
        });

        if (user) {
            bcrypt
                .compare(req.body.password, user.password)
                .then(() => {
                    const token = jwt.sign(
                        {
                            mobile: user.mobile,
                            userId: user._id,
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "7d",
                        }
                    );
                    user.password = null;

                    res.json({
                        status: "success",
                        token: token,
                        userData: user,
                        message: "Login successful.",
                    });
                })
                .catch((error) => {
                    res.json({
                        status: "error",
                        message: "Authentication failed!",
                    });
                });
        } else {
            res.json({
                status: "error",
                message: "User is not registered.",
            });
        }
    } catch {
        res.json({
            status: "error",
            message: "Authentication failed!",
        });
    }
};

const getDataController = async (req, res, next) => {
    console.log(req.body);
    try {
        const user = await User.find({ _id: req.body.userId });
        if (user && user.length > 0) {
            user[0].password = null;
            res.json({
                status: true,
                userData: user[0],
            });
        } else {
            res.json({
                status: false,
                message: "User data not found",
            });
        }
    } catch (error) {
        res.json({
            status: false,
            message: "User data not found",
        });
    }
};

module.exports = {
    registerController,
    loginController,
    getDataController,
};
