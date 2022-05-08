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

    const user = await User.signup({ email, username, password, profileImageUrl });

    await setTokenCookie(res, user);
// console.log(user, 'YAAAAAAAAAAA')
    return res.json({
      user
    });
  })
);

module.exports = router;
