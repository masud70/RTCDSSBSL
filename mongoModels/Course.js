const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true,
            trim: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
    },
    {
        timestamp: true,
    }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
