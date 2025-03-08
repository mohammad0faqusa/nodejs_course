// import '@babel/polyfill';
import { displayMap } from './mapbox.js';
import {login, logout} from './login.js';
import {updateData} from './updateSettings.js'

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login')
const logoutButton = document.querySelector('.logout')
const updateForm  = document.querySelector('.form-user-data')
const userPasswordForm  = document.querySelector('.form-user-password')
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

if(updateForm) {
    updateForm.addEventListener('submit', function(ev){
        ev.preventDefault();
        const email = document.getElementById('email').value 
        const name = document.getElementById('name').value
        console.log(email, name)
        updateData({email, name}, 'data')
    })
}

if(userPasswordForm) {
    
    userPasswordForm.addEventListener('submit', async function(ev){
        ev.preventDefault();
        document.querySelector('.btn--save-password').textContent = 'Updating...'
        const passwordCurrent = document.getElementById('password-current').value 
        const password = document.getElementById('password').value 
        const passwordConfirm = document.getElementById('password-confirm').value 
        await updateData({passwordCurrent, password, passwordConfirm}, 'password')

        document.getElementById('password-current').value = '' 
        document.getElementById('password').value = '' 
        document.getElementById('password-confirm').value = '' 
        document.querySelector('.btn--save-password').textContent = 'Save password'
    })
}
