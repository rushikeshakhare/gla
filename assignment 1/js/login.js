//FORMS AND INPUTS
let loginForm = document.getElementById("loginForm");
let username = document.getElementById("username");
let password = document.getElementById("password");

//SESSION VARIABLE (FOR visualization)
let session = {
    id:null,
    status:false
};

//PROCESS LOGIN WITH VALIDATION
let processLogin = function(e){
    e.preventDefault();
 if(username.value.length <= 0)
    alert("Username can not be Empty !");
else if(password.value.length <= 0)
    alert('Password can not be Empty !');
else
    checkCredentials(username.value,password.value);
};

//CHECK LOGIN CREDENTIALS
let checkCredentials = function(user,pass){
for(let i = 0;i < admins.length;i++)
    {
        if(admins[i].username == user && admins[i].password == pass)
            {
                session.id = admins[i].id;
                session.status = true;

                alert('Logged In Successfully');
                redirectLogin();
                return true;
            }
        else
            {
                alert('Incorrect Credentials !');
                return false;
            }
    }
};

//REDIRECT IF LOGIN IS SUCCESSFULL
let redirectLogin = function(){
if(!(isNaN(session.id)) && session.status == true)
    {
        window.location.href = "dashboard.html";
    }
};

//LOGIN FORM EVENT LISTENER
loginForm.addEventListener("submit", processLogin);
redirectLogin();

