const express = require('express');
const port = 8989;

const app = express();
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    return res.render('home')
})
app.get('/about',(req,res)=>{
    return res.render('about')
})
app.get('/con',(req,res)=>{
    return res.render('contact')
})

app.listen(port,(err)=>{
    if(err){
        console.log(`server is Live On : http://localhost:${port}`);
        return false;
    }
})