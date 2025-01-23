const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userbookname: {
        type: String,
        required: true,
    },
    userdescripion: {
        type: String,
        required: true,
    },
    userprice: {
        type: String,
        required: true,
    },
    userauthorname: {
        type: String,
        required: true,
    },
    userpage:{
        type: String,
        required: true,
    }

})
const u = mongoose.model("user", userSchema);
module.exports = u;