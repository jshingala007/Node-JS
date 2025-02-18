const express = require('express');
const port =8080;
const app = express();

app.set('view engine','ejs');

const path = require('path');

app.use('/',express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    return res.render('login');
})

app.get('/dacebord',(req,res)=>{
    return res.render('dacebord');
})

app.get('/register',(req,res)=>{
    return res.render('register');
})


app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
        
    }
    console.log(`server is run onthise port :- ${port}`);
    
})