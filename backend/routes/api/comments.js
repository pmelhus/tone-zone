const songs = require("../../db/models");
const csurf = require("csurf");
const express = require("express");
const asyncHandler = require("express-async-handler");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

const { Song, User, Comment } = require("../../db/models");

const router = express.Router();

router.post(
  "/", asyncHandler( async (req, res) => {

    const {userId, songId, body} = req.body;
    const comment = await Comment.create({
      userId, songId, body
    });
    return res.json(comment)
  })
)

router.get(
  "/", asyncHandler(async (req, res)=> {
    const allComments = await Comment.findAll({
      include: User, Song
    })
    return res.json(allComments)
  })
)

router.put(
  "/:id",
  asyncHandler(async function (req, res) {
    console.log(req.body)

    const commentId = req.body.comment.id
    const reqBody = req.body.body
    const comment = await Comment.findByPk(commentId);
    // console.log(song)
    // delete id;
    const editedSong = await comment.update({
      body: reqBody
    });

    return res.json(editedSong);
  })
);

module.exports = router
