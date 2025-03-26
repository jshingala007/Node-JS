const UserModel = require('../models/UserModel');
const JWT = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, city, phone } = req.body;
        if (!name || !email || !password || !city || !phone) {
            return res.status(401).send({
                success: false,
                message: "All field is required"
            })
        }

        let user = await UserModel.create({
            name: name,
            email: email,
            password: password,
            phone: phone,
            city: city
        })
        return res.status(200).send({
            success: true,
            message: "User successfully create",
            user
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "All field is required"
            })
        }

        let user = await UserModel.findOne({ email: email });

        if (!user || user.password != password) {
            return res.status(401).send({
                success: false,
                message: "Email and password not valid"
            })
        }
        //create token
        const token = await JWT.sign({ payload: user }, 'rnw', { expiresIn: '3hr' });
        return res.status(200).send({
            success: true,
            message: "Login successfully",
            token: token
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const allUser = async (req, res) => {
    try {
        let users = await UserModel.find({});
        return res.status(200).send({
            success: true,
            message: "User successfully fetch",
            users: users
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
module.exports = {
    registerUser, loginUser, allUser
}