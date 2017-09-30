
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyCeZ9knF7puLXzr6xzldqK-426gSNNmByk",
//     authDomain: "final-nkeksi.firebaseapp.com",
//     databaseURL: "https://final-nkeksi.firebaseio.com",
//     projectId: "final-nkeksi",
//     storageBucket: "final-nkeksi.appspot.com",
//     messagingSenderId: "1064067035279"
//   };
//   firebase.initializeApp(config);


// var  rName = document.getElementById("restaurant_name");
// var  rLoc = document.getElementById("restaurant_location");
// var  rAddr = document.getElementById("restaurant_address");
// var  rTel = document.getElementById("restaurantTel");
// var  rEmail = document.getElementById("restemail");
// var  rOwner = document.getElementById("restOwner");
// var rMobile = document.getElementById("ownerTel");


// var restauSubmit = document.getElementById("submitUpdate");

// restauSubmit.addEventListener("click" , function() {
 
//   restName  = rName.value;
//   var restaurant_description = $("#restaurant_description").val();
//   var restaurant_password = $("#myPassword").val();
//   var deliveryButton = $("#deliveryButton").val();
//   restLocation = rLoc.value;
//   restAddress = rAddr.value;
//   restTel = rTel.value;
//   restEmail = rEmail.value;
//   restOwner = rOwner.value;
//   restOwnerMobile = rMobile.value;

//   			console.log(deliveryButton + restaurant_password + restName + restaurant_description  + restAddress + restEmail + restTel + restLocation + restOwner + restOwnerMobile);

//   		    promise = firebase.auth().createUserWithEmailAndPassword(restEmail, restaurant_password);
//                promise.then(function(user) {
//                // You are forgetting this reference.
//                 user.sendEmailVerification();
//       // You can also call this.
//                 firebase.auth().currentUser.sendEmailVerification();
//       // Email sent.
//                  }, function(error) {
// 			      // An error happened.
// 			        // Handle Errors here.
// 			  var errorCode = error.code;
// 			  var errorMessage = error.message;
// 			               });

// 	     firebase.auth().signInWithEmailAndPassword(restEmail , restaurant_password).catch(function(error) {
// 	  // Handle Errors here.
// 	  var errorCode = error.code;
// 	  var errorMessage = error.message;
// 	  // ...
// 	});

// });

var uploadDoc = document.getElementById('uploadDoc');

  uploadDoc.addEventListener("click" , function(){

 uploadScanner();

  });
function uploadScanner () {
  uploaderScan = document.getElementById('uploaderDoc');

 uploaderScan.addEventListener('change' , function uploaderPics(pics){

  alert("yuupii succeeded alsoo hahah");

  //Get file
  file2 = pics.target.files[0];
  alert(file2);

  //Create storage ref
  var storageRef = firebase.storage().ref('Restau_Menu/' + file2.name)

  // Upload file
  var task = storageRef.put(file2)

  //Update the progress bar

  task.on('state_changed', function(snapshot){

    var uploader2 = document.getElementById('scanningFile');
  $("#uploadDocSign").addClass('glyphicon-refresh');

  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader2.value = progress;

  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
            $("#uploadDocSign").addClass('spin');

      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
            $("#uploadDocSign").addClass('spin');
      break;
  }
}, function(error) {
    $("#uploadDocSign").removeClass('spin');
  $("#uploadDocSign").addClass('glyphicon-remove');
  // Handle unsuccessful uploads
}, function() {

   $("#uploadDocSign").removeClass('spin');
  $("#uploadDocSign").addClass('glyphicon-ok-sign');
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  var downloadURL =  task.snapshot.downloadURL;
  console.log(downloadURL);
});
});

}
 