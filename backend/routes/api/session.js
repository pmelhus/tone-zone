const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

router.post(
  "/",
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const error = new Error("Login failed");
      error.status = 401;
      error.title = "Login failed";
      error.errors = ["The provided credentials were invalid."];
      // console.log('==============')
      return next(error);
    }

    await setTokenCookie(res, user);
    return res.json({
      user,
    });
  })
  );

  router.delete("/", (_req, res) => {
    res.clearCookie("token");
    return res.json({ message: "success" });
  });

  router.get("/", restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
      // console.log(user)
      return res.json({
        user: user.toSafeObject(),
      });
  } else return res.json({});
});

module.exports = router;
