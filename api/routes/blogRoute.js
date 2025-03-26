const express = require('express');

const routes = express.Router();

const { createBlog, viewBlog } = require('../controllers/BlogController');

const { verifyToken } = require('../middleware/Auth');

const multer = require('multer');

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniq = Math.floor(Math.random() * 1000000);
        cb(null, `${file.fieldname}-${uniq}`);
    }
})

const blogImage = multer({ storage: st }).single('blogimage')

routes.post('/createblog', verifyToken, blogImage, createBlog);
routes.get('/viewblog', verifyToken, viewBlog);

module.exports = routes;