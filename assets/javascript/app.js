$(document).ready(function(){

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDH2dCEoq5U-tsAMgrTWzwkeSc6TNfFc1A",
    authDomain: "trainactivity-7f2f4.firebaseapp.com",
    databaseURL: "https://trainactivity-7f2f4.firebaseio.com",
    projectId: "trainactivity-7f2f4",
    storageBucket: "trainactivity-7f2f4.appspot.com",
    messagingSenderId: "595600676406"
};
  firebase.initializeApp(config);
  database = firebase.database();

  //any time trains is changed in firebase the table is updated
  database.ref("/trains").on("value", function(snapshot) {
    $("#trains").empty();
    snapshot.forEach(function(eachTrain) {
        drawTableRow(eachTrain.val());
    });
  });

  //submit - object is created pushed to firebase
  $("#submit-button").on("click", function(){

    var newTrain = {
          trainName: $("#train-name").val().trim(),
        	destination: $("#destination").val().trim(),
        	firstTrainTime: $("#first-train-time").val().trim(),
        	frequency: $("#frequency").val().trim(),
      }
    database.ref("trains").push(newTrain);

    //user input are reset in the DOM
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");

    //to make sure page is not refreshed
  	return false;
  });
  //create each table row
  