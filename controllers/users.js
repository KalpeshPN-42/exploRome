const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ErrorClass = require("../utils/ErrorClass.js");
const passport = require("passport");

module.exports.loginUser = async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res
                .status(500)
                .json({ success: false, message: "Server error" });
        }

        if (!user) {
            return res.json({
                success: false,
                message: "Invalid credentials!",
            });
        }

        req.login(user, (loginErr) => {
            if (loginErr) {
                return res
                    .status(500)
                    .json({ success: false, message: "Login phase error" });
            }

            const redirectUrl = res.locals.redirectUrl || "/listing";

            return res.json({ success: true, redirectTo: redirectUrl });
        });
    })(req, res, next);
};

module.exports.logoutUser = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.json({ success: true, message: "Logged out successfully" });
    });
};

module.exports.signupUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        let userRegister = await User.register(newUser, password);
        req.login(userRegister, (err) => {
            if (err) {
                return next(err);
            }
            res.json({
                success: true,
                message: "User successfully registered!",
            });
        });
    } catch (err) {
        if (err) {
            res.json({ success: false, message: "User already exists!" });
        }
    }
};
