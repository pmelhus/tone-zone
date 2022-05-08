"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      userId: DataTypes.INTEGER,
      songId: DataTypes.INTEGER,
      body: {
        type: DataTypes.STRING(150),

        validate: {
          notEmpty: {
            args: true,
            msg: "Comments cannot be empty",
          },
          len: {
            args: [0, 150],
            msg: "Comments cannot be longer than 150 characters",
          },
        },
      },
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: "userId" });
    Comment.belongsTo(models.Song, { foreignKey: "songId" });
  };
  return Comment;
};
