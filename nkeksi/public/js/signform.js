var  rName = document.getElementById("restaurant_name");
var  rLoc = document.getElementById("my-multi-select");
var  rAddr = document.getElementById("restaurant_address");
var  rTel = document.getElementById("restaurantTel");
var  rEmail = document.getElementById("restemail");
var  rOwner = document.getElementById("restOwner");
var  rOwnerName = document.getElementById("restOwnerName");
var rMobile = document.getElementById("ownerTel");
var ownerEmail = document.getElementById('ownerEmail');
var ownerPassword = document.getElementById('ownerPassword');
var restauSigin = document.getElementById('restauSignin');
// var restauSubmit = document.getElementById("submitUpdate");

restauLogout.addEventListener('click' , e => {
    firebase.auth().signOut();
});


var test = document.getElementById('submitUpdate');

test.addEventListener("click", function(){

  restName  = rName.value;
  var restaurant_description = $("#restaurant_description").val();
  var restaurant_password = $("#myPassword").val();
  var deliveryButton = $("#deliveryButton").val();
  restLocation = rLoc.value;
  restAddress = rAddr.value;
  restTel = rTel.value;
  restEmail = rEmail.value;
  restOwner = rOwner.value;
  restOwnerName = rOwnerName.value;
  restOwnerMobile = rMobile.value;

if( !restName || !restaurant_description || !restOwner || !restTel || !restEmail || !restLocation || !restOwnerMobile || !restAddress || !restaurant_password || !restOwnerName){

                swal({
                title: "Uncomplete form",
                text: "Please fill in required fields of the form",
                timer: 5000
              });
}
       
       else {
        console.log(deliveryButton + restaurant_password + restName + restaurant_description  + restAddress + restEmail + restTel + restLocation + restOwner + restOwnerMobile);

          promise = firebase.auth().createUserWithEmailAndPassword(restEmail, restaurant_password);
               promise.then(function(user) {
               // You are forgetting this reference.
                user.sendEmailVerification();

                              swal({
                title: "Nkeksi Team",
                text: "An email verification  has been sent to " + restEmail + " please ensure to verify thanks!",
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#4CAF50",
                confirmButtonText: "ok!",
                closeOnConfirm: false,
              },
              function(){
                      window.location = "restau_login.html";

              });
       writeRestaurantData(user.uid, restaurant_description, restName , restLocation, restAddress , restOwner , restOwnerMobile  , restEmail ,restTel ,restOwnerName);

     // You can also call this.
                 }, function(error) {
            // An error happened.
              // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
                     });

        }

     });

function writeRestaurantData(resUid ,restDes, restName , restauLoc , restAddr , restOwner , mobile , restEmail , restTel ,restLast){
    restRef.child(resUid).set({

        restoName :  restName , 
        restoLocation : restauLoc , 
        restaurant_description : restDes,
        restoAddress : restAddr , 
        firstName : restOwner ,
        restauPhoneNumber : restTel , 
        restoEmail : restEmail ,
        adminPhone : mobile,
        isPaid : "false",
        isResto : "true" ,
        isComplete : "false",
        indexLocation : restauLoc,
        lastName : restLast,
        restoImage : ""

    });

    // usersRef.child(resUid).set({
    //     restaurant_name :  restName , 
    //     restaurant_location : restauLoc , 
    //     restaurant_address : restAddr , 
    //     restaurant_owner : restOwner ,
    //     restaurant_tel : restTel ,
    //     isResto : true,
    //     isComplete : false,
    //     isPaid : false , 
    //     restaurant_email : restEmail ,
    //     tel : mobile
    // });


}

function Uploadfile(file) {
  alert("hihi");
  // body...
}


uploadDoc.addEventListener("click" , function(){
  alert("ghhj");
    var docName = document.getElementById("uploaderDoc");
    var uploaderDoc = $('#uploaderDoc')[0].files.length;
    if(uploaderDoc == 0){
                        swal({
              title: "Invalid file",
              text: "Please select a file!",
              type: "warning",
              confirmButtonColor: "#232334",
              confirmButtonText: "ok",
              closeOnConfirm: true
            });
        }

    else{
     
                swal({
          title: "Nkeksi-team. Upload File",
          html:true,
          text: "You are about to upload <b class=\"nkeksi-green\">"+ docName.files[0].name+"</b>",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, Upload!",
          calcelButtonColor:"#333333",
          cancelButtonText: "No, cancel!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            Uploadfile(1);
              
          }

           else {
              swal("Cancelled", "Upload failed", "error");
          }
        });
    }



});


restauSigin.addEventListener('click' , function(){
  $('.modal').modal('hide');
          var email = ownerEmail.value;
          var password = ownerPassword.value;

          firebase.auth().signInWithEmailAndPassword(email ,password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
});

});


restauSubmit.addEventListener("click" , function() {
 
  restName  = rName.value;
  var restaurant_description = $("#restaurant_description").val();
  var restaurant_password = $("#myPassword").val();
  var deliveryButton = $("#deliveryButton").val();
  restLocation = rLoc.value;
  restAddress = rAddr.value;
  restTel = rTel.value;
  restEmail = rEmail.value;
  restOwner = rOwner.value;
  restOwnerMobile = rMobile.value;

  			console.log(deliveryButton + restaurant_password + restName + restaurant_description  + restAddress + restEmail + restTel + restLocation + restOwner + restOwnerMobile);

  		    promise = firebase.auth().createUserWithEmailAndPassword(restEmail, restaurant_password);
               promise.then(function(user) {
               // You are forgetting this reference.
                user.sendEmailVerification();

                              swal({
                title: "Nkeksi Team",
                text: "An email verification  has been sent to " + restEmail + " please ensure to verify thanks!",
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#4CAF50",
                confirmButtonText: "ok!",
                closeOnConfirm: false,
              },
              function(){
                       
                            //alert("came");
                        var email=$("#email").val();// value in field email
                        $.ajax({
                            type:'post',
                                url:'checkMail.php',// put your real file name 
                                data:{email: email},
                                success:function(msg){
                                alert(msg); // your message will come here.     
                                }
                         });
                        
                    window.location = "instructions.html";

              });
     // You can also call this.
                 }, function(error) {
			      // An error happened.
			        // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			               });

	     firebase.auth().signInWithEmailAndPassword(restEmail , restaurant_password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...
	});
firebase.auth().onAuthStateChanged(function(firebaseUser){

  if(firebaseUser){
      console.log("logged in");
    }

    else
    {
      console.log("oops");
    }
    });

});



firebase.auth().onAuthStateChanged(function(firebaseUser){

  if(firebaseUser){
      console.log("logged in");
      restauLogout.classList.remove('hidden');
      restauLogin.classList.add('hidden');
    }
    else
    {
      console.log("logged out");
      restauLogout.classList.add('hidden');
      restauLogin.classList.remove('hidden');
      restauLogin.classList.add('show');
    }
    });

