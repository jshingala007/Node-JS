const express = require('express');
const { ViewMovie, AddMovie, insertMovie, deleteMovie, editMovie, UpdateMovie } = require('../controller/movieController');

const routes = express.Router();

// file upload 
const multer = require('multer');
const st = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,'uploads')
    },
    filename : (req,file,cb) => {
        const uniqname = Date.now();
        cb(null, `${file.fieldname}-${uniqname}`);
    }
})
const fileUpload = multer({storage : st}).single('image');




routes.get('/',ViewMovie);
routes.get('/add',AddMovie);
routes.post('/insertMovie',fileUpload,insertMovie);
routes.get('/deleteMovie',deleteMovie)
routes.get('/editMovie',editMovie)
routes.post('/UpdateMovie',fileUpload,UpdateMovie)



module.exports = routes

