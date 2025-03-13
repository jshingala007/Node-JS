const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.get('/users', (req, res) => {
    try {
        const users = [
            { id: 1, name: "mitu", phone: 12345 },
            { id: 2, name: "milu", phone: 123456 },
            { id: 3, name: "raju", phone: 1234567 },
            { id: 4, name: "yashu", phone: 12345678 },
            { id: 5, name: "mihu", phone: 123456789 },
            { id: 6, name: "daxu", phone: 1234567891 },
        ];

        return res.status(200).json({
            success: true,
            message: "Users successfully fetched",
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: err.message
    });
});

const port = 9000;
app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
        process.exit(1);
    }
    console.log(`Server is running on port: ${port}`);
});