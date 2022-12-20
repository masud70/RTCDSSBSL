const bcrypt = require("bcrypt");
const { request } = require("express");
// const jwt = require('jsonwebtoken');
const User = require("../models/People");

module.exports = {
    //Check if the user
    checkData: async (req, res) => {
        try {
            let user;
            const data = req.body;
            console.log(data);

            switch (data.type) {
                case "nameBn":
                    user = await User.find({ nameBn: data.value });
                    break;
                case "nameEn":
                    user = await User.find({ nameEn: data.value });
                    break;
                case "email":
                    user = await User.find({ email: data.value });
                    break;
                default:
                    break;
            }

            let result = {};
            if (user && user.length > 0) {
                result.status = true;
                result.message = data.type + " already exists";
            } else {
                result.status = false;
                result.message = data.type + " does not exist";
            }
            res.json(result);
        } catch (error) {
            res.json({ status: true, message: "There was an error" });
        }
    },

    //Register a user
    register: async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash("PW123@45", 10);
            const newUser = new User({
                ...req.body,
                password: hashedPassword,
            });
            console.log(req.body);

            newUser
                .save()
                .then((response) => {
                    console.log(response);
                    req.io.emit("registered", response);
                    res.json({
                        status: true,
                        message: "User Registered Successfully",
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.json({
                        status: false,
                        message: "Register failed! Please try again.",
                    });
                });
        } catch (error) {
            console.log(error);
            res.json({ status: false, message: "There was an error" });
        }
    },

    // Get Data
    getData: async (req, res) => {
        try {
            const users = await User.find({
                status: "active",
                role: "user",
            });
            if (users && users.length > 0) {
                res.json({
                    status: true,
                    users: users,
                });
            } else {
                res.json({
                    status: false,
                    message: "No data found.",
                });
            }
        } catch (error) {
            res.json({
                status: false,
                message: "There was an error",
            });
        }
    },
};
