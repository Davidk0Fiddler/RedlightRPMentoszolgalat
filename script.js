const firebaseConfig = {
  apiKey: "AIzaSyAd-EybxzYfWdXrkHRD-xh07l_yT7m-2es",
  authDomain: "chatx-63705.firebaseapp.com",
  databaseURL: "https://chatx-63705-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatx-63705",
  storageBucket: "chatx-63705.appspot.com",
  messagingSenderId: "814070087345",
  appId: "1:814070087345:web:3f1564398156a75e51ec90",
  measurementId: "G-C9K9JB7N00"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


let isLoggedIn = false
let isRegisterin = false
let container = document.getElementById('container');

function loginregisterPage() {
  if (isLoggedIn == false && isRegisterin == false) {
    container.innerHTML = ` `
    container.innerHTML += `
    <div class="login-form">
      <h1 class="login-h1">Bejelentkezés</h1>
  
      <input type="text" id="login-username" placeholder="Felhasználónév" class="login-inputs">
      <input type="password" id="login-password" placeholder="Jelszó" class="login-inputs">
      
      <button id="login-submit">Bejelentkezés</button>
  
      <button id="login-register">Regisztráció</button>
    </div>`
  }else if(isLoggedIn == false && isRegisterin == true){
    container.innerHTML = ` `
    container.innerHTML += `
    <div class="register-form">
        <h1 class="register-h1">Regisztráció</h1>
  
        <input type="text" id="register-username" placeholder="Felhasználónév" class="register-inputs">
        <input type="email" id="register-email" placeholder="Email cím" class="register-inputs">
        <input type="password" id="register-password" placeholder="Jelszó" class="register-inputs">
        <input type="checkbox" id="afsz-checkbox" >
        <label for="afsz-checkbox" id="afsz-label">Elfogadom az <a href="#">ÁFSZ</a>-t</label>
        <button id="register-submit">Regisztráció</button>
  
      </div>
    `
  }
}

loginregisterPage()



// LOGIN



const loginUserName = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginSubmit= document.getElementById('login-submit');

loginSubmit.addEventListener("click", login);

function login() {

  let usernameChecking = loginUserName.value;
  let passwordChecking = loginPassword.value;

  console.log(usernameChecking, passwordChecking)


  const usersRef = db.collection('users'); 
  usersRef.get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let checker = doc.data()

      if (usernameChecking == checker["username"] && passwordChecking == checker["password"]) {
        console.log(usernameChecking, " has logged in!")
        isLoggedIn = true
        container.innerHTML = ` `
      }
      else {
        alert("A bejelentkezés sikertelen!");
      }



    })
  })
  .catch((error) =>{
    alert("A bejelentkezés sikertelen, rendszerhiba miatt: "+ error);
  });
}
let loginRegisterBtn = document.getElementById('login-register')

let registerSubmit = document.getElementById('register-submit');
loginRegisterBtn.addEventListener('click', function(){
  isRegisterin = true
  loginregisterPage()
});
registerSubmit.addEventListener("click", register);


// REGISTER
function register(){
let registerUsername = document.getElementById('register-username')
let registerEmail = document.getElementById('register-email')
let registerPassword = document.getElementById('register-password')
let registerCheckbox = document.getElementById('afsz-checkbox')

const usersRef = db.collection('users');


let username = registerUsername.value
let email = registerEmail.value
let password = registerPassword.value
let afszElfogado = registerCheckbox.value

let dataAlreadyUsed = false

.then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    let checker = doc.data()

    if (username == checker["username"] || email == checker["email"]) {
      dataAlreadyUsed = true
      alert("A regisztráció sikertelen! Valamelyik adatod már használva van a rendszerben!")
    }
  })
  if (dataAlreadyUsed == false && afszElfogado) {
    usersRef.add({
      username: username,
      password: password,
      email: email
    })
  }

})
.catch((error) => {
  console.error('Hiba a regisztráció során: ', error);
});
}