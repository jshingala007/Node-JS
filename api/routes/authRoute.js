const express = require('express');

const routes = express.Router();

const { registerUser, loginUser, allUser } = require('../controllers/AuthController');

const { verifyToken, authoriseRole } = require('../middleware/Auth');

routes.post('/register', registerUser)
routes.post('/login', loginUser);
routes.get('/alluser', verifyToken, authoriseRole(['admin', 'user']), allUser)


module.exports = routes;