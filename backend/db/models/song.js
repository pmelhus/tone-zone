'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    playlistId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.User, {foreignKey: 'userId'})
    Song.belongsTo(models.Playlist, {foreignKey: 'playlistId'})
    Song.hasMany(models.Comment, {foreignKey:'songId'})
  };

  Song.upload = async function({userId, title, url}) {
    const song = await Song.create({
      userId, title, url
    })
    return Song.findByPk(song.id)
  };

  return Song;
};
