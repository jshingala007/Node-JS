const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8000;

// Connect to the database
connectDB();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Define the views directory explicitly
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Use `extended: true` for parsing nested objects
app.use(express.json());

//authentication start passportjs
const passport = require('passport');
const passportLocal = require("./config/passportLocal");
const session = require('express-session');
app.use(session({
    secret: 'adminpanel',
    name: 'admindashboard',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);
//authentication end passportjs

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define routes
app.use("/", require("./routes/indexRoute"));

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    }
    console.log(`Server is running on port ${port}`);
});
