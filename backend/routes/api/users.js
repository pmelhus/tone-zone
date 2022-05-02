const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { singleMulterUpload, singlePublicFileUpload} = require('../../awsS3')

const router = express.Router();

router.post(
  '/',
  singleMulterUpload('image'),
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const profileImageUrl = await singlePublicFileUpload(req.file);
    console.log(profileImageUrl)
    const user = await User.signup({ email, username, password, profileImageUrl });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

module.exports = router;
