const fs = require('fs'); 
const crypto = require('crypto');

const start = Date.now(); 
process.env.UV_THREADPOOL_SIZE = 1; 

// setTimeout(() => {console.log("0 exectued time out function")}, 0);
// setImmediate(()=>console.log("immediate time is finished")); 
// fs.readFile('note.txt', 'utf-8', (err, data)=>{
//     console.log('io is finished'); 
// })
// console.log("hello from the top - level code ")


//still now these above functions are not inside callback 



fs.readFile('note.txt', 'utf-8', (err, data)=>{
    console.log("-------------------------");
    console.log('top level code in io is finished'); 
    setTimeout(() => {console.log("0 exectued time out function")}, 0);
    setImmediate(()=>console.log("immediate time is finished")); 

    process.nextTick(()=>console.log("process next tick")); 

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
        console.log(Date.now() - start, 'password is encrypted'); 
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
        console.log(Date.now() - start, 'password is encrypted'); 
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
        console.log(Date.now() - start, 'password is encrypted'); 
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
        console.log(Date.now() - start, 'password is encrypted'); 
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
        console.log(Date.now() - start, 'password is encrypted'); 
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
        console.log(Date.now() - start, 'password is encrypted'); 
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
        console.log(Date.now() - start, 'password is encrypted'); 
    })
})
console.log("hello from the top - level code ")

// now set immediate is run before the settime out 0 function 



