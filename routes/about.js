const express = require("express");
const router = express.Router();

//about

router.get("/", (req, res) => {
    res.render("pages/about.ejs")
});

//privacy

router.get("/privacy", (req, res) => {
    res.render("pages/privacy.ejs");
});

//terms

router.get("/term", (req, res) => {
    res.render("pages/terms.ejs");
});

module.exports = router;
