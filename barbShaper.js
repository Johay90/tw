/* -- THIS SCRIPT IS HEAVY WIP, NOT EVEN NEARLY WORKING

PROGRESS
- Finished Interface


TODO
- Need to finish the buttons (need to figoure out how i'll do this), prolly tomorrow.
- Some sort of auto-updating of the html? Tomorrow.

- UI FUNCTIONABLE (Inclu functioning cat table etc, village cords, etc)
- Units input, cord input etc, click event etc. 
- Scout section (import village/buildings level into our arrays/cookies etc)
- Notebook/paste comment button

RESOURCES
cat table: https://help.tribalwars.net/wiki/Charts

COMMENT
1) The UI and idea is completetly ripped from https://puu.sh/Dis7z.mp4 (https://i.gyazo.com/1847222f0bed892b6a97c950e8530052.png) which I found on the forum. I loved the idea behind this. I'm aware this idea was never TW approved, but fuck it. It's not breaking any rules; the idea is really cool. 

2) Layout/UI code is pretty fucking messy and all over the place. If you ever want to change the UI I hope you like spaghetti.
*/

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
Font Import(s)      - Not currently planning on doing much more with Ui for more fonts, but I sometimes do use a lot of fonts to keeping this function for now.
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function addGoogleFont(FontName) {
    $("head").append("<link href='https://fonts.googleapis.com/css?family=" + FontName + "' rel='stylesheet' type='text/css'>");
}
addGoogleFont("Ubuntu"); 

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
VARS & ARRAYS, Objs
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
var shapedImage;
var desiredLevel = {
        headquarters: 1, 
        barracks: 0,
        stable: 0,
        workshop: 0,
        smithy: 0,
        rally: 0,
        market: 0,
        timber: 30,
        clay: 30,
        iron: 30,
        farm: 1,
        hiding: 10,
        warehouse: 30
    };

var currentLevel = { // this obj will be collected later via scout section. Currently values just for testing.
        headquarters: 1, 
        barracks: 5,
        stable: 5,
        workshop: 5,
        smithy: 5,
        rally: 0,
        market: 0,
        timber: 30,
        clay: 25,
        iron: 30,
        farm: 17,
        hiding: 10,
        warehouse: 30
    };

   /* don't need this anymore? I was a dumb dumb.
   for (let index = 0; index < 12; index++) {
            if (['farm', 'headquarters'].indexOf(Object.keys(currentLevel)[index]) >= 0) { 
                // We can or should only knock these to level 1. So need to do a check this way. 
                console.log("Found " + Object.keys(currentLevel)[index]);
        }
    }
    */

