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
    <h1 style="text-align: center"> Üdvözlünk ${selfprofile["username"]}!</h1>  
    <div id="landingpage">
      <div class="card" id="card1">
        <div class="imgBx">
          <img src="https://images.pexels.com/photos/3861976/pexels-photo-3861976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
        </div>
        <div class="content">
          <div class="contentBx">
            <h3>Adatbázis</h3>
          </div>

        </div>
      </div>
      <div class="card" id="card2">
        <div class="imgBx">
          <img src="https://images.pexels.com/photos/28541805/pexels-photo-28541805/free-photo-of-vintage-konyvtari-konyvespolc-tele-antik-konyvekkel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
        </div>
        <div class="content">
          <div class="contentBx">
            <h3>Dokumentáció</h3>
          </div>

        </div>
      </div>
      <div class="card" id="card3">
        <div class="imgBx">
          <img src="https://images.pexels.com/photos/5561909/pexels-photo-5561909.jpeg?auto=compress&cs=tinysrgb&w=600">
        </div>
        <div class="content">
          <div class="contentBx">
            <h3>Információ</h3>
          </div>
        
        </div>
      </div>
    </div>
    `
}


// LOGIN

const selfprofile = {
  username: "",
  password: "",
  phonenum: "",
  rank: "",
  group: ""
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

const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');
const card3 = document.getElementById('card3');


card1.addEventListener("click", opendatabase);

function opendatabase() {
  container.innerHTML = ' '
  container.innerHTML += `
    <table id='databasetable'>
      <tr>
        <td><u>Azonosító</u></td>
        <td><u>Név</u></td>
        <td><u>Születési dátum</u></td>
        <td><u>Telefonszám</u></td>
        <td><u>Pchiológiai vizsgálat</u></td>
        <td><u>Társadalom biztosítás</u></td>
      </tr>
    </table>
  `
  const databasetable = document.getElementById('databasetable');
  const dataRef = db.collection('data'); 
  dataRef.get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let checker = doc.data()
      let pchyho = ""
      let tb = ""
      if (checker["pchyho"] == true) {
        pchyho = "Van"
      } else {
        pchyho = "Nincs"
      }

      if (checker["tb"] == true) {
        tb = "Van"
      } else {
        tb = "Nincs"
      }
      databasetable.innerHTML += `
      <tr>
        <td>${checker["id"]}</td>
        <td>${checker["username"]}</td>
        <td>${checker["borndate"]}</td>
        <td>${checker["phonenum"]}</td>
        <td>${pchyho}</td>
        <td>${tb}</td>
      </tr>
      `
    })
  })
  .catch((error) =>{
    alert("A táblázat feltöltése sikertelen: "+ error);
  });
}

