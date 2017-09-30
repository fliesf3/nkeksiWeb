 jQuery().ready(function(){

  $("#whole-wrapper").removeClass("hidden");
 


  setTimeout(function(){    
  $("#overlay-content").fadeOut("slow");
        }, 3000);

var currentUID;

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

var displayUsername = document.getElementById('displayUsername');
var username = document.getElementById('username');

// declaring all reference nodes

var dbRef = firebase.database().ref();
var usersRef = dbRef.child('/UserInfo/');
var restRef = dbRef.child('/unVerified/');
var userComment =  dbRef.child('user-comments');

// Actions and event listeners

var btnlogin = document.getElementById('btnlogin');
var btnsignin = document.getElementById('btnsignin');
var btnprimarySignin = document.getElementById('primarySignin');
var btnprimaryRegister = document.getElementById('primaryRegister');
var btnlogout = document.getElementById('btnlogout');
var submitComment = document.getElementById('submitComment');
var inputEmail = document.getElementById('inputEmail');
var inputPassword = document.getElementById('inputPassword'); 
var googleLogin = document.getElementById('googleLogin');
var submitGoogle = document.getElementById('submitGoogle');
var signInLabel = document.getElementById('signInLabel');
var resetPassword = document.getElementById('resetPassword');


var restauLogout = document.getElementById('restauLogout');
var restauLogin = document.getElementById('restauLogin');
 // get users credentials
var FirstName = document.getElementById('FirstName');
var LastName = document.getElementById('LastName');
var phonenum = document.getElementById('phonenum');
var RegisterEmail = document.getElementById('RegisterEmail');
var RegisterPassword = document.getElementById('RegisterPassword');
var ConfirmPassword = document.getElementById('ConfirmPassword');

var submitUpdate = document.getElementById('submitUpdate');

var dot1 = document.getElementById('dot1');
var dot2 = document.getElementById('dot2');
var dot3 = document.getElementById('dot3');
var open1 = document.getElementById('open1');
var open2 = document.getElementById('open2');
var open3 = document.getElementById('open3');
var back2 = document.getElementById('back2');

  var provider = new firebase.auth.GoogleAuthProvider();







// the btn to logn users using ggle

googleLogin.addEventListener('click', e =>{

        //sign in with Google

firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    user = result.user;
    console.log(user);
      if(user){

 $('.modal').modal('hide');
    $("#googleModal").modal("show");
    $("#googleFirstName").val(user.displayName);
    $("#googleLastName").val("");
    console.log(user.displayName);
    console.log(user.email);

    $("#googlePic").attr("src" ,user.photoURL);

      }
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
   
});


submitGoogle.addEventListener('click',function(){

     var nameF =  $("#googleFirstName").val();
     var lastF =  $("#googleLastName").val();
     var phoneF = $("#googlePhone").val();


      if(!nameF || !phoneF || !lastF){
        $("#googleFirstName").attr("placeholder","please enter your name");
         $("#googleFirstName").addClass("wrongPasswordFeed");
         $("#googlePhone").attr("placeholder","please enter your phone number");
         $("#googlePhone").addClass("wrongPasswordFeed");
         $("#googleLastName").attr("placeholder","please enter last name");
         $("#googleLastName").addClass("wrongPasswordFeed");


      }

      else if(!nameF){
         $("#googleFirstName").attr("placeholder","please enter your name");
         $("#googleFirstName").addClass("wrongPasswordFeed");

      }

      else if(!lastF){
          $("#googleLastName").attr("placeholder","please enter last name");
         $("#googleLastName").addClass("wrongPasswordFeed");

      }

      else if(!phoneF){
         $("#googlePhone").attr("placeholder","please enter your phone number");
         $("#googlePhone").addClass("wrongPasswordFeed");


      }

      else {

        var currentUser = firebase.auth().currentUser;
        var userI = currentUser.uid;

        updateUserData(userI , nameF , lastF , phoneF , currentUser.emailVerified , currentUser.email , currentUser.photoURL);
        $("#googleModal").modal("hide");
        console.log("ok");
      }

});

open1.addEventListener('click' , e => {
 
 const Rfirstname = FirstName.value;
    
    const RPassword = RegisterPassword.value;
    const Rlastname = LastName.value;

   if( !Rfirstname && !Rlastname){
        $("#FirstName").attr("placeholder","please enter your first name");
         $("#FirstName").addClass("EmailAndPasswordValidate");
         $("#LastName").attr("placeholder","please enter your last name");
         $("#LastName").addClass("EmailAndPasswordValidate");

     }
     else if( !Rfirstname ){
         $("#FirstName").attr("placeholder","please enter your first name");
         $("#FirstName").addClass("EmailAndPasswordValidate");

     }

    else if( !Rlastname ){
          $("#LastName").attr("placeholder","please enter your last name");
         $("#LastName").addClass("EmailAndPasswordValidate");
    }

    else{
         $("#blk1").hide("fast");
         $("#block1").hide(500);
         $("#block2").show(500);
         $("#blk2").show(500);
  dot3.classList.remove('active');
  dot1.classList.remove('active');
  dot2.classList.add('active');

    }

});





signInLabel.addEventListener("click" , function(){

    $('#myModal2').modal('hide');
    $('#myModal').modal('show');

});




open2.addEventListener('click' , e =>{

const REmail = RegisterEmail.value;
const Rphonenum = phonenum.value;

   if( !REmail && !Rphonenum){
        $("#RegisterEmail").attr("placeholder","please enter a valid email");
         $("#RegisterEmail").addClass("EmailAndPasswordValidate");
         $("#phonenum").attr("placeholder","please enter your phone number");
         $("#phonenum").addClass("EmailAndPasswordValidate");

     }
     else if( !REmail ){
       $("#RegisterEmail").attr("placeholder","please enter a valid email");
         $("#RegisterEmail").addClass("EmailAndPasswordValidate");

     }

    else if( !Rphonenum ){
      $("#phonenum").attr("placeholder","please enter your phone number");
         $("#phonenum").addClass("EmailAndPasswordValidate");;
    }

    else{

   $("#blk2").hide("fast");
   $("#block2").hide(500);
   $("#block3").show(500);
   $("#blk3").show(500);

  dot3.classList.add('active');
  dot1.classList.remove('active');
  dot2.classList.remove('active');

    }



});

back2.addEventListener('click' , e => {

 $("#blk3").hide("fast");
  $("#block3").hide(500);
   $("#block2").show(500);
   $("#blk2").show(500);

  dot3.classList.remove('active');
  dot1.classList.remove('active');
  dot2.classList.add('active');

});

back1.addEventListener('click' , e => {

 $("#blk2").hide("fast");
  $("#block2").hide(500);
   $("#block1").show(500);
   $("#blk1").show(500);

  dot3.classList.remove('active');
  dot2.classList.remove('active');
  dot1.classList.add('active');

});



 // sign users in using 3 blks

// the btn to logn users

btnlogin.addEventListener('click', e => {


  var email = inputEmail.value;
  var password = inputPassword.value;

   if(!email && !password){

    console.log('Email and Password required');
  $("#inputEmail").attr("placeholder","please enter a valid email");
  $("#inputEmail").addClass("EmailAndPasswordValidate");
  $("#inputPassword").attr("placeholder","please enter your password");
  $("#inputPassword").addClass("EmailAndPasswordValidate");

        }

    else if( !email ){

      $("#inputEmail").attr("placeholder","please enter a valid email");
      $("#inputEmail").addClass("EmailAndPasswordValidate");
        }

    else if( !password ){
         $("#inputPassword").attr("placeholder","please enter your password");
         $("#inputPassword").addClass("EmailAndPasswordValidate");
    }

    else{
      $('.modal').modal('hide');

 firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if(errorCode === 'auth/email-already-in-use'){
                swal({
            title: "Sweet!",
            text: "Here's a custom image.",
            imageUrl: "images/thumbs-up.jpg"
          });
          }

          else if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
              sweetAlert("oops an errot ocuured check ur internet connection");
          }
          console.log(error);
          // [END_EXCLUDE]
        });
     }

});



