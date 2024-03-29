const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        nameBn: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        nameEn: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.TEXT,
        },
        phone: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        designation: {
            type: DataTypes.STRING,
        },
        currentOffice: {
            type: DataTypes.STRING,
        },
        dob: {
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.TEXT,
            defaultValue: "images/user.jpg",
        },
        currentOfficeJoinDate: {
            type: DataTypes.STRING,
        },
        dateOfPRL: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "user",
        },
    });
    User.associate = (models) => {
        models.User.hasMany(models.Post);
        models.User.hasMany(models.Comment);
        models.User.hasMany(models.Reaction);
        models.User.hasMany(models.Sms);
        models.User.hasOne(models.Rate);
        models.User.hasOne(models.Course);
    };
    return User;
};
