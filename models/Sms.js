const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Sms = sequelize.define("Sms", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ststus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sentBy: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });
    Sms.associate = (models) => {
        Sms.belongsTo(models.User);
    };
    return Sms;
};
