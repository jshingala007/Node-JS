const UserModel = require('../models/authModel');

var nodemailer = require('nodemailer');


const LoginPage = (req, res) => {
    if(res.locals?.users){
        return res.redirect('dashboard');
    }
    return res.render('login');
}
const RegisterPage = (req, res) => {
    return res.render('register');
}

const RegisterUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await UserModel.create({
            name: name,
            email: email,
            password: password
        })
        console.log("You’ve successfully created your account. Please log in to continue.");
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user || user.password !== password) {
            console.log('Account Not Found.. Please Register to Create a New Account...');
            return res.redirect('/');
        }
        res.cookie('auth', JSON.stringify({ id: user._id, name: user.name }), { httpOnly: true });
        console.log('Login Successful! Redirecting To Your Dashboard..');
        return res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const DashboardPage = async (req, res) => {
    return res.render('dashboard');
}


const Logout = (req, res) => {
    req.logout((err)=>{
        if (err) {
            console.log(err);
            return false;
        }
    return res.redirect('/');
            
    })
};

const forgetPassword = async (req, res) => {
    try {
        let useremail = req.body.email;

        const user = await UserModel.findOne({ email: useremail });

        if (!user) {
            console.log("User is not found");
            return res.redirect('/');
        }

        const otp = Math.floor(Math.random() * 100000);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dholakiyaumesh45@gmail.com',
                pass: 'xcya yort dmqr skwv'
            }
        });

        var mailOptions = {
            from: 'dholakiyaumesh45@gmail.com',
            to: useremail,
            subject: 'Forgotpassword',
            html: `<h2 style='color:green'>Hello ${user?.name} Your Otp :- ${otp}</h2>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                let auth = {
                    email: useremail,
                    otp: otp
                }
                res.cookie('user', auth);
                return res.redirect('/otp');
            }
        });


    } catch (err) {
        console.log(err);
        return false;
    }
}

const otpPage = async (req, res) => {
    try {
        return res.render('otp');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const userOtp = async (req, res) => {
    try {
        let otp = req.body.otp;
        if (req.cookies.user?.otp == otp) {
            return res.redirect('/newpassword')
        } else {
            console.log("OTP is not Match..");
            return res.redirect('/otp');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const newPasswordPage = async (req, res) => {
    try {
        return res.render('newpassword');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const usernewPassword = async (req, res) => {
    try {
        let newpass = req.body.newpass;
        let cpass = req.body.cpass;
        if (newpass == cpass) {
            let email = req.cookies?.user?.email;
            let user = await UserModel.findOneAndUpdate({ email: email }, {
                password: newpass
            })
            res.clearCookie('user');
            return res.redirect('/');
        } else {
            console.log(`newpassword and confirm password is not match`);
            return res.redirect('/newpassword')
        }

    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    LoginPage, RegisterPage, RegisterUser, LoginUser, DashboardPage, Logout, forgetPassword, otpPage , userOtp  ,newPasswordPage ,usernewPassword
}