btnsignin.addEventListener('click', e => {
    var Rfirstname = $("#FirstName").val();
    var REmail = RegisterEmail.value;
    var RPassword = RegisterPassword.value;
    var Rlastname = LastName.value;
    var CPassword = ConfirmPassword.value;
    var Rphonenum = phonenum.value;

     if (!CPassword && !RPassword) {

        $("#RegisterPassword").attr("placeholder","please enter passwords in required fields");
         $("#RegisterPassword").addClass("EmailAndPasswordValidate");
         $("#ConfirmPassword").addClass("EmailAndPasswordValidate");

     }
     else if( !CPassword ){
        $("#ConfirmPassword").attr("placeholder","please enter field to confirm passwords");
         $("#ConfirmPassword").addClass("EmailAndPasswordValidate");

     }

     else if( !RPassword){
        $("#ConfirmPassword").attr("placeholder","please enter a password");
         $("#ConfirmPassword").addClass("EmailAndPasswordValidate");

     }

     else{

        if (RPassword == CPassword) {
            $('.modal').modal('hide');
       firebase.auth().createUserWithEmailAndPassword(REmail, RPassword)
        .catch(function(error){

            console.log('register error', error);
            if(error.code === 'auth/email-already-in-use'){

              var credential = firebase.auth.EmailAuthProvider.credential
              (REmail , RPassword);
            var providers = new firebase.auth.GoogleAuthProvider();

             providers.addScope('profile');
             providers.addScope('email');
             return firebase.auth().signInWithPopup(providers)
             .then(function(){
              firebase.auth().currentUser.link(credential)
              .then(function(user){
                console.log("account linking success" , user);

              }, function(error){
                console.log("account linking error");
              });
             });
            }


        });
     
firebase.auth().signInWithEmailAndPassword(REmail , RPassword).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if(errorCode === 'auth/email-already-in-use'){
                swal({
            title: "Sweet!",
            text: "Here's a custom image.",
            imageUrl: "images/thumbs-up.jpg"
          });
          }

          else if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {

          }
          console.log(error);
          // [END_EXCLUDE]
        });

firebase.auth().onAuthStateChanged(function(firebaseUser){

  if(firebaseUser){
    writeUserData(firebaseUser.uid , Rfirstname , Rlastname ,Rphonenum , firebaseUser.emailVerified , REmail);
    }
    else
    {

    }
    });

          }
     }
});


