const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ErrorClass = require("../utils/ErrorClass.js");
const passport = require("passport");
const { saveRedirectUrl, validateUser } = require("../middleware.js");
const {
    loginUser,
    logoutUser,
    signupUser,
} = require("../controllers/users.js");

router.post("/login", saveRedirectUrl, wrapAsync(loginUser));

router.post("/logout", wrapAsync(logoutUser));

router.post("/signup", validateUser, wrapAsync(signupUser));

module.exports = router;
