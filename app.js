if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const session = require("express-session");
const { MongoStore, createWebCryptoAdapter } = require("connect-mongo");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ErrorClass = require("./utils/ErrorClass.js");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User.js");

const ATLASDB_URL = process.env.ATLASDB_URL;

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const aboutsRouter = require("./routes/about.js");
const usersRouter = require("./routes/user.js");

const app = express();
const port = 8080;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL,
    cryptoAdapter: createWebCryptoAdapter({
        secret: process.env.SECRET,
    }),
    touchAfter: 24 * 3600, // Lazy session update (in seconds): updates store once per 24 hours if unmodified
});

store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE:", err);
});

app.use(cookieParser());
app.use(
    session({
        store: store,
        secret: process.env.SECRET || "thisshouldbeabettersecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: Date.now() + 14 * 24 * 60 * 60 * 1000, // 14 Days in milliseconds
            maxAge: 14 * 24 * 60 * 60 * 1000,
            httpOnly: true, // Shields cookie from client-side XSS attacks
        },
    }),
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new LocalStrategy({ usernameField: "email" }, User.authenticate()),
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    mongoose.connect(ATLASDB_URL);
}

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.invalidCredentials = req.flash("Invalid Credentials");
    next();
});

//best practice for production to keep our terminal clean
app.use((req, res, next) => {
    if (
        req.url.endsWith(".map") ||
        req.url.includes(".well-known") ||
        req.url === "/favicon.ico"
    ) {
        return res.status(204).end();
    }
    next();
});

app.get("/", (req, res) => {
    res.render("pages/welcome.ejs");
});

app.use("/listing", listingsRouter);
app.use("/listing/:id/review", reviewsRouter);
app.use("/about", aboutsRouter);
app.use("/user", usersRouter);

app.use((req, res, next) => {
    next(
        new ErrorClass(
            404,
            "Page Not Found! Please go to specific page like listing etc.",
        ),
    );
});

//error handling middleware

app.use((err, req, res, next) => {
    let { status = 500, message = "Something Went Wrong!" } = err;
    if (err.name === "CastError") {
        err.message = "Wrong request";
        res.render("listings/validationError.ejs", { err });
    } else if (err.name === "TypeError") {
        err.message = "Please enter valid inputs and don't keep them vacant!";
        res.render("listings/validationError.ejs", { err });
    } else {
        res.render("listings/validationError.ejs", { err });
    }
});

app.listen(port, () => {
    console.log("app is listening on port 8080");
});
