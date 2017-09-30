

var docRev = firebase.database().ref().child('DocumentReview/');

docRev.on("child_added" , function(snapshot) {

	console.log(snapshot.val().doc);
	$('#restauPending').attr("href", snapshot.val().doc);
	// body...
});

var unverified = firebase.database().ref().child('unVerified');

unverified.on("value" , function(snapshot) {
			console.log(snapshot.val());
			console.log(snapshot.numChildren());
			testArray = snapshot.val();
			keys = Object.keys(testArray);
	for(var i = 0 ; i < keys.length ; i++){
		var currentObject = testArray[keys[i]];
	$('#restauName').append("<tr><td>"+i+"</td><td>" + currentObject.restoName + "</td><td><a href="+currentObject.DocumentReview+">doc</a></td><td><button id=button"+(i+1)+" class='btn btn-success' >add Restau</button></td></tr>");
				
				}
		// });
});

var btnValidate = document.getElementById('validateBtn');

btnValidate.addEventListener("click" , function(){

		unverified.once("child_added" , function(snapshot) {
			var docu = unverified.key();
			console.log(docu);
			
});


});