const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve , reject)=>{
        fs.readFile(file, (err, data)=>{
            if (err)
                reject(err); 
            resolve(data) 
        })
    }); 
}

const writeFilePro = (file, content)=>  new Promise((resolve, reject)=>{
    fs.writeFile(file, content, (err)=>{
        if (err)
            reject(err)
        resolve(content); 
    })
})

/*
readFilePro(`${__dirname}/dog.txt`)
.then(data => {
    console.log(`Bread ${data}`);
    return superagent.get(`https://v2.jokeapi.dev/joke/Any`)   
})
.then(res => writeFilePro('./result.txt', JSON.stringify(res.body)))
.then(res2 => console.log(res2))
.catch(err => console.log(err.message)); 

*/

const getDogPic = async ()=> {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`)
        console.log(`bread ${data}`); 
        
        const res1 =  superagent.get(`https://v2.jokeapi.dev/joke/Any`);
        const res2 =  superagent.get(`https://v2.jokeapi.dev/joke/Any`);
        const res3 =  superagent.get(`https://v2.jokeapi.dev/joke/Any`);

        const all = await Promise.all([res1, res2, res3]); 
        console.log(all.map(el =>  el.body.setup)); 

        const res4 = await writeFilePro('./result.txt', JSON.stringify(all[0].body)); 
        console.log(res4); 
    }catch(err){
        // console.log(err); 
        throw err ; 
    }

    return 'ready' ; 
}

(async() =>{
    console.log('here is step 1'); 
    await getDogPic();
    console.log('here is last step'); 
})()

/*
console.log('here is step 1'); 
getDogPic().then(res => {
    console.log(res);
    return res ; 
}).catch(err => {
    console.log(err); 
}); 
*/
// const x = await getDogPic().then(res => res); 
// console.log(x); 
// const x = await getDogPic(); 