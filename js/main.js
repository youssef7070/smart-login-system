//  variables
var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');

var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');

// ============= sign up ================

// to create an empty array to store users
var signUpArray = [];

// to check if localStorage is empty or not
// if localStorage is empty, then create an empty array
// if localStorage is not empty, then get the array from localStorage
if (localStorage.getItem('users') == null) {
    signUpArray = [];
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'));
}

// for check inputs is empty or not
function isEmpty() {
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false;
    } else {
        return true;
    }
}

// for check email is exist
function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        // email is case insensitive, so we convert both email to lowercase
        // email is known in object signUp 
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false;
        }
    }
    return true; // لم يكن موجود
}

function signUp() {
    // check if inputs is empty or not
    // if inputs is empty, then show error message
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    // to store all value as object
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    };

    // to check if email is already exist
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Email already exists</span>';
    } else {
        signUpArray.push(signUp);
        localStorage.setItem('users', JSON.stringify(signUpArray));
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>';
        clearSignUpForm();
    }
}

// clear inputs after sign up success
function clearSignUpForm() {
    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
}

// -----------------------------------------------------

// ============= sign in ================

// check inputs is empty or not
function isLoginEmpty() {
    if (signinPassword.value == "" || signinEmail.value == "") {
        return false;
    } else {
        return true;
    }
}

function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    var password = signinPassword.value;
    var email = signinEmail.value;
    var userFound = false;

    for (var i = 0; i < signUpArray.length; i++) {
        if (
            signUpArray[i].email.toLowerCase() == email.toLowerCase() &&
            signUpArray[i].password == password
        ) {
            localStorage.setItem('sessionUsername', signUpArray[i].name);
            userFound = true;
            window.location.href = 'home.html'; // redirect to home
            break;
        }
    }

    if (!userFound) {
        document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">Email or password is incorrect</span>';
    }
}

// -----------------------------------------------------

// ============= home page ================

// to say welcome in home page

var username = localStorage.getItem('sessionUsername');
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username;
}




