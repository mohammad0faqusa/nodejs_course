// import '@babel/polyfill';
import { displayMap } from './mapbox.js';
import {login, logout} from './login.js';

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login')
const logoutButton = document.querySelector('.logout')

if (mapBox) {
    const locations = JSON.parse(mapBox.dataset.locations)
    displayMap(locations); 
}

console.log('hello from parcel')
if(loginForm) {
    loginForm.addEventListener('submit',function(e){
        e.preventDefault();
        const email = document.getElementById('email').value 
        const password = document.getElementById('password').value
        login(email, password)
    }) 
}
if(logoutButton) {
    logoutButton.addEventListener("click", logout)
}