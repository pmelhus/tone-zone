'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  Playlist.associate = function(models) {
    Playlist.hasMany(models.Song, {foreignKey:'playlistId'})
    Playlist.belongsTo(models.User, {foreignKey:'userId'})
  };
  return Playlist;
};
