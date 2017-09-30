
 jQuery().ready(function(){

var currentUser;
var userPhone;
var userName;
var Userpic;
var cartArray =  new Array();
var IdArray = new Array();
var body = document.createElement("div");


 firebase.auth().onAuthStateChanged(function(firebaseUser){

  if(firebaseUser){

    console.log("User logged in" , firebaseUser);
    // Setting user credentials.

         btnlogout.classList.remove('hidden');
             primarySignin.classList.add('hidden');
             primaryRegister.classList.add('hidden');
             $("#comment_block").show();
             $("#silie").removeClass("hidden");
             $("#displayUsername").removeClass("hidden");
               
            
                // $("#silie").attr("src", photoUrl);
                 $("#displayUsername").append("Welcome, " + name);

              var test = firebase.database().ref().child('restaurant').orderByChild('location').equalTo('Buea');

              test.on("value" , function(snapshot){
                  console.log(snapshot.val());
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

  }


});



     var parameter = location.search.substring(1).split("+");
     var temp = parameter[0].split("=");

    var l = unescape(temp[1]);

      var ref = firebase.database().ref().child("unVerified/" + l);
      var messageRef = firebase.database().ref().child("message/" + l);
      var orderRef = firebase.database().ref().child("orders/"+l)

      ref.once("value" , function(snapshot){
            name = snapshot.val().restoName;
            des = snapshot.val().restaurant_description;
            hrs = snapshot.val().restoTime;
            loc =  snapshot.val().restoLocation;
            addr = snapshot.val().restoAddress;
            tel =  snapshot.val().restauPhoneNumber;
            email = snapshot.val().restoEmail;

            $("#idName").html(name);
            $("#idMail").html(email);
            $("#idTel").html(tel);
            $("#idAddr").html(addr);
            $("#idLoc").html(loc);
            $("#idRestoTwo").html(name);
            $("#idMail2").attr("href","mailto:" + email);

      });


    menuRef = firebase.database().ref("Menu");

   ref.on("value" , function(snapshot){
            m = snapshot.key;
            menuRef.child(m).on("value"  , function(test){ 
                    anotherArray = test.val();
                    head2 = test.key;
                    keyst = Object.keys(anotherArray); 

                    for(var k = 0 ; k< keyst.length ; k++){

                      var createTable  = '<div class="d'+k+' col-lg-8 col-xs-9 col-sm-12"><div class="table-respon"><table class="table table-hover"><thead><tr><td><h4>'+keyst[k]+'<h4></td></tr></thead><tbody id="d'+k+'"></tbody></table></div></div>';
                      $(".ListDiv").append(createTable);
                    }                 
                  
                  for(var j =0 ; j<keyst.length ; j++){
                        console.log(keyst[j]);
            menuRef.child(m).child(keyst[j]).
            orderByKey().once("value" , function(childSnapshot){

                    testArray = childSnapshot.val();
                    head = childSnapshot.key;
                    keys = Object.keys(testArray);
                  

                    for(var i = 0 ; i< keys.length ; i++){

                      var currentObject = testArray[keys[i]];
                      console.log(currentObject.item);

                      it = currentObject.item;
                     
var row  = '<tr id="'+it+'"><td class="active">'+(i+1)+'</td><td class="active"><img src='+currentObject.pic+' class="img-responsive" width="250px"></td><td class="success item_name">'+currentObject.item+'</td><td class="success nkeksi-green"><span class="item_price">'+currentObject.price+'</span> <span class="currency">XAF</span></td><td><button class="special-cart">ADD <span class="glyphicon glyphicon-plus-sign nkeksi-green"></span></button><td></tr>';
                        $('#d'+j+'').append(row);
                    
                    }             

                    });

                  }


$(".special-cart").click(function(){

    var thisID    = $(this).parent().parent().attr('id').replace(/\s/g,'');
    thisID = thisID.replace(/[()]/g,"");
    $(this).parent().parent().addClass(thisID);

        if(include(cartArray , thisID)){
              var itemname  = $('.'+thisID+'').find('.item_name').html();
     var itemprice = $('.'+thisID+'').find('.item_price').html();
     $("#cartAudio")[0].play();
                $("#cartImg").effect("shake", { times:3 ,distance : 10, direction:"up" }, 1000);

            console.log("it already exist");
            console.log(cartArray);

            var price    = $('#each-'+thisID).children(".shopp-price").find('em').html();
            var quantity = $('#each-'+thisID).children(".shopp-quantity").html();
            quantity = parseInt(quantity)+parseInt(1);
            
            var total = parseInt(itemprice)*parseInt(quantity);
            
            $('#each-'+thisID).children(".shopp-price").find('em').html(total);
            $('#each-'+thisID).children(".shopp-quantity").html(quantity);
            
            var prev_charges = $('.cart-total span').html();
            prev_charges = parseInt(prev_charges)-parseInt(price);
            
            prev_charges = parseInt(prev_charges)+parseInt(total);
            $('.cart-total span').html(prev_charges);
            
            $('#total-hidden-charges').val(prev_charges);
        }

        else{
            cartArray.push(thisID) ;

             numItems = cartArray.length;
             console.log(cartArray);

    $("#cartImg").effect("shake", { times:3 ,distance : 10, direction:"up" }, 1000);
    $("#cartAudio")[0].play();
    $("span.cartNum ,span.cartNum2").html(numItems);
    $("span.cartNum2").removeClass('hidden');
    $("span.cartNum2").addClass('show');

     var itemname  = $('.'+thisID+'').find('.item_name').html();
     var itemprice = $('.'+thisID+'').find('.item_price').html();

     var prev_charges = $('.cart-total span').html();
     prev_charges = parseInt(prev_charges) + parseInt(itemprice); 
     $('.cart-total span').html(prev_charges);

                var Height = $('#cart_wrapper').height();

            $('#cart_wrapper').css({height:Height+parseInt()});

            $('#cart_wrapper .cart-info').append('<div class="shopp" id="each-'+thisID+'"><div class="labelItem">'+itemname+'</div><div class="shopp-price"><em>'+itemprice+' XAF</em></div><span class="shopp-quantity">1</span><i class="fa fa-trash-o remove nkeksi-green" aria-hidden="true"></i><br class="all" /></div>');


              


  
        }



    // console.log(thisID);
    // console.log(itemname);
    // console.log(itemprice);
    // console.log(cartArray[0]);

    // $('#cartNum').html('1');
    // $('#cart_wrapper').append('<div>'+itemname+'<i class="fa fa-trash-o" aria-hidden="true"></i></div>');
});



                   });
              


    
    });
 

function include(arr, obj) {

  for(var i=0; i<arr.length; i++) {
    if (arr[i] == obj) return true;
  }
}




function sendRestoMesssage(restoUid , userUid, username, p, picture, body) {
  // A post entry.
  var postOrder = {
    uid : userUid,
    name: username,
    phone: p,
    body: body,
    userpic: picture
  };


  // Write the new post's data simultaneously in the posts list and the user's post list.
   var updates = {};
  updates['/Orders/' + restoUid + '/' + userUid] = postOrder;

  return firebase.database().ref().update(updates);

}


    $('.remove').livequery('click', function() {
      $("#cartAudioDelete")[0].play();
      $("#cartImg").effect("shake", { times:3 ,distance : 10, direction:"left" }, 700);
      console.log(cartArray);
        var deduct = $(this).parent().children(".shopp-price").find('em').html();
        var prev_charges = $('.cart-total span').html();
        
        var thisID = $(this).parent().attr('id').replace('each-','');
        
        var pos = getpos(cartArray,thisID);
        cartArray.splice(pos,1);
        console.log(cartArray);
        
        numItems = cartArray.length;
        $("span.cartNum ,span.cartNum2").html(numItems);
        prev_charges = parseInt(prev_charges) - parseInt(deduct);
        $('.cart-total span').html(prev_charges);
        $('#total-hidden-charges').val(prev_charges);
        $(this).parent().remove();
        
    });

function getpos(arr, obj) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] == obj) return i;
  }
}


    $("#btnOrder").click(function(){
      // var t = $(".cart-info").find(".shopp").each(function(){
      //   var getItem = $('#'+this.id+'').children(".labelItem").html();
      //   var getItemQty = $('#'+this.id+'').children(".shopp-price").eq(0).text();
      //   var getItemPrice = $('#'+this.id+'').children(".shopp-quantity").html();
      //   console.log(getItem , getItemPrice , getItemQty);
      //   // IdArray.push(this.id);
      //   // body.append(getItem);
      //
      // });
      //
      // var totalPrice = $("#total-shown-charges").html();
      // console.log(totalPrice)
      // console.log(IdArray);
      // console.log("ok");

        swal({
          title: "Nkeksi team",
          text: "Coming Soon ...",
          imageUrl: 'images/nkeksi-loader.gif'
        });
           


    });


    $("#btnReserve").click(function(){
      var prevUSER = firebase.auth().currentUser;

       if(prevUSER == null){

        swal({
          title: "Warning",
          type: "error",
          text: "Sorry  you must be signed in to place an order",
          imageUrl: 'images/oops.jpg'
        });
               }

       else {

        currentUser  = firebase.auth().currentUser.uid;
        
      userRef = firebase.database().ref().child("UserInfo/" + currentUser);

      userRef.once("value" , function(snapshot){

           userName = snapshot.val().firstName;
           p = snapshot.val().phoneNum;
           userPic = snapshot.val().profile_picture;

           // body = "";

        sendRestoMesssage( l , currentUser , userName , p , userPic , "asdsa");

      });

    }


    });


}());

