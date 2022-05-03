const songs = require("../../db/models");
const csurf = require("csurf");
const express = require("express");
const asyncHandler = require("express-async-handler");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

const { Song, User } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const allSongs = await Song.findAll({
      include: User,
    });

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
  singleMulterUpload("audio"),
  asyncHandler(async (req, res) => {
    const { userId, title, description } = req.body;
    const url = await singlePublicFileUpload(req.file);
    // console.log(url)
    const song = await Song.upload({
      userId,
      title,
      description,
      url,
    });
    return res.json({
      song,
    });
  })
);

router.put(
  "/:id",
  asyncHandler(async function (req, res) {
// console.log(req.body)
const id = req.body.songId
    const reqTitle = req.body.title;
    const reqDescription = req.body.description;
    const song = await Song.findByPk(id);
    // console.log(song)
    // delete id;
    const editedSong = await song.update(
      {title:reqTitle, description:reqDescription},
    );

    return res.json(editedSong);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req,res) => {
    const id = req.params.id
    const song = await Song.findByPk(id)
   const deletedSong = await song.destroy()
   return res.json(deletedSong)
  })
)

module.exports = router;
