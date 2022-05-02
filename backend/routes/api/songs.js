const songs = require("../../db/models");
const csurf = require("csurf");
const express = require("express");
const asyncHandler = require("express-async-handler");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

const { Song } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const allSongs = await songs.findAll();
    return res.json(allSongs);
  })
);

router.post(
  "/",
  singleMulterUpload("audio"),
  asyncHandler(async (req, res) => {
    const { userId, title } = req.body;
    const url= await singlePublicFileUpload(req.file);
    console.log(url)
    const song = await Song.upload({
      userId,
      title,
      url
    });
    return res.json({
      song,
    });
  })
);

module.exports = router;
