'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
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
    imageUrl: DataTypes.STRING
  }, {});

  Playlist.associate = function(models) {
    const columnMapping = {
      through: 'SongPlaylist',
      otherKey: 'songId',
      foreignKey: 'playlistId',
      onDelete: 'CASCADE',
      hooks: true
    }
    Playlist.belongsToMany(models.Song, columnMapping)
    Playlist.belongsTo(models.User, {foreignKey:'userId'})
  };
  return Playlist;
};
