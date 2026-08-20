const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/Review.js");
const Listing = require("../models/Listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ErrorClass = require("../utils/ErrorClass.js");

module.exports.createReview = async (req, res, next) => {
    let { rating, feedback } = req.body;
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
                model: "User",
            },
        })
        .populate("owner");
    if (res.locals.currentUser) {
        let newReview = new Review({
            rating,
            feedback,
            author: res.locals.currentUser._id,
        });
        listing.reviews.push(newReview);
        await listing.save();
        await newReview.save();
        req.flash("success", "New review added!");
        res.redirect(`/listing/${id}`);
    } else {
        res.redirect(`/listing/${id}`);
    }
};

module.exports.destroyReview = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId).populate("author");
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!");
    res.redirect(`/listing/${id}`);
};
