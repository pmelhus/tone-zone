"use strict";
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define(
    "Song",
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {}
  );

  Song.associate = function (models) {
    const columnMapping = {
      through: 'SongPlaylist',
      otherKey: 'playlistId',
      foreignKey: 'songId'
    }
    Song.belongsTo(models.User, { foreignKey: "userId" });
    Song.belongsToMany(models.Playlist, columnMapping);
    Song.hasMany(models.Comment, { foreignKey: "songId", onDelete: 'CASCADE', hooks: true });
  };

  Song.upload = async function ({ userId, title, description, url }) {
    const song = await Song.create({
      userId,
      title,
      description,
      url,
    });
    return Song.findByPk(song.id);
  };

  return Song;
};
