/* -- THIS SCRIPT IS HEAVY WIP, NOT EVEN NEARLY WORKING

PROGRESS
- UI is pretty much done now
- Auto updating UI is done (need to switch click events around once we implement sending)
- backend is done for amount of cats to send
- barb info is done (for the interface, not scouting)


Next TODOs
- Scout section (import village/buildings level into our arrays/cookies etc)
- Sending and click events/checks for this (saving this for last since we don't have cats unlocked yet....)

SMALL NOTES
- maybe do switch/case for scout section vs map?


SEND
- Function -> return as array?

NOTEBOOK
Have a button to copy to clipboard for handy paste?

COMMENT
1) The UI and idea is completetly ripped from https://puu.sh/Dis7z.mp4 (https://i.gyazo.com/1847222f0bed892b6a97c950e8530052.png) which I found on the forum. I loved the idea behind this. I'm aware this idea was never TW approved, but fuck it. It's not breaking any rules; the idea is really cool. 

2) Layout/UI code is pretty fucking messy and all over the place. If you ever want to change the UI I hope you like spaghetti.

3) I did have thoughts on making this a "multi-village" thing, ie to where we would hold a few scout reports. However, this doesn't really make sense. Generally with shaping you don't want your scout report to be out of date; with a little fluctuation in the data we have it would fuck our 'shape' up, wasting hours. Also, with that in mind it would change the way we code things, and make the scope of this sciprt a lot bigger. If theres demand for a multi-village thing we can look at that later on, but for the intial script single village is fine. 
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

var sendCats;
var catTable = [0,2,2,2,3,3,3,3,3,4,4,4,5,5,6,6,6,7,8,8,9,10,10,11,12,13,15,16,17,19,20];

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

function updateUI(buildName) {
    var html = "<td align='center' class='lit-item'>" + currentLevel[buildName] + "</td><td align='center' class='lit-item'>" + desiredLevel[buildName];
    var button = "<td align='center' class='lit-item'><button class='attack btn btn-attack btn-target-action' type='button' value="+ buildName + " name='catButton'>Send Attack!</button></td>";

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
        return html + "</td><td align='center' class='lit-item'><img width='20px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/x.png'></td>" + button;
    } else {
        return html + "</td><td align='center' class='lit-item'><img width='20px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/tick.png'></td><td align='center' class='lit-item'></td>";
        }
}

/// cord shit
var main = "636|464".split("|"); 
var target = "635|458".split("|");
var barbTarget = new Object();
barbTarget.x = target[0];
barbTarget.y = target[1];

for (let index = 0; index < Object.keys(TWMap.villages).length; index++) {
    if (parseInt(barbTarget.x + barbTarget.y) == TWMap.villages[Object.keys(TWMap.villages)[index]].xy) {
        barbTarget.name = TWMap.villages[Object.keys(TWMap.villages)[index]].name;
        barbTarget.points = TWMap.villages[Object.keys(TWMap.villages)[index]].points;
        break; 
    }
} 

var fieds = [];
for (let index = 0; index <= 1; index++) {
    fieds.push(Math.abs(parseInt(main[index])) - Math.abs(parseInt(target[index])));
}
catTravelTime = 30;
q = Math.sqrt(Math.pow(fieds[0], 2) + Math.pow(fieds[1], 2));
var hours = (q * 30 / 60);
var rhours = Math.floor(hours);
var minutes = (hours - rhours) * 60;
var rminutes = Math.round(minutes);
if (rhours < 10) {rhours = "0" + rhours}
if (rminutes < 10) {rminutes = "0" + rminutes}
barbTarget.travel = rhours+":"+rminutes;

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
THE INTERFACE [MAP]
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$("<div></div>").attr('id', 'shapeGUI').insertAfter('body');
$("#shapeGUI").css({"width": "400px","border": "1px solid #a48341","margin": "0","position": "fixed","top": "50px","font-family":"'Ubuntu', sans-serif","right": "0","height": "auto","z-index": "21","background-color": "#f4e4bc"});   
$("#shapeGUI").draggable();
$('#shapeGUI').append("<div id='shapeHeader'></div>");
$('#shapeGUI').append("<div id='shapeBody'></div>");

    function updateContent(){
        /*
            Few ways I could of done this, this method does cause a "flicker", if it's noticable after implementation of attacks I may change how I handle this.

            We could change how we do the html here and have the "image" code somewhere else and then just .prepend updateUI() onto each row which may be a better way to do this anyway. We'll see.
        */
        $('#shapeHeader').html("<h2 style='text-align:center'>Barb Shaper</h2>\
            <table class='vis' style='width: 100%'><tbody>\
            <tr><th style='text-align:center !important'>Cord</th>\
            <th style='text-align:center !important'>Village Name</th>\
            <th style='text-align:center !important'>Travel Time (h:m)</th>\
            <th style='text-align:center !important'>Points</th>\
            <tr><td align='center' class='lit-item'>" + barbTarget.x + "|" + barbTarget.y + "</td>\
            <td align='center' class='lit-item'>" + barbTarget.name + "</td>\
            <td align='center' class='lit-item'>" + barbTarget.travel + "</td>\
            <td align='center' class='lit-item'>" + barbTarget.points + "</td>\
            </tbody></table><hr>");

        $('#shapeBody').html("<table class='vis' style='width: 100%'><tbody>\
            <tr><th style='text-align:center !important'>Building</th>\
            <th style='text-align:center !important'>Current Level</th>\
            <th style='text-align:center !important'>Target</th>\
            <th style='text-align:center !important'>Shaped</th>\
            <th style='text-align:center !important'>Button</th>\
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
            </tbody></table><br><br>testing..");

        $("#shapeHeader").css({"background-color": "#c1a264","padding-top":"25px"});
        $('#shapeHeader > table > tbody > tr > th, #shapeBody > table > tbody > tr > th').css("font-size", "14px");
        $("#shapeBody").css({ "background-color": "#f4e4bc"}); 
        $('#shapeBody > table, #shapeBody > table > tbody > tr > th, #shapeBody > table > tbody > tr > td').css({"border": "1px solid #bfa473","border-collapse":"collapse"}); 
        $("#shapeBody").tooltip({show: null,position: {my: "left top",at: "left bottom"},open: function(event, ui) {ui.tooltip.animate({ top: ui.tooltip.position().top +10 }, "fast" );}});
        $('button[name="catButton"]').click(function(){sendCats = catTable[currentLevel[this.value]];
            /* following code is for our "success" click event later on. */
            currentLevel[this.value] = currentLevel[this.value]-1;
            console.log(currentLevel[this.value]);
            updateContent();
            /* */
        });
    }
updateContent();