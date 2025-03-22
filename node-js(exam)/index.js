const express = require("express");
const port = 8080;
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport");
const connectDB = require('./config/db');
const path = require("path");
const app = express();
const isAuthenticated = require("./middleware/auth");
const flash = require("connect-flash");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = {
    error: req.flash("error"),
    success: req.flash("success"),
  };
  next();
});

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// Redirect root to login page
app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

// Auth routes
app.get("/auth/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
    messages: req.flash() || {},
    user: req.user || null,
  });
});

app.get("/auth/register", (req, res) => {
  res.render("auth/register", {
    title: "Register",
    messages: req.flash() || {},
    user: req.user || null,
  });
});

app.get("/", (req, res) => {
  res.render("index", {
    user: req.user || null, // Pass user data to the template
  });
});

// Registration Route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      req.flash('error', 'Email is already registered');
      return res.redirect('/register');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    await newUser.save();
    req.flash('success', 'Registration successful! Please login.');
    res.redirect('/login');
  } catch (err) {
    req.flash('error', 'Registration failed. Please try again.');
    res.redirect('/register');
  }
});

// Login Route
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      req.flash('error', 'An error occurred during login');
      return res.redirect('/login');
    }
    if (!user) {
      req.flash('error', info.message || 'Invalid email or password');
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        req.flash('error', 'Login failed');
        return res.redirect('/login');
      }
      req.flash('success', 'Welcome back!');
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

// Call the connect function
connectDB()
  .then(() => {
    // Start your server or perform other operations after successful connection
    app.listen(port, () => {
      console.log(`Server is running on port  http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });
