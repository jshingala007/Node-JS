const express = require('express');

const app = express();

const port = 9000;

const  cors = require('cors');
app.use(cors());


app.get('/users',(req,res) =>{
    return res.status(200).json({
        success: true,
        message:"user successfully fetch",
        users:[
            { id:1, name:"mitu",  phone:12345},
            { id:2, name:"milu",  phone:123456},
            { id:3, name:"raju",  phone:1234567},
            { id:4, name:"yashu", phone:12345678},
            { id:5, name:"mihu",  phone:123456789},
            { id:6, name:"daxu",  phone:1234567891},
            
        ]
    })
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
    }
    console.log(`server is start on port :- ${port}`);
    
})