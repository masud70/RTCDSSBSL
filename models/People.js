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
            type: Date,
            default: Date.now,
        },
        currentOfficeJoinDate: {
            type: Date,
            default: Date.now,
        },
        dateOfPRL: {
            type: Date,
            default: Date.now,
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
    },
    {
        timestamp: true,
    }
);

const People = mongoose.model("People", peopleSchema);

module.exports = People;
