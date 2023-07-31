var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')


var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
console.log(baseURL);
console.log(location.hostname);

var signUpArray;

if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}


function isEmpty(){
    if(signupName.value == "" || signupEmail.value == "" || signupPassword.value == ""){
        return false;
    }else{
        return true;
    }
}

function isExist(){
    for(var i =0 ; i< signUpArray.length ; i++){
        if(signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()){
            return false;
        }
    }
}

function signUp(){

    if(isEmpty() == false){
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false;
    }

    if(isEmailvalid()){
        var signUp ={
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value
        }
        
        if(signUpArray.length == 0){
            signUpArray.push(signUp)
            localStorage.setItem('users', JSON.stringify(signUpArray))
            document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
            return true
        }
    
        if(isExist() == false){
            document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>' 
        }else{
            signUpArray.push(signUp)
            localStorage.setItem('users', JSON.stringify(signUpArray))
            document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        }
    }else{
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email is invalid</span>';
    }


}

function isLoginEmpty(){
    if(signinEmail.value == "" || signinPassword.value == "" ){
        return false;
    }else{
        return true ;
    }
}

function login(){
    if(isLoginEmpty() == false){
        document.getElementById('incorrect').innerHTML=`<span class="text-danger m-3">All inputs is required</span>`
        return false ;        
    }
    if(signUpArray.length != 0){
        var email = signinEmail.value
    var password = signinPassword.value
    for(var i = 0; i< signUpArray.length;i++){
        if(signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()){
            localStorage.setItem('sessionUsername',signUpArray[i].name)
            if (baseURL == '//task11') {
                location.replace('https://' + location.hostname + '/task11/home.html')

            } else {
                location.replace(baseURL + '/home.html')

            }
        }else{
            document.getElementById('incorrect').innerHTML=`<span class="text-danger m-3">incorrect email or password</span>`
        }
    }
    }else{
        document.getElementById('incorrect').innerHTML=`<span class="text-danger m-3">invalid email or password</span>`
    }
}

var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}

function logout(){
    localStorage.removeItem('sessionUsername')
}

function isEmailvalid(){
    var regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if(regex.test(signupEmail.value)){
        return true ;
    }else{
        return false ;
    }
}