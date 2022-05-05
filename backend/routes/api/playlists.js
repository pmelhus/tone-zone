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

router.post(
  "/",
  asyncHandler(async (req, res) => {
    // console.log(req.body)
    const { title, song, user } = req.body;
    const userId = user.id;
    // console.log(url)
    const playlist = await Playlist.create({
      title,
      userId,
    });
    const songId = song.id;
    const playlistId = playlist.id;

    await SongPlaylist.create({
      playlistId,
      songId,
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
    });
    return res.json({
      data,
    });
  })
);

module.exports = router;
