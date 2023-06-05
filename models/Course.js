const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("Course", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        courseName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.TEXT,
        },
    });
    Course.associate = (models) => {
        models.Course.belongsTo(models.User);
    };
    return Course;
};
