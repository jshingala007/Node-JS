const http = require('http');
const fs = require('fs');
const port = 8000;

// Create the HTTP server
const app = http.createServer((req, res) => {
    let filename = '';

    // Set the content type header for HTML responses
    res.setHeader('Content-Type', 'text/html');

    // Determine which file to serve based on the URL
    switch (req.url) {
        case '/':
            filename = './index.html';
            break;
        case '/about':
            filename = './about.html';
            break;
        case '/contact':
            filename = './contact.html';
            break;
        default:
            filename = './404.html';
    }

    // Read the requested file
    fs.readFile(filename, (err, content) => {
        if (err) {
            console.error(err);
            res.statusCode = 500; // Internal Server Error
            return res.end('<h1>Internal Server Error</h1>');
        }
        res.statusCode = filename === './404.html' ? 404 : 200; // Set status code
        res.end(content);
    });
});

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Server is running on port: ${port}`);
});