function updateUI(buildName) {
    var html = "<td align='center' class='lit-item'>" + currentLevel[buildName] + "</td><td align='center' class='lit-item'>" + desiredLevel[buildName];

    if (buildName == "hiding") { // No button + Tick (We can't do anything with hiding place so we pretty much ignore).
        return html + "</td><td align='center' class='lit-item'><img width='20px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/tick.png'></td><td align='center' class='lit-item'></td>";
    }
    else if (['warehouse', 'iron', 'clay', 'timber'].indexOf(buildName) >= 0) { // No button, but shaped icon should be active (We don't want to damage these but having the shaped tick or x is nice).

        if (parseInt(currentLevel[buildName]) == parseInt(desiredLevel[buildName])) {
            return html + "</td><td align='center' class='lit-item'><img width='20px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/tick.png'></td><td align='center' class='lit-item'></td>";
        } 
        else{
            return html + "</td><td align='center' class='lit-item'><img width='20px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/x.png'></td><td align='center' class='lit-item'></td>";
        }
    } else if (parseInt(currentLevel[buildName]) != parseInt(desiredLevel[buildName])) {
        return html + "</td><td align='center' class='lit-item'><img width='20px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/x.png'></td><td align='center' class='lit-item'><button class='attack btn btn-attack btn-target-action' type='button' id='building_attack'>Send Attack!</button></td>"
    } else {
        return html + "</td><td align='center' class='lit-item'><img width='20px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/tick.png'></td><td align='center' class='lit-item'></td>"
        }
}
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
THE INTERFACE [MAP]
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    $("<div></div>").attr('id', 'shapeGUI').appendTo('body');
    $("#shapeGUI").css({
    "width": "350px",
    "border": "1px solid #a48341",
    "margin": "0",
    "position": "fixed",
    "top": "50px",
    "font-family":"'Ubuntu', sans-serif",
    "right": "0",
    "height": "auto",
    "z-index": "21", 
    "background-color": "#f4e4bc"
    });   
    $("#shapeGUI").draggable();
    $("#shapeGUI").html("\
        <div id='shapeHeader'>\
        <h2 style='text-align:center'>Barb Shaper</h2>\
        <table class='vis' style='width: 100%'><tbody>\
            <tr><th style='text-align:center !important'>Cord</th>\
            <th style='text-align:center !important'>Village Name</th>\
            <th style='text-align:center !important'>Distance</th>\
            <th style='text-align:center !important'>Points</th>\
            <tr><td align='center' class='lit-item'>test1</td>\
            <td align='center' class='lit-item'>test2</td>\
            <td align='center' class='lit-item'>test3</td>\
            <td align='center' class='lit-item'>test3</td>\
            </tbody></table></div><hr>\
            \
            <div id='shapeBody'>\
            <table class='vis' style='width: 100%'><tbody>\
            <tr><th style='text-align:center !important'>Building</th>\
            <th style='text-align:center !important'>Current Level</th>\
            <th style='text-align:center !important'>Target</th>\
            <th style='text-align:center !important'>Shaped</th>\
            <th style='text-align:center !important'>Button</th>\
            \
            <tr title='Headquarters'><td align='center' class='lit-item'><img src='https://raw.githubusercontent.com/Johay90/tw/master/res/hq.png'></td> " + updateUI('headquarters') + "\
            <tr title='Barracks'><td align='center' class='lit-item'><img src='https://raw.githubusercontent.com/Johay90/tw/master/res/rax.png'></td> " + updateUI('barracks') + "\
            <tr title='Stable'><td align='center' class='lit-item'><img src='https://raw.githubusercontent.com/Johay90/tw/master/res/stable.png'></td> " + updateUI('stable') + "\
            <tr title='Workshop'><td align='center' class='lit-item'><img src='https://raw.githubusercontent.com/Johay90/tw/master/res/workshop.png'></td> " + updateUI('workshop') + "\
            <tr title='Smithy'><td align='center' class='lit-item'><img src='https://raw.githubusercontent.com/Johay90/tw/master/res/smith.png'></td> " + updateUI('smithy') + "\
            <tr title='Rally Point'><td align='center' class='lit-item'><img src='https://raw.githubusercontent.com/Johay90/tw/master/res/rally.png'></td> " + updateUI('rally') + "\
            <tr title='Market'><td align='center' class='lit-item'><img src='https://raw.githubusercontent.com/Johay90/tw/master/res/market.png'></td> " + updateUI('market') + "\
            <tr title='Timber'><td align='center' class='lit-item'><img src='https://raw.githubusercontent.com/Johay90/tw/master/res/wood.png'></td> " + updateUI('timber') + "\
            <tr title='Clay'><td align='center' class='lit-item'><img src='https://raw.githubusercontent.com/Johay90/tw/master/res/stone.png'></td> " + updateUI('clay') + "\
            <tr title='Iron'><td align='center' class='lit-item'><img src='https://raw.githubusercontent.com/Johay90/tw/master/res/iron.png'></td> " + updateUI('iron') + "\
            <tr title='Farm'><td align='center' class='lit-item'><img src='https://raw.githubusercontent.com/Johay90/tw/master/res/farm.png'></td> " + updateUI('farm') + "\
            <tr title='Warehouse'><td align='center' class='lit-item'><img src='https://raw.githubusercontent.com/Johay90/tw/master/res/storage.png'></td> " + updateUI('warehouse') + "\
            <tr title='Hiding Place'><td align='center' class='lit-item'><img src='https://raw.githubusercontent.com/Johay90/tw/master/res/hide.png'></td> " + updateUI('hiding') + "\
            </tbody></table><br><br>testing..</div>\
        ");
        $("#shapeHeader").css({
            "background-color": "#c1a264",
            "padding-top":"25px"
            });
        $("#shapeBody").css({
             "background-color": "#f4e4bc"
         }); 
        $('#shapeBody > table, #shapeBody > table > tbody > tr > th, #shapeBody > table > tbody > tr > td').css({
           "border": "1px solid #bfa473",
            "border-collapse": "collapse"
        }); 
        $("#shapeBody").tooltip({show: null,position: {my: "left top",at: "left bottom"},open: function(event, ui) {ui.tooltip.animate({ top: ui.tooltip.position().top +10 }, "fast" );}});