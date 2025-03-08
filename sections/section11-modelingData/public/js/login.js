import axios from 'axios';
import {showAlert} from './alerts'

export const login = async (email, password) => {
    console.log(email,password); 
    axios.post('http://localhost:3000/api/v1/users/login', {
        email,
        password
      })
      .then(function async (response) {
        console.log(response);
        showAlert('success', 'Logged in successfully!')
        window.location.href="/";
      })
      .catch(function (error) {
        console.log(error);
        showAlert('error', 'Failed to log in')
      });
}

export const logout = async ()=> {
  // alert('logged out ')
  axios('http://localhost:3000/logout',{method:'POST'}).then(window.location.href="/login")
}

