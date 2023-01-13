const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    Comment.associate = (models) => {
        Comment.belongsTo(models.User);
        Comment.belongsTo(models.Post);
    };
    return Comment;
};
