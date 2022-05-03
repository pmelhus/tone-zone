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

      include: User
  });

    return res.json(allSongs);
  })
);

router.get(
  '/:id',
  asyncHandler(async function (req, res) {
    const {id} = req.params
    const song = await Song.findByPk(id, {
      include: User
    })
    return res.json(song)
  })
)

router.post(
  "/",
  singleMulterUpload("audio"),
  asyncHandler(async (req, res) => {
    const { userId, title, description } = req.body;
    const url= await singlePublicFileUpload(req.file);
    // console.log(url)
    const song = await Song.upload({
      userId,
      title,
      description,
      url
    });
    return res.json({
      song,
    });
  })
);

router.put(
  '/:id',
  asyncHandler(async function(req, res) {
    const {id} = req.params
    const reqTitle = req.body.title
    const reqDescription = req.body.description
    const song = await Song.findByPk(id, {
      include: User
    })
    const editedSong = Song.update(
      {title:reqTitle,
      description:reqDescription}
    )
    res.json(editedSong)
    console.log(res.json(editedSong))
  })
)



// router.delete(
//   '/',
//   asyncHandler(async (req,res) => {
//     const song = await Song.findByPk({})
//   })
// )

module.exports = router;