resetPassword.addEventListener("click" ,function(){
 
 //prompt("enter your email")
   var emailAddress = $('#inputEmail').val();

      if(emailAddress){
      auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
      }).catch(function(error) {
        // An error happened.
      });
        swal("Nkeksi.com", "A reset link has been sent to " + emailAddress + " please ensure to verify thanks!", "success");
      
      }

      else{
          swal({
              title: "Ajax request example",
              text: "Submit to run ajax request",
              type: "input",
              inputPlaceholder: "Write something",
              showCancelButton: true,
              closeOnConfirm: false,
              showLoaderOnConfirm: true,
              customClass: "mySwal"
          }, function (inputValue) {
              if (inputValue === "") {
                  swal.showInputError("You need to write something!");
                  return false
              }
              $('.mySwal').find(':text').prop('disabled', true);
              setTimeout(function () {
                  swal("Ajax request finished!");
              }, 5000);
          });
      }

  

});


//Handling the logging out system
btnlogout.addEventListener('click' , e => {
       firebase.auth().signOut();
    
});



 firebase.auth().onAuthStateChanged(function(firebaseUser){

  if(firebaseUser){
    var userKey = firebaseUser.uid;

    console.log("User logged in");

    // Setting user credentials.

         btnlogout.classList.remove('hidden');
             primarySignin.classList.add('hidden');
             primaryRegister.classList.add('hidden');
             $("#comment_block").show();
             $("#silie").removeClass("hidden");
             $("#displayUsername").removeClass("hidden");
               
        

                // $("#silie").attr("src", photoUrl);
                 
              var test = firebase.database().ref().child('UserInfo/' + userKey);

              test.once("value" , function(snapshot){
                displayName = snapshot.val().firstName;
                photo = snapshot.val().profile_picture;

                $("#silie").attr("src", photo);
                $("#displayUsername").html('<span class="nkeksi-green">Welcome, ' + snapshot.val().username + '</span>');
                  console.log(snapshot.val().username);

                    $.Growl.show("nkeksi-team", {
                            'title'  : "Welcome "+ snapshot.val().username,
                            'icon'   : "parachute",
                            'timeout': 5000
                          });

              });
  }

  else{
            console.log("User logged out");
                 // queryOffline();
                  $("#comment_block").hide();
                  btnlogout.classList.add('hidden');
                  primarySignin.classList.remove('hidden');
                  primaryRegister.classList.remove('hidden');
                  $("#silie").addClass("hidden");
                  primarySignin.classList.add('show');
                  primaryRegister.classList.add('show');
                  $("#restauLogout").hide();  
                  $("#displayUsername").hide(); 

  }


});



    submitComment.addEventListener('click', submit =>{
           var userComment = $("#user-comments").val();
          var  currentMan = firebase.auth().currentUser;

          if(writeUserComments(currentMan , userComment)){
            $("#successSubmit").removeClass('hidden');
              $("#successSubmit").addClass('show');
            console.log("wriiten succcessfully to database");
           $("#user-comments").val(' ');

          }
          else{
            $("#failedSubmit").removeClass('hidden');
            $("#failedSubmit").addClass('show');

          }
          
          
          });


function updateUserData (userId , fname , lname , phonenum , verifyEmail , email  ,picture) {

   usersRef.child(userId).update({
        date: new Date().toLocaleString(),
        email: email , 
        emailVerified: verifyEmail ,
        firstName: fname ,
        isResto: false ,
        lastName: lname ,
        phoneNum: phonenum ,
        profile_picture: picture,
        username: fname 

      });

        return true;
}


 function writeUserData(userId , fname, lname, phonenum , verifyEmail,Remail) {
  usersRef.child(userId).set({
    username : fname,
    firstName: fname,
    lastName: lname,
    phoneNum: phonenum ,
    profile_picture : "images/usericon.png",
    isResto: false,
    date : new Date().toLocaleString(),
    email: Remail,
    emailVerified : verifyEmail
  });
}






function writeUserComments(userUid , commento){
  var user_comments = firebase.database().ref('userComments/').child(userUid.uid);
  var post = firebase.database().ref('/userPosts/');

    user_comments.push({
      comment : commento
    });

    post.push({
      comment : commento,
      date : new Date().toLocaleString(),
      userUid : userUid.uid
    });
  return true;
}

 


 }());
