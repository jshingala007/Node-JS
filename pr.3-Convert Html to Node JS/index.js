const express = require('express');
const port =8080;
const app = express();

app.set('view engine','ejs');

const path = require('path');

app.use('/',express.static(path.join(__dirname,'public')))



app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
        
    }
    console.log(`server is run onthise port :- ${port}`);
    
})