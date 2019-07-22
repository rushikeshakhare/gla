//CREATE A TOAST (CUSTOM ALERTBOX)

function alert(message){
    var alert = document.getElementById('alertBox');
    
    alert.innerHTML = message;
    
    alert.classList.add("alertEntry");
    alert.classList.add("visible");
    
    setTimeout(function(){
    
        alert.classList.remove("alertEntry");
        alert.classList.remove("visible");
    
        alert.classList.add("alertExit");
    
        setTimeout(function(){
            alert.classList.add("hidden");
        },100);
    },2000);
    
};