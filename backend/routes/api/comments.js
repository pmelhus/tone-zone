const songs = require("../../db/models");
const csurf = require("csurf");
const express = require("express");
const asyncHandler = require("express-async-handler");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

const { Song, User } = require("../../db/models");

const router = express.Router();

router.post(
  "/", asyncHandler(async (req, res) => {
    const {userId, songId, body} = req.body;
    const comment = await Comment.create({
      userId, songId, body
    });
    return res.json(comment)
  })
)
