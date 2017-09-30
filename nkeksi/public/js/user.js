 jQuery().ready(function(){


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

var userRef = firebase.database().ref("UserInfo/");
var editBtn = document.getElementById("editBtnProfile");
var cancelProfile = document.getElementById("cancelProfile");
var submitUpdate = document.getElementById("submitUpdate");

	editBtn.addEventListener("click" , function () {
		console.log("hello");

        $("#profileCollapse").removeClass("hidden");
		$(".user-infos").hide();
		$("#profileCollapse").show();


    });

	cancelProfile.addEventListener("click" , function () {
		$(".user-infos").show();
		$("#profileCollapse").hide();
    });




 firebase.auth().onAuthStateChanged(function(firebaseUser){

     if (!firebaseUser) {

         console.log("user not logged in");
     } else {

         console.log("user logged in", firebaseUser);
         currentUID = firebaseUser.uid;

         userRef.child(currentUID).on("value", function (snapshot) {

             var pic = snapshot.val().profile_picture;
             var name = snapshot.val().username;
             var fname = snapshot.val().firstName;
             var lname = snapshot.val().lastName;
             var dte = snapshot.val().date;
             var email = snapshot.val().email;
             var phone = snapshot.val().phoneNum;

             $(".profile-pic").attr("src", pic);
             $(".user-pic").attr("src", pic);
             $(".user-name").html(name);
             $(".user-fname").html(fname);
             $(".user-lname").html(lname);
             $(".user-date").html(dte);
             $(".user-email").html(email).css("color", "green");
             $(".user-tel").html(phone);

             $("#one").val(name).removeClass("hidden");
             $("#two").val(fname);
             $("#three").val(lname);
             $("#four").val(phone);


         });

         submitUpdate.addEventListener("click" , function () {
             var one = $("#one").val();
             var two = $("#two").val();
             var three = $("#three").val();
             var four = $("#four").val();
             var db = firebase.database().ref('/');
             var currentUser = firebase.auth().currentUser;
             db.child("UserInfo/"+currentUser.uid).update({
                 username : one,
                 firstName : two ,
                 lastName : three,
                 phoneNum : four

             });
            $(".hideme").removeClass("hidden");
             setTimeout(function(){
                 $(".hideme").fadeOut("slow");
             }, 3000);
             console.log("updated ok");

         });



         $("#buttonPic").on("click", function () {

             $("#fileInput").trigger("click");

             $("#fileInput").change(function (e) {
                 var fileName = e.target.files[0];
                 console.log('The file "' + fileName.name + '" has been selected.');

                 var storageRef = firebase.storage().ref('UserInfo/' + currentUID + '/profilepic/' + fileName.name);
                 var task = storageRef.put(fileName);

                 task.on('state_changed', function (snapshot) {

                     var uploader1 = document.getElementById('uploader1');

                     // Observe state change events such as progress, pause, and resume
                     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                     uploader1.value = progress;

                     console.log('Upload is ' + progress + '% done');
                     switch (snapshot.state) {
                         case firebase.storage.TaskState.PAUSED: // or 'paused'
                             console.log('Upload is paused');
                             $("#uploadSign").addClass('spin');
                             break;
                         case firebase.storage.TaskState.RUNNING: // or 'running'
                             console.log('Upload is running');
                             $("#uploadSign").addClass('spin');
                             break;
                     }
                 }, function (error) {
                     // Handle unsuccessful uploads
                     $("#uploadSign").removeClass('spin');
                     $("#uploadSign").addClass('glyphicon-remove');


                 }, function () {
                     // Handle successful uploads on complete
                     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                     $("#uploadSign").removeClass('spin');
                     $("#uploadSign").addClass('glyphicon-ok-sign');

                     var downloadURL = task.snapshot.downloadURL;
                     console.log(downloadURL);
                     var test = firebase.database().ref('UserInfo/').child(currentUID).update({profile_picture: downloadURL});

                 });

             });


         });


     }

});


 }());
