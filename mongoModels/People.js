const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema(
    {
        nameBn: {
            type: String,
            required: true,
            trim: true,
        },
        nameEn: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        mobile: {
            type: String,
        },
        designation: {
            type: String,
            required: true,
            trim: true,
        },
        currentOffice: {
            type: String,
            trim: true,
        },
        dob: {
            type: String,
            default: null,
        },
        currentOfficeJoinDate: {
            type: String,
            default: null,
        },
        dateOfPRL: {
            type: String,
            default: null,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
            require: true,
        },
        avatar: {
            type: String,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        courseInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    },
    {
        timestamp: true,
    }
);

const People = mongoose.model("People", peopleSchema);

module.exports = People;
