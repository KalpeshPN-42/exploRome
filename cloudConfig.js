const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Set up Multer Storage engine for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "listings_Images", // The folder name in your Cloudinary account
        allowed_formats: ["png", "jpg", "jpeg"],
        transformation: [
            { width: 1200, height: 800, crop: "limit", quality: "auto" },
        ],
    },
});

module.exports = {
    cloudinary,
    storage,
};
