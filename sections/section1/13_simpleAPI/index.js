const http = require('http');
const url = require('url'); 
const fs = require("fs"); 
const replaceTemplate = require('./modules/replaceTemplate.js');
const slugify = require('slugify')


const usersdata = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8')) ; 
const usertemp = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');

const server = http.createServer((req, res)=>{
    const {query, pathname} = url.parse(req.url,true); 

    if (pathname == "/"){
        res.end('hello from home page');}
    else if (pathname == "/api"){
        console.log(usersdata); 
        var fulltemp = fs.readFileSync(`${__dirname}/templates/header.html`, 'utf-8');
        fulltemp += usersdata.map(element => replaceTemplate(usertemp, element)).join('');
        fulltemp += fs.readFileSync(`${__dirname}/templates/footer.html`, 'utf-8');

        console.log(fulltemp); 
        res.writeHead(200, {
            "Content-type": 'text/html'
        })
        res.end(fulltemp); 

    } else if (pathname == '/user') {
        console.log(query);  
        res.writeHead(200, {
            'content-type':'text/html'
        })
        console.log(query.id, "of the user"); 
        const user_template = replaceTemplate(usertemp, usersdata[query.id])
        res.end(user_template); 
    }
    else {
        res.writeHead(404, {
            'Content-type': "text/html",
            'my-own-header':'hello-world'
        })
        res.end('page not found');
    }
})

server.listen(8000,'127.0.0.1', ()=>{
    console.log('the server is running on local host port 8000')
}); 