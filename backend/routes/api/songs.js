const songs = require("../../db/models");
const csurf = require("csurf");
const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  singleMulterUpload,
  singlePublicFileUpload,
  multipleMulterUpload,
  multiplePublicFileUpload,
} = require("../../awsS3");

// const songValidations = require('../../utils/songs')
const { Song, User, Comment } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const allSongs = await Song.findAll({
      include: User
    });
    // const comments = await Comment.findAll({ where: { songId: id } });
    // console.log(allSongs);
    return res.json(allSongs);
  })
);

router.get(
  "/:id",
  asyncHandler(async function (req, res) {
    const { id } = req.params;
    const song = await Song.findByPk(id, {
      include: User,
    });

    return res.json(song);
  })
);

router.post(
  "/",
  multipleMulterUpload("files"),

  asyncHandler(async (req, res) => {
    const { userId, title, description } = req.body;

    // console.log(req.body);
    const files = await multiplePublicFileUpload(req.files);

    const url = files[0];
    const imageUrl = files[1];
    // console.log(image, "======================")
    // const imageUrl = await singlePublicFileUpload(req.)
    const user = await User.findByPk(userId);
    // console.log(url)
    const song = await Song.upload({
      userId,
      title,
      description,
      url,
      imageUrl,
    });
    return res.json({
      song,
      user,
    });
  })
);

router.put(
  "/:id",
  asyncHandler(async function (req, res) {
    // console.log(req.body)
    const id = req.body.songId;
    const reqTitle = req.body.title;
    const reqDescription = req.body.description;
    const song = await Song.findByPk(id);
    // console.log(song)
    // delete id;
    const editedSong = await song.update({
      title: reqTitle,
      description: reqDescription,
    });

    return res.json(editedSong);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const song = await Song.findByPk(id);
   
    await song.destroy();
    return res.json(song);
  })
);

module.exports = router;
