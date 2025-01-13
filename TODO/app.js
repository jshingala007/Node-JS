const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const ejs = require('ejs')
const mongoose =require('mongoose')
mongoose.connect('mongodb://127.0.01:27017/list')
app.use(express.json())
app.set('view engin',ejs)
app.use(bodyparser.urlencoded({extended:true}))


app.listen('1000',(req,res)=>{
    console.log("server listing")
})
