'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  
  Playlist.associate = function(models) {
    const columnMapping = {
      through: 'SongPlaylist',
      otherKey: 'songId',
      foreignKey: 'playlistId'
    }
    Playlist.belongsToMany(models.Song, columnMapping)
    Playlist.belongsTo(models.User, {foreignKey:'userId'})
  };
  return Playlist;
};
