const express = require('express');
const routes = express.Router();

const { addpage , viewpage} = require('../controllers/CurdControllers');

routes.get('/',viewpage);
routes.get('/add',addpage);

module.exports=routes;