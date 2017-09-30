

// var restRef =  firebase.database().ref('/restaurant/');

// restRef.orderByChild('restaurant_location').equalTo('Buea').on('child_added' , function(snap){
// 			var name = snap.val().restaurant_name;
// 			var address = snap.val().restaurant_address;
// 			var searchDiv = '<div class="container"><div class="col-lg-12"><div class="row restau-div"><div class="col-lg-2 col-xs-2 center-block"><img src="$restau_picture" class="img-responsive" alt="restaurant-emblem" title="$restau_name logo"></div><div class="col-lg-10 col-md-6 col-sm-6 col-xs-12"><a href="restaurantpg.php" style="text-decoration:none;"><h2 class="nkeksi-green">'+ name + '</h2></a><p>$restau_description</p><div class="col-lg-4 col-md-6 col-sm-6 col-xs-12"><span class="badge"><span class="glyphicon glyphicon-map-marker star center-block"></span></span>&nbsp;&nbsp;&nbsp;'+ address + '</div><div class="col-lg-8 col-md-6 col-sm-6 col-xs-12"><a href="restaurantpg.html"><button type="button" class="btn btn-default btn-success signButton green-button">Enter</button></a>    </div><p class="clearfix"> <hr />  </div></div><p class="clearfix"></div></div>';

//          console.log(snap.val().restaurant_owner);
//          $("#searchResults").append(searchDiv);
//      });

'use strict';

var uniqueKey;
var resName;
var likes = new Array();
var currentUID;

 // Initialize Firebase
 //  var config = {
 //    apiKey: "AIzaSyCeZ9knF7puLXzr6xzldqK-426gSNNmByk",
 //    authDomain: "final-nkeksi.firebaseapp.com",
 //    databaseURL: "https://final-nkeksi.firebaseio.com",
 //    projectId: "final-nkeksi",
 //    storageBucket: "final-nkeksi.appspot.com",
 //    messagingSenderId: "1064067035279"
 //  };
 //  firebase.initializeApp(config);

var auth = firebase.auth();

