const express = require('express');

const app = express();

const port = 9000;

app.set('view engine','ejs');

app.use('/',require('./routes/indexRoute'));


app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
        
    }
    console.log(`thise server is run in thise port :- http://localhost:9000`);
    
})