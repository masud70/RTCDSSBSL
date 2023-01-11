const bcrypt = require("bcrypt");
const Course = require("../mongoModels/Course");
const User = require("../mongoModels/People");

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
    register: (req, res, next) => {
        let user = req.body;
        const hashedPassword = bcrypt.hashSync("User@123", 10);
        user.password = hashedPassword;

        req.db.User.findAll({ where: { phone: user.phone } })
            .then((users) => {
                // console.log(users);
                if (users.length > 0) next("Phone number already registered.");
                else {
                    req.db.User.create(user, {
                        fields: [
                            "email",
                            "password",
                            "nameBn",
                            "nameEn",
                            "designation",
                            "currentOffice",
                            "dob",
                            "currentOfficeJoinDate",
                            "dateOfPRL",
                            "phone",
                        ],
                    })
                        .then((resp) => {
                            delete resp.password
                            res.json({
                                status: true,
                                message: "User registered successfully!",
                                newUser: resp,
                            });
                        })
                        .catch((error2) => next(error2.message));
                }
            })
            .catch((error) => next(error.message));
    },

    //Update employee data
    updateEmployee: (req, res) => {
        User.findByIdAndUpdate(req.body._id, req.body, { new: true })
            .then((response) => {
                req.io.emit("updated", response);
                res.json({
                    status: "success",
                    message: "Data updated successfully!",
                });
            })
            .catch((error) => {
                res.json({
                    status: "error",
                    message: "There was an error. Please try again.",
                });
            });
    },

    //Delete an employee
    deleteEmployee: (req, res) => {
        User.deleteOne({ _id: req.body.id })
            .then((response) => {
                if (response.acknowledged) {
                    res.json({
                        status: "success",
                        message: "Employee deleted successfully!",
                    });
                } else {
                    res.json({
                        status: "error",
                        message: "There was an error. Please try again.",
                    });
                }
            })
            .catch((err) => {
                res.json({
                    status: "error",
                    message: "There was an error. Please try again.",
                });
            });
    },

    // Get Data
    getData: async (req, res) => {
        try {
            const users = await User.find({
                status: "active",
                role: "user",
            }).populate("courseInfo");
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

    updateCourse: (req, res, next) => {
        const newCourse = new Course({
            courseName: req.body.courseName,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        });

        newCourse
            .save()
            .then((response) => {
                User.findByIdAndUpdate(
                    req.body.userId,
                    { courseInfo: response._id },
                    { new: true },
                    (err, result) => {
                        if (err) next(err.message);
                        else if (result && req.body._id) {
                            Course.findByIdAndRemove(req.body._id, (e, r) => {
                                console.log(e, r);
                                if (e) {
                                    res.json({
                                        status: true,
                                        message: "Data updated successfully!",
                                        previousDeleted: false,
                                    });
                                } else {
                                    res.json({
                                        status: true,
                                        message: "Data updated successfully!",
                                        previousDeleted: true,
                                    });
                                }
                            });
                        } else {
                            res.json({
                                status: true,
                                message: "Data updated successfully!",
                                previousDeleted: false,
                            });
                        }
                    }
                );
            })
            .catch((err) => next(err.message));
    },
};
