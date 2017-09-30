 // var = document.getElementById("uniqueRestoName");
// var = document.getElementById("");
// var = documnet.getElementById("");

 var uploadDoc = document.getElementById("uploadDoc");

 jQuery().ready(function(){
 	// var ref.createUser(/* credentials */, function(error, userData) {
 	//   if (error) {
 	//     switch (error.code) {
 	//       case "EMAIL_TAKEN":
 	//         console.log("The new user account cannot be created because the email is already in use.");
 	//         break;
 	//       case "INVALID_EMAIL":
 	//         console.log("The specified email is not a valid email.");
 	//         break;
 	//       default:
 	//         console.log("Error creating user:", error);
 	//     }
 	//   } else {
 	//     console.log("Successfully created user account with uid:", userData.uid);
 	//      // do things
 	//   }
 	//   });

firebase.auth().onAuthStateChanged(function(firebaseUser){

  if(firebaseUser){
       	var userRef = firebase.database().ref().child('unVerified/' + firebaseUser.uid);

 			userRef.on("value" , function(snap){
 				console.log(snap.val().restoName);
 					if(snap.val().isResto === "false"){
 						window.location = "home.html";
 					}

 					else{

 						 console.log("logged in" , firebaseUser);
 						 var restoName = snap.val().restoName;
             var restoPic = snap.val().restoImage;
             console.log(restoPic);
 						 $("#uniqueRestoName").html(restoName);
             $("#uniqueRestoPic").attr("src" , restoPic);


             var orderRef = firebase.database().ref().child("Orders/" + firebaseUser.uid);

             orderRef.on("child_added" , function(snapshot){

                  uid = snapshot.val().uid;
                  name = snapshot.val().name;
                  pic = snapshot.val().userpic;
                  phone = snapshot.val().phone;
                  $("#reserveWell").append('<div class="col-lg-12"><div class="col-lg-3"><img src='+ pic +' class="img-circle" width="70px"></div><div class="col-lg-3 text-center">'+ name +'</div><div class="col-lg-3 text-center">'+ phone +'</div><div class="col-lg-3 text-center">'+uid+'</div></div>');
             });


    var storageRef = firebase.storage().ref().child('menuUploads/' + firebaseUser.uid);

 						 var uploadBtn1 = document.getElementById('updateMenuFile1');
             var uploadBtn2 = document.getElementById("updateMenuFile2")
             var uploadBtn3 = document.getElementById("updateMenuFile3")
             var uploadBtn4 = document.getElementById("updateMenuFile4")
             var uploadBtn5 = document.getElementById("updateMenuFile5")

 						 uploadBtn1.addEventListener("click" , function(){

                    var img1 = document.getElementById("image1").files[0];
                    var price1 = $("#price1").val();
                    var menu1 = $("#meal1").val();
                    var desc =  $("#meal1Desc").val();
                    var cuisine = $("#cusine1").val();

                      var metadata = {
                        'contentType': img1.type
                      };

                    var photoRef = storageRef.child(img1.name);
                  // Upload file to Firebase Storage
                    var uploadTask = photoRef.put(img1, metadata).then(function(snapshot) {
                  console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                  console.log(snapshot.metadata);
                  var url = snapshot.downloadURL;
                  console.log('File available at', url);
              var menuRef = firebase.database().ref().child("Menu/" + firebaseUser.uid);
                  menuRef.child(cuisine).push().set({

                    item  : menu1,
                    price : price1,
                    description : desc,
                    pic : url
                  });




             });		

             });	

            uploadBtn2.addEventListener("click" , function(){
                          var img2 = document.getElementById("image2").files[0];
                    var price2 = $("#price2").val();
                    var menu2 = $("#meal2").val();
                    var desc2 =  $("#meal2Desc").val();
                    var cuisine2 = $("#cusine2").val();

                      var metadata = {
                        'contentType': img2.type
                      };

                    var photoRef = storageRef.child(img2.name);
                  // Upload file to Firebase Storage
                    var uploadTask = photoRef.put(img2, metadata).then(function(snapshot) {
                  console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                  console.log(snapshot.metadata);
                  var url = snapshot.downloadURL;
                  console.log('File available at', url);
              var menuRef = firebase.database().ref().child("Menu/" + firebaseUser.uid);
                  menuRef.child(cuisine2).push().set({

                    item  : menu2,
                    price : price2,
                    description : desc2,
                    pic : url
                  });




             });  


            });

             uploadBtn3.addEventListener("click" , function(){
                          var img3 = document.getElementById("image3").files[0];
                    var price3 = $("#price3").val();
                    var menu3 = $("#meal3").val();
                    var desc3 =  $("#meal3Desc").val();
                    var cuisine3 = $("#cusine3").val();

                      var metadata = {
                        'contentType': img3.type
                      };

                    var photoRef = storageRef.child(img3.name);
                  // Upload file to Firebase Storage
                    var uploadTask = photoRef.put(img3, metadata).then(function(snapshot) {
                  console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                  console.log(snapshot.metadata);
                  var url = snapshot.downloadURL;
                  console.log('File available at', url);
              var menuRef = firebase.database().ref().child("Menu/" + firebaseUser.uid);
                  menuRef.child(cuisine3).push().set({

                    item  : menu3,
                    price : price3,
                    description : desc3,
                    pic : url
                  });




             });  


            });

              uploadBtn4.addEventListener("click" , function(){
                          var img4 = document.getElementById("image4").files[0];
                    var price4 = $("#price4").val();
                    var menu4 = $("#meal4").val();
                    var desc4 =  $("#meal4Desc").val();
                    var cuisine4 = $("#cusine4").val();

                      var metadata = {
                        'contentType': img4.type
                      };

                    var photoRef = storageRef.child(img4.name);
                  // Upload file to Firebase Storage
                    var uploadTask = photoRef.put(img4, metadata).then(function(snapshot) {
                  console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                  console.log(snapshot.metadata);
                  var url = snapshot.downloadURL;
                  console.log('File available at', url);
              var menuRef = firebase.database().ref().child("Menu/" + firebaseUser.uid);
                  menuRef.child(cuisine4).push().set({

                    item  : menu4,
                    price : price4,
                    description : desc4,
                    pic : url
                  });




             });  


            });

               uploadBtn5.addEventListener("click" , function(){
                          var img5 = document.getElementById("image5").files[0];
                    var price5 = $("#price5").val();
                    var menu5 = $("#meal5").val();
                    var desc5 =  $("#meal5Desc").val();
                    var cuisine5 = $("#cusine5").val();

                      var metadata = {
                        'contentType': img5.type
                      };

                    var photoRef = storageRef.child(img5.name);
                  // Upload file to Firebase Storage
                    var uploadTask = photoRef.put(img5, metadata).then(function(snapshot) {
                  console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                  console.log(snapshot.metadata);
                  var url = snapshot.downloadURL;
                  console.log('File available at', url);
              var menuRef = firebase.database().ref().child("Menu/" + firebaseUser.uid);
                  menuRef.child(cuisine5).push().set({

                    item  : menu5,
                    price : price5,
                    description : desc5,
                    pic : url
                  });




             });  


            });





 		
 					}

		
 			});

      restauLogout.classList.remove('hidden');
      restauLogin.classList.add('hidden');
    }

    else
    { 
          window.location = "restau_login.html";
      console.log("logged out");
      restauLogout.classList.add('hidden');
      restauLogin.classList.remove('hidden');
      restauLogin.classList.add('show');

    }


    });

  var btnLogout = document.getElementById('logOut');

  btnLogout.addEventListener("click" ,  function(){
       firebase.auth().signOut();
    window.location = "restau_login.html";

  });


	}());

