const app = require('./app'); 
const dotenv = require('dotenv')

dotenv.config({path: './.env'});

console.log(process.env.JOKE_API);
console.log(process.env.a);

const port = 3000; 
app.listen(port, ()=>{
    console.log(`server is listening on port${port}...`); 
})


