const EventEmmiter = require('events');
const http = require('http')


class Sales extends EventEmmiter {
    constructor(){
        super(); 
    }
}

const myEmmiter = new Sales(); 

myEmmiter.on('newSale', ()=>{
    setTimeout(() => {
        console.log('go check out')
    }, 500);
    console.log('There was a new sale!')
})

myEmmiter.on('newSale', stock=>{
    console.log(`there are ${stock} items left in the stock `)
})
myEmmiter.on('newSale', ()=>{
    console.log('Customer name is mohammad')
})
myEmmiter.emit('newSale', 9 ); 

//////////////////////////
const server = http.createServer(); 

server.on('request', (req, res)=>{
    console.log('request is received')
    res.end('request is received');
})
server.on('request', (req, res)=>{
    console.log('another request')
})

server.on('close', ()=>{
    console.log('Server closed');
})

server.listen(8000, '127.0.0.1', ()=>{
    console.log('server is waiting for requests')
})