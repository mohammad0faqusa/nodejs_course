const fs = require('fs'); 

fs.writeFileSync('./response.txt', "hello from mohammad ", (err)=>{
    if (err)
        console.log(err);
    else 
        console.log("the write is written successfully"); 
})

const textIn = fs.readFileSync('./response.txt', 'utf-8');
console.log(textIn); 

const hello = "Hello World";
console.log(hello); 


