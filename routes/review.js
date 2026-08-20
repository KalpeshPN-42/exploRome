const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/Review.js");
const Listing = require("../models/Listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ErrorClass = require("../utils/ErrorClass.js");
const { isLoggedIn, isAuthor, validateReview } = require("../middleware.js");
const { createReview, destroyReview } = require("../controllers/reviews.js");

// post route for Creating the review
router.post("/", validateReview, wrapAsync(createReview));

//destroy route for deleting the review
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(destroyReview));

module.exports = router;
