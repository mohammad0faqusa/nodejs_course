const fs = require('fs')
const server = require('http').createServer(); 

server.on('request', (req, res)=>{
    // Solution 1 : 
    console.log('request is heppened')
    // fs.readFile('note.txt', (err, data)=>{
    //     if (err)
    //         console.log(err);
    //     res.end(data); 
    // })

    //solution 2 : streams 

    // const readable = fs.createReadStream('note.txt'); 
    // readable.on('data', chunck =>{
    //     res.write(chunck); 
    //     console.log(chunck)
    // })
    // readable.on('end', ()=>{
    //     res.end();
    // })
    // readable.on('error', error=>{
    //     console.log(error);
    //     res.statusCode = 500; 
    //     res.end('file not found !')
    // })

    // solution 3 
    const readable = fs.createReadStream('note.txt'); 
    readable.pipe(res); 
    // readableSource.pip(writableDest); 
    

})



server.listen(3000, '127.0.0.1', ()=>{
    console.log('server is running on port 3000');
}); 