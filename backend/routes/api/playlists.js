const songs = require("../../db/models");
const csurf = require("csurf");
const express = require("express");
const asyncHandler = require("express-async-handler");
// const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

const {
  Song,
  User,
  Comment,
  SongPlaylist,
  Playlist,
} = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const allPlaylists = await Playlist.findAll({
      include: User,
    });

    return res.json(allPlaylists);
  })
);

router.get(
  "/songs/:id",
  asyncHandler(async function (req, res) {
    const id = req.params.id;
    const allSongs = await SongPlaylist.findAll({
      where: { playlistId: id },
    });
    // console.log(allSongs);
    return res.json(allSongs);
  })
);
router.get(
  "/:id",
  asyncHandler(async function (req, res) {
    const { id } = req.params;
    const playlist = await Playlist.findByPk(id, {
      include: [Song, User],
    });

    return res.json(playlist);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    // console.log(req.body)
    const { title, song, user } = req.body;
    const userId = user.id;
    // console.log(url)
    const imageUrl = song.imageUrl

    const playlist = await Playlist.create({
      title,
      userId,
      imageUrl
    });
    const songId = song.id;
    const playlistId = playlist.id;
    // console.log(song, '===============SONG')

    await SongPlaylist.create({
      playlistId,
      songId

    });

    return res.json({
      playlist,
      user,
      song,
    });
  })
);
router.post(
  "/song",
  asyncHandler(async (req, res) => {
    const playlistId = req.body.playlist.id;
    const songId = req.body.song.id;
    // await console.log(songId)

    const data = req.body;
    await SongPlaylist.create({
      playlistId,
      songId,
      include: Song,
    });
    return res.json({
      data,
    });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.body.id;
    const playlist = await Playlist.findByPk(id);

    await SongPlaylist.destroy({
      where: {
        playlistId: id,
      },
    });
    await playlist.destroy();
    return res.json(playlist);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req,res) => {
    const id = req.body.id
    // console.log(id)
    const reqTitle = req.body.title
    const thePlaylist = await Playlist.findByPk(id)
    await console.log(thePlaylist, '=============')


    const editedPlaylist = await thePlaylist.update({
      title: reqTitle
    })
    return res.json(editedPlaylist)
  })
)

router.delete(
  "/song/:id",
  asyncHandler(async (req, res) => {
    // console.log(req.body)
    const songId = req.body.song.id
    const playlistId = req.body.playlist.id

    const deletedSong = await SongPlaylist.destroy({
      where: {
        playlistId: playlistId,
        songId: songId
      },
    });

    return res.json(req.body);
  })
);

module.exports = router;
