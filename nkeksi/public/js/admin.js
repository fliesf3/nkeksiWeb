
'use strict';


 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCeZ9knF7puLXzr6xzldqK-426gSNNmByk",
    authDomain: "final-nkeksi.firebaseapp.com",
    databaseURL: "https://final-nkeksi.firebaseio.com",
    projectId: "final-nkeksi",
    storageBucket: "final-nkeksi.appspot.com",
    messagingSenderId: "1064067035279"
  };
  firebase.initializeApp(config);

var auth = firebase.auth();
var adminLogin = document.getElementById('adminLogin');

adminLogin.addEventListener("click" , function() {
  const adminEmail = document.getElementById('nkeksiAdmin').value;
const nkeksiPassword = $('#nkeksiAdmin2').val();
var adminLogin = document.getElementById('adminLogin');
       
           firebase.auth().signInWithEmailAndPassword(adminEmail, nkeksiPassword).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          // ...
});

});

var nkeksiLogout = document.getElementById('nkeksiLogout');

nkeksiLogout.addEventListener('click' , function(){
             firebase.auth().signOut();

});

  var compare = "true";
  var compare2 = "false";

function initApp() {

 firebase.auth().onAuthStateChanged(function(firebaseUser){

           if(firebaseUser){
                var adminRef = firebase.database().ref().child('Admin').child(firebaseUser.uid);
                adminRef.on("child_added", function(snapshot){
                    var status = snapshot.val();
                    console.log(status);
                   switch(status){
                      case true :
                        window.location = "adminTeam2.html"
                        break;
                      
                      case false:
                     swal("Oops sorry", "You dont have admin rights", "error");
                     firebase.auth().signOut();
                        break;
                      
                      default:
                        console.log("ok");
                          }
                });
              compare = "false";
              compare2 = "sad";
               // window.location = "adminTeam2.html";
            nkeksiLogout.classList.remove('hidden');
            console.log("User logged in");
            console.log(firebaseUser);
           }

           else{

                nkeksiLogout.classList.add("hidden")
                console.log("User logged out")
           }

});           

 }
 
