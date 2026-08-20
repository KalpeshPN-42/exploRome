const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    mongoose.connect("mongodb://127.0.0.1:27017/explorome");
}

const intiDB = async () => {
    // await Listing.deleteMany({});
    initData.data = initData.data.map((el) => {
        return {
            ...el,
            owner: new mongoose.Types.ObjectId("6a2fa7e9424a52665969676d"),
        };
    });
    await Listing.insertMany(initData.data);
};

intiDB();
