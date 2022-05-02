const songs = require('../../db/models')
const csurf = require('csurf');
const express = require('express');
const asyncHandler = require('express-async-handler');

const { User } = require('../../db/models');

const router = express.Router();

router.get('/songs', asyncHandler(async function(req, res) {
  const allSongs = await songs.findAll()
  return res.json(allSongs)
}) )

router.post('/songs', asyncHandler = (req,res) => {

})

