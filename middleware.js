const Review = require("./models/Review.js");
const {
    listingSchema,
    reviewSchema,
    userSchema,
} = require("./schemas/schema.js");
const { ErrorClass } = require("./utils/ErrorClass.js");

module.exports.isLoggedIn = async (req, res, next) => {
    req.session.redirectUrl = req.originalUrl;
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect(`/listing?login=true`);
};

module.exports.saveRedirectUrl = async (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId).populate("author");
    if (res.locals.currentUser._id.equals(review.author._id)) {
        return next();
    } else {
        res.redirect(`/listing/${id}`);
    }
};

module.exports.validateListingWithFileEdit = (req, res, next) => {
    let result = listingSchema.validate(req.body, { abortEarly: false });
    if (req.file) {
        req.body.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }

    const lng = parseFloat(req.body.longitude) || 73.8567;
    const lat = parseFloat(req.body.latitude) || 18.5204;

    req.body.geometry = {
        type: "Point",
        coordinates: [lng, lat],
    };
    
    if (result.error) {
        let errMsg = result.error.details.map((el) => el.message).join(",");
        throw new ErrorClass(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateListingWithFileCreate = (req, res, next) => {
    if (!req.file) {
        throw new ErrorClass(400, "Image file is strictly required!");
    }

    req.body.image = {
        url: req.file.path,
        filename: req.file.filename,
    };

    const lng = parseFloat(req.body.longitude) || 73.8567;
    const lat = parseFloat(req.body.latitude) || 18.5204;

    req.body.geometry = {
        type: "Point",
        coordinates: [lng, lat],
    };

    const { error } = listingSchema.validate(req.body, { allowUnknown: true });
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        throw new ErrorClass(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let result = reviewSchema.validate(req.body, { abortEarly: false });
    if (result.error) {
        let errMsg = result.error.details.map((el) => el.message).join(",");
        throw new ErrorClass(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(", ");
        return res.json({ success: false, message: errMsg });
    }
    next();
};
