const isAuthenticated = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    }
    throw new Error("Authentication required");
  } catch (error) {
    console.error("Authentication middleware error:", error);
    res.status(401).json({
      message: "Please log in to access this resource",
      error: error.message,
    });
  }
};

module.exports = isAuthenticated;
