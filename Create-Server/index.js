const http = require('http');
const port = 8000;
const server = http.createServer((req, res) => {
    res.write(`<h1>naitik</h1>`);
    res.write(`<span>naitik</span>`);
    res.write(`<p>har har mahadev</p>`);
     res.write(`<p>har har mahadev</p>`);
    res.end();
    });

    server.listen(port,(err)=>{
        if(err){
            console.log(`server is start on port :- ${port}`);
            }
    });