const http = require('http');
const url = require('url'); 

const server = http.createServer((req, res)=>{
    const pathName = req.url; 
    if (pathName == "/"){
        res.end('hello from home page')
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header':'hello-world'
        })
        res.end('page not found')
    }
})

server.listen(8000,'127.0.0.1', ()=>{
    console.log('the server is running on local host port 8000')
}); 