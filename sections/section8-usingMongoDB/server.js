const app = require('./app'); 

require('./database')



const port = 3000; 
app.listen(port, ()=>{
    console.log(`server is listening on port${port}...`); 
})


//TEST
