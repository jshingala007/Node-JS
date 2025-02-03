const mongoose = require('mongoose');

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(
           `mongodb+srv://dishavaghasiya2311:dishavaghasiya2311@cluster0.ifmvo.mongodb.net/pr-movie`
        )
        console.log(`MongoDB Connected: ${conn.connection.host}`)

    } catch (error) {
        console.log(error);
        return false;
        
    }
}
module.exports = connectDB;
