const firebaseConfig = {
  apiKey: "AIzaSyDlBNYQBLuCUD7aLUzOGuvF3naiyGWN9Uo",
  authDomain: "redlightmentoszolgalatdatabase.firebaseapp.com",
  databaseURL: "https://redlightmentoszolgalatdatabase-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "redlightmentoszolgalatdatabase",
  storageBucket: "redlightmentoszolgalatdatabase.appspot.com",
  messagingSenderId: "72002259904",
  appId: "1:72002259904:web:354c50afe17e091e9e9625",
  measurementId: "G-DKN6M83FV2"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


let isLoggedIn = false
let container = document.getElementById('container');

function loginregisterPage() {
  if (isLoggedIn == false) {
    container.innerHTML = ` `
    container.innerHTML += `
    <div class="login-form">
      <h1 class="login-h1">Bejelentkezés</h1>
  
      <input type="text" id="login-username" placeholder="Felhasználónév" class="login-inputs">
      <input type="password" id="login-password" placeholder="Jelszó" class="login-inputs">
      
      <button id="login-submit">Bejelentkezés</button>
  
    </div>`
  }
}

loginregisterPage()


function landingPage() {
  container.innerHTML = ` `
  container.innerHTML += ` 
    <h1> Hello! ${selfprofile["username"]} </h1>  
  `
}


// LOGIN

const selfprofile = {
  username,
  password,
  phonenum,
  rank,
  group
};


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
        selfprofile["username"] = checker["username"]
        selfprofile["password"] = checker["password"]
        selfprofile["phonenum"] = checker["phonenum"]
        selfprofile["rank"] = checker["rank"]
        selfprofile["group"] = checker["group"]

        landingPage()
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
