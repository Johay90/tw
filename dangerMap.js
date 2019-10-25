javascript:

if ($("#map_popup").length) {

var villages = window.TWMap.villages;
var villObjKeys = Object.keys(villages);
var allyKey = Object.keys(window.TWMap.allyRelations);
var minPoints;
var villageID = [];
var friendly = [];
var currentPlayer;
var myUser = $("#menu_row > td:nth-child(11) > table > tbody > tr:nth-child(1) > td > a").text();
var myTribe;

function run() {
  for (var i = 0; i < villObjKeys.length; i++) {
    villageID.push(villObjKeys[i]);
  }
  for (var i = 0; i < allyKey.length; i++) {
    friendly.push(allyKey[i]);
  }
  for (var i = 0; i < villageID.length; i++) {
    if (villages[villageID[i]].id) { // sometimes ID missing which screws the split function.
      if (parseInt(villages[villageID[i]].points.split('.').join("")) >= minPoints) {
        currentPlayer = villages[villageID[i]].owner;
        if (window.TWMap.players[currentPlayer].name == myUser && !myTribe) {
          myTribe = window.TWMap.players[currentPlayer].ally;
          friendly.push(myTribe);
          i = 0;
        } else if (window.TWMap.players[currentPlayer].name != myUser && !myTribe) {
          continue;
        }
        if (friendly.indexOf(window.TWMap.players[currentPlayer].ally) == -1) {
          $("#map_village_" + villages[villageID[i]].id).css({
            "border-color": "red",
            "border-width": "6px",
            "border-style": "solid"
          });
        } else {
          continue;
        }
      }
    }
  }
}

function GUI() {
  setTimeout(function() {
    if ($('body > #scriptBody').length == 0) {
      var myTribe = "";
      $("<div></div>").attr('id', 'scriptBody').insertBefore('#contentContainer');
      $("#scriptBody").css({
        "opacity": "1",
        "padding": "10px",
        "border": "1px solid black",
        "text-shadow": "none",
        "position": "relative",
        "margin": "0 auto",
        "background-color": "white",
        "font-family": "'Muli', sans-serif",
        "line-height": "32px"
      });
      setTimeout(function() {
        $("#content_script").css({
          "width": "100%",
          "color": "black",
          "margin": "5px",
          "font-size": "16px",
        });
      }, 5);
      setTimeout(function() {
        $("hr").css({
          "border": "0",
          "height": "1px",
          "background-image": "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))"
        });
      }, 5);
      setTimeout(function() {
        $("#saveBtn").css({
          "text-shadow": "none",
          "padding": "16px 32px",
          "text-align": "center",
          "text-decoration": "none",
          "display": "inline-block",
          "font-size": "16px",
          "margin": "4px 2px",
          "-webkit-transition-duration": "0.4s",
          "transition-duration": "0.4s",
          "cursor": "pointer",
          "background-color": "white",
          "color": "black",
          "border": "2px solid #555555"
        });
      }, 5);
      $("#scriptBody").html("\
                <h1>Danger Map</h1><hr>\
                <div id ='content_script'></div>\
              ");
      $("#content_script").html("\
                Min-Points <input type='number' name='minPointsEl' min='0' max='13000' value='850'>\
                <input type='button' id='saveBtn' value='Run'/></input>\
              ");
    }
  }, 100);
}

$(document).on('click', '#saveBtn', function() {
  minPoints = $('#content_script > input[type="number"]:nth-child(1)').val();
  $("#scriptBody").hide();
  run();
});

GUI();

}else{
  alert("Run on Map page.");
}
