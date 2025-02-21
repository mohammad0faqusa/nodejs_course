const http = require('http'); 
const path = require('path');
const url = require('url'); 

const server =  http.createServer((req,res)=>{
    const pathName = req.url; 
    if (pathName == '/overview' || pathName == "/"){
        res.end('this is overview'); 
    }else if (pathName == '/product'){
        res.end('product');
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        }); 
        res.end("page not found"); 
        
    }
    console.log(req.url); 
});

server.listen(8000,'127.0.0.1', ()=>{
    console.log("Listening to requests on port 8000");
})