const express = require('express');

const routes = express.Router();
routes.use('/',require('../router/movieRouter'));

module.exports = routes;