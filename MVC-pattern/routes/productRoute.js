const express = require('express');
const routes = express.Router();

const { addproduct , viewproduct} = require('../controllers/ProductControllers');

routes.get('/',viewproduct);
routes.get('/add',addproduct);

module.exports=routes;