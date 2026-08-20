const mongoose = require("mongoose");
const Review = require("./Review.js");
const User = require("./User.js");
const { required } = require("joi");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    geometry:{
        type:{
            type:String,
            enum:["Point"],
            required:true
        },
        coordinates:{
            type:[Number],
            require:true,
        }
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
