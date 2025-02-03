const express = require('express');
const connectDB = require('./config/db');

const app = express();
const port = 9000;

app.set('view engine','ejs');
app.use(express.urlencoded());
connectDB();


const path = require('path');

app.use('/uploads',express.static(path.join(__dirname,"uploads")));

app.use('/',require('./router/indexRouter'))


app.listen(port,(err)=>{
    if(err) console.log(err);

    console.log(`Server is running on port ${port}`)
})
