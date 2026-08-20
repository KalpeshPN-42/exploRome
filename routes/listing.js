const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ErrorClass = require("../utils/ErrorClass.js");
const { listingSchema } = require("../schemas/schema.js");
const flash = require("connect-flash");
const { isLoggedIn, validateListingWithFileCreate ,validateListingWithFileEdit} = require("../middleware.js");
const {
    searchListing,
    getListings,
    editListing,
    showListing,
    destroyListing,
    getNewListing,
    createNewListing,
} = require("../controllers/listings.js");
const path = require("path");
const multer = require("multer");
const {storage,cloudinary}=require("../cloudConfig.js");
const upload = multer({ storage });

//search route through searchbar

router.get("/search", wrapAsync(searchListing));

// index route

router.get("/", getListings);

//getting form for creating the listing and creating the listing route respectively

router
    .route("/new")
    .get(isLoggedIn, getNewListing)
    .post(isLoggedIn,upload.single("image"),validateListingWithFileCreate, wrapAsync(createNewListing));

//show listing route,edit listing route and destroy listing route respectively

router
    .route("/:id")
    .get(wrapAsync(showListing))
    .patch(isLoggedIn,upload.single("image"),validateListingWithFileEdit, wrapAsync(editListing))
    .delete(isLoggedIn,wrapAsync(destroyListing));

module.exports = router;
