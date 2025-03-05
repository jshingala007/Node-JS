const express = require('express');

const routes = express.Router();

const { LoginPage, RegisterPage, RegisterUser, LoginUser, DashboardPage, Logout, forgetPassword ,otpPage,  userOtp,newPasswordPage, usernewPassword} = require('../controller/AuthController');

const passport = require('passport');


routes.get('/' ,LoginPage);
routes.get('/register' , RegisterPage);
routes.post('/registerUser' , RegisterUser);
routes.post('/loginUser', passport.authenticate('local', { failureRedirect: '/' }), LoginUser);
routes.get('/dashboard',passport.checkUser, DashboardPage);
routes.get('/logout', passport.checkUser ,Logout);


routes.post('/forgotpassword', forgetPassword)
routes.get('/otp', otpPage)
routes.post('/userotp', userOtp)
routes.get('/newpassword', newPasswordPage)
routes.post('/usernewpassword', usernewPassword)


module.exports = routes;