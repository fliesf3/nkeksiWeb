
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


  submitBtn = document.getElementById('submitRestau');

  submitBtn.addEventListener("click" , function(){

  		const email = $("#loginname").val();
  		const password = $("#loginpassword").val();

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
          		$("#loginpassword").addClass("wrongPasswordFeed");
          		$("#loginpassword").attr("placeholder" , "wrong password try again");
          } else {
           		sweetAlert("oops an error occured check your internet connection then try again");
          }
          console.log(error);
          // [END_EXCLUDE]
        });
  });


firebase.auth().onAuthStateChanged(function(firebaseUser){

	if(firebaseUser){

		var checkRef = firebase.database().ref("unVerified/" + firebaseUser.uid);

		checkRef.once("value" , function(snapshot){

				var isResto = snapshot.val().isResto;

				if(isResto == "true"){
						
						window.location = "restaurant_profile.html";
				}
				else{

					console.log("user but not restaurant");
				}

		});

	}

	else{

		console.log("user not logged in");
	}

});