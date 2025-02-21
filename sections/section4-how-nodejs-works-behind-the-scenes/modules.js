// console.log(arguments); 
// console.log(require('module').wrapper); 
const C = require('./test-module-1');

const {divide} = new C(); 

console.log(divide(2,5)) ; 

// console.log(calc1.add(2,5)); 

// //exports : 

const {add} = require('./test-module-2');
const calc2 = require('./test-module-2');
// console.log(calc2); 

console.log(calc2.divide(5 , 5)); 
console.log(add(2,5)); 


//
require('./test-module-3')(); 
require('./test-module-3')(); 
require('./test-module-3')(); 
require('./test-module-3')(); 