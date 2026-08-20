const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
