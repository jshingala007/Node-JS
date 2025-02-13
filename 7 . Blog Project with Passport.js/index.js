// const { urlencoded } = require("body-parser");
const express = require("express");
const app = express();
const port = 9000;
const path = require("path");

// view engine
app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, "public")));

// database attachment
const connectDB = require("./config/db");
connectDB();

// uploads path (image)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// passport
const passport = require("passport");
const passportLocal = require("./config/passportLocal");
const session = require("express-session");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);

// routes
app.use("/", require("./routes/indexRoute"));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log(`server run on ${port}`);
});
