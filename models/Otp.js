const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Otp = sequelize.define("Otp", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Otp;
};
