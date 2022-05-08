"use strict";
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define(
    "Song",
    {
      userId: DataTypes.INTEGER,
      title: {
        allowNull: false,
        validate: {
          len: {
            args: [2, 50],
            msg: "Title must have more than 2 characters and less than 50 ",
          },
        },
        type: DataTypes.STRING(50),
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [2, 250],
            msg: "Description must have more than 2 characters and less than 250",
          },
        },
      },

      url: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {}
  );

  Song.associate = function (models) {
    const columnMapping = {
      through: "SongPlaylist",
      otherKey: "playlistId",
      foreignKey: "songId",
    };
    Song.belongsTo(models.User, { foreignKey: "userId" });
    Song.belongsToMany(models.Playlist, columnMapping);
    Song.hasMany(models.Comment, {
      foreignKey: "songId",
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  Song.upload = async function ({ userId, title, description, url, imageUrl }) {
    console.log(imageUrl)
    const song = await Song.create({
      userId,
      title,
      description,
      url,
      imageUrl
    });
    return Song.findByPk(song.id);
  };

  return Song;
};
