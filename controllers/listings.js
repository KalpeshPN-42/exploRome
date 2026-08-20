const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ErrorClass = require("../utils/ErrorClass.js");
const flash = require("connect-flash");
const { isLoggedIn } = require("../middleware.js");
const { cloudinary } = require("../cloudConfig.js");

module.exports.searchListing = async (req, res, next) => {
    let { search } = req.query;
    let listings;
    if (search) {
        listings = await Listing.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } },
            ],
        });
    } else {
        listings = await Listing.find({});
    }
    res.render("listings/index.ejs", { listings });
};

module.exports.getListings = async (req, res, next) => {
    let listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
};

module.exports.getNewListing = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.createNewListing = async (req, res, next) => {
    req.body.owner = req.user._id;
    let newListing = await Listing.create(req.body);
    req.flash("success", "New Listing Created!");
    res.redirect("/listing");
};

module.exports.showListing = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: "author" })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing You Requested For Does Not Exist!");
        res.redirect("/listing");
    } else {
        res.render("listings/edit.ejs", { listing });
    }
};

module.exports.editListing = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    
    // Check if the listing actually exists
    if (!listing) {
        req.flash("error", "Listing you are trying to edit does not exist!");
        return res.redirect("/listing");
    }

    let currFileName=listing.image.filename;
    if (
        res.locals.currentUser &&
        res.locals.currentUser._id.equals(listing.owner)
    ) {
        await Listing.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            new: true,
        });

        if(req.file && currFileName){
            await cloudinary.uploader.destroy(currFileName);
        }
        req.flash("success", "Listing Updated!");
        return res.redirect(`/listing/${id}`);
    } else {
        req.flash("error", "You don't have permission to edit this listing!");
        return res.redirect(`/listing/${id}`);
    }
};

module.exports.destroyListing = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    await cloudinary.uploader.destroy(listing.image.filename);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listing");
};
