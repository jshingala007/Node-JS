const express = require('express');
const routes = express.Router();


routes.get('/',(req,res)=>{
    console.log("file is run");
    
})

routes.use('/crud',require('./curdRoute'));
routes.use('/product',require('./productRoute'))

module.exports=routes;