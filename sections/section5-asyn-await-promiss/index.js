const fs = require('fs');
const superagent = require('superagent'); 




fs.readFile(`${__dirname}/dog.txt`, (err , data)=>{
    console.log(`Bread : ${data}`);

    superagent.get(`https://www.dofactory.com/html/method/get`).end((err, res)=>{
        console.log(res);
        //call back hell 
    }) 

})