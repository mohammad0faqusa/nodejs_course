const login = async (email, password) => {
    console.log(email,password); 
    alert(email)
    axios.post('http://localhost:3000/api/v1/users/login', {
        email,
        password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

document.querySelector('.form').addEventListener('submit',function(e){
    e.preventDefault();
    const email = document.getElementById('email').value 
    const password = document.getElementById('password').value
    login(email, password)
})