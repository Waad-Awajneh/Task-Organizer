// const signUpButton = document.getElementById("signUp");
// const signInButton = document.getElementById("signIn");
// const container = document.getElementById("container");

signUp.addEventListener("click", () => {
  containerLOG.classList.add("right-panel-active");
});

signIn.addEventListener("click", () => {
  containerLOG.classList.remove("right-panel-active");
});
const close = document.getElementById("close");
joinus.addEventListener("click", addActive )
login.addEventListener("click", addActive);
close.addEventListener("click",removeActive)

function addActive() {
  containerLOG.classList.add("activelog");
  document.getElementById("blur").classList.add("blur")
  document.querySelector(".hero-text").classList.add("blur")
}
function removeActive() {
  containerLOG.classList.remove("activelog");
  document.getElementById("blur").classList.remove("blur")
  document.querySelector(".hero-text").classList.remove("blur")

}


//waed & rama -------------------------------------------------------------------------

//************************************************************************************************************************* */


const signU = document.getElementById("singUF");
const signI = document.getElementById("singIF");

let allUsers = [];

function User(fname, lname, email, password) {
  this.fname = fname;
  this.lname = lname;
  this.email = email;
  this.password = password;
}


function goToTask() {
  location.href = `./task.html `;
}
let currentUser = {};
function signUpFunc(event) {
  event.preventDefault();

  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (checkEmail(email)) {
    let newUser = new User(fname, lname, email, password);
    allUsers.push(newUser);
    currentUser = newUser;
    saveToLocal();
    localStorage.setItem("current", JSON.stringify(currentUser));
    goToTask()
    document.forms[0].reset();
    
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'invalid  Email',
      denyButtonColor: '#8E05C2',

    })
  }

}
function checkEmail(E) {
  let rightUser = allUsers.filter((user) => {
    if (user.email == E) return true;
  });

  if (rightUser[0] == null) {
    return true;
  }

  return false;
}

function saveToLocal() {
  let strArr = JSON.stringify(allUsers);
  localStorage.setItem("Users", strArr);
}

function getFromLocal() {
  let jsonArr = localStorage.getItem("Users");
  let arr = JSON.parse(jsonArr);

  if (arr != null) {
    allUsers = arr;
  }
}
//-=========================================
// login
function signInFunc(event) {
  event.preventDefault();

  let email = document.getElementById("emailIn").value;
  let password = document.getElementById("passwordIn").value;
  let massage = findUserByEmailandPassword(email, password);

  if (massage) {
    if (currentUser != null) {
      localStorage.setItem("current", JSON.stringify(currentUser));
      goToTask()
    }
  } else {
    Swal.fire({
      icon: 'error',
      text: 'Check Your Email or Password',
    })
  }
  document.forms[1].reset();
}

function findUserByEmailandPassword(E, P) {
  let rightUser = allUsers.filter((user) => {
    if (user.email == E && user.password == P) return true;
  });
  if (rightUser[0] != null) {
    currentUser = rightUser[0];
    return true;
  }
}

getFromLocal();

signU.addEventListener("submit", signUpFunc);

signI.addEventListener("submit", signInFunc);

// regx -=========================================
const patterns = {
  email: /(\w{8,}).?-?_?(\w{2,})?@([a-z\d]+).com/,
  password: /^[\w]{8,20}$/,
}

const singUF = document.querySelector("#singUF");
const email = document.querySelector("#email");
const password = document.querySelector("#password");


email.addEventListener('blur', () => {
  const emailValue = document.querySelector("#email").value;
  if (patterns.email.test(emailValue)) {
    email.style.border = '3px solid green';
  } else {
    email.style.border = '3px solid red';
  }
})
password.addEventListener('input', () => {
  const passwordValue = document.querySelector("#password").value;
  if (patterns.password.test(passwordValue)) {
    password.style.border = '3px solid green';
  } else {
    password.style.border = '3px solid red';
  }
})
