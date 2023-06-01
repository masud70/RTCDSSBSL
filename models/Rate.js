const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Rate = sequelize.define("Rate", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        rate: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });
    Rate.associate = (models) => {
        Rate.belongsTo(models.User);
    };
    return Rate;
};
