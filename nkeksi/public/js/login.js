 jQuery().ready(function(){


  setTimeout(function(){    
  $("#overlay-content").fadeOut("slow");
        }, 3000);



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


const displayUsername = document.getElementById('displayUsername');
const username = document.getElementById('username');

const btnlogin = document.getElementById('btnlogin');
const btnsignin = document.getElementById('btnsignin');
const btnprimarySignin = document.getElementById('primarySignin');
const btnprimaryRegister = document.getElementById('primaryRegister');
const btnlogout = document.getElementById('btnlogout');
const submitComment = document.getElementById('submitComment');
const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword'); 
const googleLogin = document.getElementById('googleLogin');



const FirstName = document.getElementById('FirstName');
const LastName = document.getElementById('LastName');
const phonenum = document.getElementById('phonenum');
const RegisterEmail = document.getElementById('RegisterEmail');
const RegisterPassword = document.getElementById('RegisterPassword');
const ConfirmPassword = document.getElementById('ConfirmPassword');

const submitUpdate = document.getElementById('submitUpdate');

const dot1 = document.getElementById('dot1');
const dot2 = document.getElementById('dot2');
const dot3 = document.getElementById('dot3');
const open1 = document.getElementById('open1');
const open2 = document.getElementById('open2');
const open3 = document.getElementById('open3');
const back2 = document.getElementById('back2');


open1.addEventListener('click' , e => {
 
 const Rfirstname = FirstName.value;
    
    const RPassword = RegisterPassword.value;
    const Rlastname = LastName.value;

   if( !Rfirstname && !Rlastname){
        $("#FirstName").attr("placeholder","please enter your first name");
         $("#FirstName").addClass("EmailAndPasswordValidate");
         $("#LastName").attr("placeholder","please enter your last name");
         $("#LastName").addClass("EmailAndPasswordValidate");
         document.getElementById('FirstName').reset(); 

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


  const email = inputEmail.value;
  const password = inputPassword.value;

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
    alert(email);
    alert(password);
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
});
     }

});


// the btn to logn users using ggle

googleLogin.addEventListener('click', e =>{
          alert("me");
       // Sign in user with google

       var provider = new firebase.auth.GoogleAuthProvider();

       provider.addScope('profile');
       provider.addScope('email');
        $('.modal').modal('hide');
       return firebase.auth().signInWithPopup(provider)
       .catch(function(error) {
          console.log("Google Sign In with error", error);
         });

});

 $("#phonenum").keypress(function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return false;
    }
    var curchr = this.value.length;
    var curval = $(this).val();
    if (curchr == 3 && curval.indexOf("(") <= -1) {
      $(this).val("(+" + curval + ")" + "-");
    } else if (curchr == 7 && curval.indexOf("(") > -1) {
      $(this).val(curval + ")-");
    } else if (curchr == 10 && curval.indexOf(")") > -1) {
      $(this).val(curval + "-");
    } else if (curchr == 14) {
      $(this).val(curval + "-");
      $(this).attr('maxlength', '18');
    }
  });


btnsignin.addEventListener('click', e => {
    const Rfirstname = FirstName.value;
    const REmail = RegisterEmail.value;
    const RPassword = RegisterPassword.value;
    const Rlastname = LastName.value;
    const CPassword = ConfirmPassword.value;
    const Rphonenum = phonenum.value;

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

               alert(Rfirstname);
               alert(Rlastname);
               alert(REmail);
               alert(Rphonenum);
                alert(RPassword);
                alert(CPassword);

               promise = firebase.auth().createUserWithEmailAndPassword(REmail,RPassword);
               promise.then(function(user) {
               // You are forgetting this reference.
                user.sendEmailVerification();
      // You can also call this.
                 }, function(error) {
      // An error happened.
        // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
               });
                firebase.auth().signInWithEmailAndPassword(REmail,RPassword).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

        }

     }    

});

//Handling the logging out system
btnlogout.addEventListener('click' , e => {
       firebase.auth().signOut();
    
});