firebase.auth().onAuthStateChanged(function(firebaseUser){

  if(firebaseUser){
    $("#overlay-content").css("display" , "none");
  }

  else{
     setTimeout(function(){
  $("#overlay-content").fadeOut("slow");
        }, 3000);
  }

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
                var displayName = snapshot.val().firstName;
               var photo = snapshot.val().profile_picture;

                $("#silie").attr("src", photo);
                $("#displayUsername").html('<span class="nkeksi-green">Welcome, ' + snapshot.val().username + '</span>');
                  console.log(snapshot.val().username);

              });
              queryOffline();
  }

  else{
            console.log("User logged out");

                  queryOffline();
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



//Handling the logging out system
btnlogout.addEventListener('click' , e => {
       firebase.auth().signOut();
    
});









var restoKEY;
var actualKey;
var searchRef =  firebase.database().ref('unVerified/');
var menuRef = firebase.database().ref('menu/');
var total  = new Array();
var divTotal;
var thisRestoKey;
var count = 1;

function queryOffline() {

    firebase.database().ref("DynamicMenu/").on("value" , function (snapshot) {

        snapshot.forEach(function (childSnap) {
            var key = childSnap.key;
            uniqueKey = key;
            console.log(key);

            childSnap.forEach(function (grandChild) {
                var key2 = grandChild.key;
                var numChildren = grandChild.numChildren();

                total.push(numChildren);

                grandChild.forEach(function (actualChild) {
                    var key3 = actualChild.key;
                    var item = actualChild.val().item;
                    var price = actualChild.val().price;
                    var pic = actualChild.val().pic;
                    console.log(item);

                    console.log(total);
                    divTotal = total.reduce(function(a, b) { return a + b; }, 0);
                    console.log(divTotal);

                    searchRef.child(uniqueKey).on("value" , function (restauSnap) {
                       var mykey = restauSnap.key;
                        thisRestoKey = restauSnap.val().restoName;
                        resName = thisRestoKey;
                        console.log(thisRestoKey);

                        var mydiv = subgrid( mykey ,resName, price , pic , item);
                        $("#dynamic").append(mydiv).delay(50*1).animate({opacity: 1},250);
                        console.log(grid(item));


                    });



                });

            });
        });
    });

    setTimeout(function () {
        $('#searchLoad').fadeOut("slow");
    } , 5000);



}



function grid(restoName) {


    var container = document.createElement('div');
    container.id = "main";
    container.className = " ";

    for (var i = 0; i < 1; i++) {

        var row = document.createElement('div');
        row.className = " ";
        row.id = "row" + i;

        for (var j = 0; j < 1; j++) {
            var box = document.createElement('div');
            var image = document.createElement('img');
            box.className = 'col-lg-4';
            row.appendChild(box);
            box.innerHTML = restoName;
        }

        container.appendChild(row);

    }

    return container;
}


function subgrid(id , name , price , img , item) {
    var max = 300;
    var random  = Math.round(Date.now() / (Math.random()*max + 1));

    var col = document.createElement('div');
    var priceDiv = document.createElement('div');
    var fig = document.createElement('figure');
    var image = document.createElement('img');
    var like = '<div class="center like-div"><span id='+random+' onClick="dynamicCall(this.id);" style="font-size: 20px;" class="like-me glyphicon glyphicon-heart-empty"></span></div>';
    $(image).addClass("img-responsive food-view");
    $(fig).append(like);
    fig.appendChild(image);


    $(col).addClass("col-sm-4 div-dish text-center");

    priceDiv.id = "div-rotate";

    var figCap = '<figcaption class="text-left"><a style="color: black;" href="restaurantpg.html?id='+id+'"><h4>'+name+'<h4/></a><p class="nkeksi-green" style="font-size:18px;">'+item+'</p></figcaption>';
    $(fig).append(figCap);


    var spanDiv = '<span class="price_id">'+price+' <span class="currency">xaf</span></span>';
    $(priceDiv).append(spanDiv);
    priceDiv.appendChild(fig);


    $(image).attr("src" , img);
    $(image).wrap('<a class="resto-link" href=restaurantpg.html?id='+id+'></a>');
    col.appendChild(priceDiv);
    col.appendChild(fig);

    return col;
}


function dynamicCall(p) {

        likes.push(p);
        count = counter(likes , p);
        console.log(count)

        if(count % 2 == 0){
            $('#'+p+'').addClass("glyphicon-heart-empty");
            $('#'+p+'').removeClass("glyphicon-heart");
            $('#'+p+'').css("color" ,"blue");
        }
        else{
            $('#'+p+'').addClass("glyphicon-heart");
            $('#'+p+'').removeClass("glyphicon-heart-empty");
            $('#'+p+'').css("color" ,"red");
        }

}

function include(arr, obj) {

    for(var i=0; i<arr.length; i++) {
        if (arr[i] == obj) return true;
    }
}

function counter( list, x ) {

    for ( var l = list.length, c = 0; l--; ) {

        if ( list[ l ] === x ) {

            c++;
        }
    }

    return c;

}


$( "#searchQuery" ).keypress(function(evt) {

      var charCode = evt.which || evt.keyCode;

      if(charCode == 8 || charCode == 46){

        console.log("backspace pressed");
      }
      else {

        var charStr = String.fromCharCode(charCode);
         var  t = charStr.toLowerCase();
        	$("#display").text(this.value.toLowerCase());
      console.log(t);
      	searchTwo();
      }
});


function searchTwo(){
    var t;
    var ref = firebase.database().ref('/unVerified/');
    ref.on("value" , function (snapshot) {

      t =  snapshot.val();
    });

    alert(t);
}

function getParameter() {

     var parameter = location.search.substring(1).split("+");
     var temp = parameter[0].split("=");

     var l = unescape(temp[1]).toLowerCase();

     return l;
}




 var restRef =  firebase.database().ref('/unVerified/');
         var searchParam = getParameter();

         console.log(searchParam);
          if(!searchParam){
         


               console.log("search is null");
                restRef.on('value' , function(snap){
         snap.forEach(function(item){
         var key = item.key;
         restoKEY = key;
         actualKey = key;
         var name = item.val().restoName;
         var address = item.val().restoAddress;
         var desc = item.val().restaurant_description;
         var logo = item.val().restoImage;
               if (logo == "" || logo == null){
                 logo = "images/hut.png"
               }
         var searchDiv = '<div class="container"><div class="col-lg-12"><div class="row restau-div"><div class="col-lg-2 col-xs-5 center-block"><img src="'+logo+'" class="img-responsive img-circle" width="200" style="padding-top:5px;" alt="restaurant-emblem" title="'+name+' logo"></div><div class="col-lg-10 col-md-6 col-sm-6 col-xs-12"><a href="restaurantpg.php" style="text-decoration:none;"><h2 class="nkeksi-green">'+ name + '</h2></a><p>'+ desc +'</p><div class="col-lg-4 col-md-6 col-sm-6 col-xs-12"><i class="fa fontawesome-icon fa-2x circle-yes fa-map-marker"></i>&nbsp;&nbsp;&nbsp;'+ address + '</div><p class="clearfix"><div class="col-lg-8 col-md-6 col-sm-6 col-xs-12"><p class="clearfix"><button type="button" id="'+restoKEY+'" onClick="reply_click(this.id);" class="btn btn-default btn-success signButton green-button">Enter</button></div><p class="clearfix"> <hr /></div></div><p class="clearfix"></div></div>';
           $("#searchResults").append(searchDiv);

         });
    
        

      });


          }
          else {
                 console.log(searchParam);

 restRef.orderByChild('indexLocation').equalTo(searchParam).on('value' , function(snap){
         snap.forEach(function(item){
             var keyd = item.key;
             restoKEY = keyd;
         var name = item.val().restoName;
         var address = item.val().restoAddress;
         var desc = item.val().restaurant_description;
         var logo = item.val().restoImage;

             if (logo == "" || logo == null){
                 logo = "images/hut.png"
             }
             var searchDiv = '<div class="container"><div class="col-lg-12"><div class="row restau-div"><div class="col-lg-2 col-xs-5 center-block"><img src="'+logo+'" class="img-responsive img-circle" width="200" style="padding-top:5px;" alt="restaurant-emblem" title="'+name+' logo"></div><div class="col-lg-10 col-md-6 col-sm-6 col-xs-12"><a href="restaurantpg.php" style="text-decoration:none;"><h2 class="nkeksi-green">'+ name + '</h2></a><p>'+ desc +'</p><div class="col-lg-4 col-md-6 col-sm-6 col-xs-12"><i class="fa fontawesome-icon fa-2x circle-yes fa-map-marker"></i>&nbsp;&nbsp;&nbsp;'+ address + '</div><p class="clearfix"><div class="col-lg-8 col-md-6 col-sm-6 col-xs-12"><p class="clearfix"><button type="button" id="'+restoKEY+'" onClick="reply_click(this.id);" class="btn btn-default btn-success signButton green-button">Enter</button></div><p class="clearfix"> <hr /></div></div><p class="clearfix"></div></div>';
             $("#searchResults").append(searchDiv);

         });
    
        

      });


         }

function reply_click(obj)
{
    restoKEY = obj;
    actualKey = obj;
   window.location = "restaurantpg.html?id="+restoKEY;

      
}