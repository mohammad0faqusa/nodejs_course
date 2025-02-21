const http = require('http');


const server = http.createServer(); 
server.on('request', (req, res)=>{
    console.log('request is received');
    res.end('request is received')
})


server.listen(8000, ()=>console.log('server is running on port 8000'))