// Adding a realtime listener

  firebase.auth().onAuthStateChanged(function(firebaseUser){

           if(firebaseUser){

    const Rfirstname = FirstName.value;
    const REmail = RegisterEmail.value;
    const RPassword = RegisterPassword.value;
    const Rlastname = LastName.value;
    const CPassword = ConfirmPassword.value;
    const Rphonenum = phonenum.value;

             console.log('Logged in', firebaseUser);
             btnlogout.classList.remove('hidden');
             primarySignin.classList.add('hidden');
             primaryRegister.classList.add('hidden');
             $("#comment_block").show();

            var name, email, photoUrl, uid, emailVerified;
         
                name = firebaseUser.displayName;
                email = firebaseUser.email;
                photoUrl = firebaseUser.photoURL;
                emailVerified = firebaseUser.emailVerified;
                uid = firebaseUser.uid;  

                 $("#silie").attr("src", photoUrl);
                 $("#displayUsername").append("Welcome, " + " " + name);
                // The user's ID, unique to the Firebase project. Do NOT use
                // this value to authenticate with your backend server, if
                // you have one. Use User.getToken() instead.
              // Get a reference to the database service

        var database = firebase.database();
        var usersRef = database.ref('UserInfo');
        var tempRef;

        var tempRef = usersRef.child(uid).set({
               name : firebaseUser.displayName,
               email : firebaseUser.email,
               uid : firebaseUser.uid,
               emailVerified : firebaseUser.emailVerified,
               photoURL : firebaseUser.photoURL,
               firstName : Rfirstname,
               lastName : Rlastname

            });

            //submitting user comments in the database
         submitComment.addEventListener('click', submit =>{
              alert("me");
           var userComment = $("#user-comments").val();
            alert(userComment);
           // Get a key for a new Post.
           var user_comments = firebase.database().ref('user-comments/'+ firebaseUser.uid);
           var posts = firebase.database().ref('/posts/');

             user_comments.push({
             
                 comment : userComment,
              });
                posts.push({
                  comment : userComment,
                  date: new Date().getTime()

                });

         });


           var user_comments = firebase.database().ref('user_comments');

               user_comments.on('child_added' , function(snapshot){
                $('#nkeksi-user-comments').append(snapshot.val());
                  console.log(snapshot.val());

              });

                queryDatabase();
           }

           else{

                 console.log('user logged out');
                             queryOffline();
                $("#comment_block").hide();
                 btnlogout.classList.add('hidden');
                  primarySignin.classList.remove('hidden');
                  primaryRegister.classList.remove('hidden');
                  primarySignin.classList.add('show');
                  primaryRegister.classList.add('show');
                  $("#restauLogout").hide();

           }


          });
    
    function queryDatabase() {

        var userId = firebase.auth().currentUser.uid;


        var userId = firebase.auth().currentUser.uid;
        return firebase.database().ref('/user-comments/' + userId).once('child_added').then(function(snapshot) {
         var k  = snapshot.val().comment;
         $('#nkeksi-user-comments').append(k);
         console.log(k);
  // ...
});




       // const queryComment = firebase.database().ref('/user-comments/' + userId + key);

       //  queryComment.on('child_added' , function(snap){
       //    const key = snap.key;

       //    $('#nkeksi-user-comments').append(key.comment);

       //    console.log("child_added", snap.val());

       //  }); 

       //  queryComment.on('child_removed' , function(snap){
       //    console.log("removed", snap.val());

       //  }); 

       //  queryComment.on('child_changed' , function(snap){
       //    console.log("changed", snap.val());

       //  }); 

       //  queryComment.on('value' , function(snap){
          
       //         const key = snap.key;

       //    $('nkeksi-user-comments').append(key.comment);

       //    console.log("value", snap.val());
       //  });     
            
    }


function queryOffline () {
 
      var ref = firebase.database().ref("/posts");

ref.once('value', gotUserData);

function gotUserData(snapshot){
  snapshot.forEach(userSnapshot => {
    var k = userSnapshot.key;
    var id = userSnapshot.val().comment;
    var name = userSnapshot.val().date;
    console.log(name + " " + id);
      });
  }
}

    

//           var userAccount = firebase.database().ref('userAccount/users/');
//           var userLoginRef = userAccount.child(firebaseUser.uid);
//           console.log(userLoginRef.toString(), firebaseUser);

//           userLoginRef.set({
//             email : firebaseUser.email,
//             uid : firebaseUser.uid,
//             emailVerified : firebaseUser.emailVerified,
//             photoURL : firebaseUser.photoURL

//           })
//           .catch(function(error) {
//               console.log('login error',error);

//           });

//           //submitting user comments in the database
//          submitComment.addEventListener('click', submit =>{

//            var userComment = $("#user-comments").val();
//            // Get a key for a new Post.
//            var user_comments = firebase.database().ref('user-comments/'+ firebaseUser.uid);
//           var time = Date.now();
//          user_comments.push({
             
//             comment : userComment,
//          });

//          });


//          var user_comments = firebase.database().ref('user_comments');

//          user_comments.on('child_added' , function(snapshot){
//             console.log(snapshot.val());

//          });


//         comment_block = document.getElementById('comment_block');
//         console.log(firebaseUser);
//         console.log("logged in");
 
//         btnlogout.classList.remove('hidden');
//         username.classList.remove('hidden');
//         comment_block.classList.remove('hidden');
//          primarySignin.classList.remove('show');
//         primaryRegister.classList.remove('show');
//         primarySignin.classList.add('hidden');
//         primaryRegister.classList.add('hidden');
//         restauLogout.classList.remove('hidden');

//         btnprimarySignin.classList.add('hide');
//         btnprimaryRegister.classList.add('hide');

//         var userId = firebase.auth().currentUser.uid;
//          const Rfirstname = FirstName.value;
//                $(".displayUsername").html("<b>"+ Rfirstname +"</b>");

//          const REmail = RegisterEmail.value;
//          const Rlastname = LastName.value;
//          const Rphonenum = phonenum.value;
//          const RPassword = RegisterPassword.value;
//       // dhoe username

//          firebase.database().ref('users/'+ userId).set({
//             username: Rfirstname,
//             lastname: Rlastname,
//             email: REmail,
//             phoneNumber:Rphonenum

//               });

//          var refRoot = firebase.database().ref().child("menus/username");

//           refRoot.on("child_added",snap => {

//               var item = snap.child("item").val();
//               var price = snap.child("price").val();
//                $("#p").append("<i>asjhdahja</i>");

//           });


     
//       }

//       if(!firebaseUser){
//         console.log("user not logged in");
//         btnlogout.classList.remove('show');

//         primarySignin.classList.remove('hidden');
//         primaryRegister.classList.remove('hidden');
//         username.classList.add('hidden');
//         comment_block.classList.add('hidden');

// // AIzaSyBmk-TnSiRZbx_LEZwHITuBWLfYubLOVbo 

//       }


//   });





}());

