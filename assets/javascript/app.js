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

  database.ref("/trains").on("value", function(snapshot) {
    $("#trains").empty();
    snapshot.forEach(function(eachTrain) {
        drawTableRow(eachTrain.val());
    });
  });

  $("#submit-button").on("click", function(){

    var newTrain = {
          trainName: $("#train-name").val().trim(),
        	destination: $("#destination").val().trim(),
        	firstTrainTime: $("#first-train-time").val().trim(),
        	frequency: $("#frequency").val().trim(),
      }
    database.ref("trains").push(newTrain);

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");

  	return false;
  });


  function drawTableRow(train){
    var tr = $("<tr>");
    tr.append($('<td class="text-center">').text(train.trainName));
    tr.append($('<td class="text-center">').text(train.destination));
    tr.append($('<td class="text-center">').text(train.frequency));


    var tFrequency = train.frequency;
    var firstTrainTime = train.firstTrainTime;
    var currentTime = moment();
    var subtractYear = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    var timeDiff = currentTime.diff(moment(subtractYear), "minutes");
    var remainder = timeDiff % tFrequency;
    var minToNextTrain = tFrequency - remainder;
    var nextTrain = currentTime.add(minToNextTrain, "minutes").format("hh:mm");

    tr.append($('<td class="text-center">').text(nextTrain));
    tr.append($('<td class="text-center">').text(minToNextTrain));

    $("#trains").append(tr);

  }
});
