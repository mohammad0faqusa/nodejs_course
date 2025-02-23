const  hiMiddle = (req, res, next)=>{
    console.log('hello from hi middle');
    req.requestTime = new Date().toISOString();
    next(); 
}
module.exports = hiMiddle