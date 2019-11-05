/* -- It works now, still want to add quite a bit more. Let me know re: bugs

Next TODOs
- Notebook
- Multiple villas
- Select closest from a report in the past 24hr that NEEDs shaping. 

So I think I want to do multiple villages... 

the ideal apporach

var villages = [
  {
    cords: "123|456",
    report_date: "date",
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
  },
  {
    cords: "555|555",
    report_date: "date",
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
  }
];
// make sure to make long term cookie...
// store object in a cookie, if cookie doens't exist (TODO: add check for exist)
$.cookie("multipleVillages_test", JSON.stringify(villages));

// get obj from cookie
var villages = $.parseJSON($.cookie("multipleVillages_test"));

//add to array
villages.push(
    { 'cords' : 'xxx|xxx', 'report_date' : "date" } // and the rest
);

// we can off course once we get the obj from cookie delete rows.

// push new data
$.cookie("multipleVillages_test", JSON.stringify(villages));



COMMENT
1) The UI and idea is completetly ripped from https://puu.sh/Dis7z.mp4 (https://i.gyazo.com/1847222f0bed892b6a97c950e8530052.png). My implementation is much much more simpler (read: worse).

2) Way I coded the function reloadUI is horriiiible, by the time I finished it i'm just to lazy to implement another apporach, but it's bad.

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
Font Import(s) 
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function addGoogleFont(FontName) {
    $("head").append("<link href='https://fonts.googleapis.com/css?family='Spectral' rel='stylesheet' type='text/css'>");
    $("head").append("<link href='https://fonts.googleapis.com/css?family='Ubuntu' rel='stylesheet' type='text/css'>");
    $("head").append("<link href='https://fonts.googleapis.com/css?family='Open+Sans' rel='stylesheet' type='text/css'>");
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
VARS, ARRAYS, OBJECTS, FUNCTIONS
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function buildCheck(name) { // This was a silly/bad way to do this, but meh. 
    if (Number.isNaN(parseInt(getCookie(name)))) {
        return 0;
    } else {
        return parseInt(getCookie(name));
    }
}

var x;
var sendCats;
var catTable = [0, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 6, 7, 8, 8, 9, 10, 10, 11, 12, 13, 15, 16, 17, 19, 20];

var desiredLevel = {
    main: 1,
    barracks: 0,
    stable: 0,
    garage: 0,
    snob: 0,
    smith: 0,
    place: 0,
    market: 0,
    wood: 30,
    stone: 30,
    iron: 30,
    farm: 1,
    hide: 10,
    storage: 30
};

var currentLevel = {
    main: parseInt(buildCheck("barbShaper_main")),
    barracks: parseInt(buildCheck("barbShaper_barracks")),
    stable: parseInt(buildCheck("barbShaper_stable")),
    garage: parseInt(buildCheck("barbShaper_garage")), // CONFIRM THIS??
    snob: parseInt(buildCheck("barbShaper_snob")), // CONFIRM THIS??
    smith: parseInt(buildCheck("barbShaper_smith")),
    place: parseInt(buildCheck("barbShaper_place")),
    market: parseInt(buildCheck("barbShaper_market")),
    wood: parseInt(buildCheck("barbShaper_wood")),
    stone: parseInt(buildCheck("barbShaper_stone")),
    iron: parseInt(buildCheck("barbShaper_iron")),
    farm: parseInt(buildCheck("barbShaper_farm")),
    hide: parseInt(buildCheck("barbShaper_hide")),
    storage: parseInt(buildCheck("barbShaper_storage"))
};

function updateUI(buildName) {
    var html = "<td align='center' class='lit-item'>" + currentLevel[buildName] + "</td><td align='center' class='lit-item'>" + desiredLevel[buildName];
    var button = "<td align='center' class='lit-item'><button class='attack btn btn-attack btn-target-action' type='button' value=" + buildName + " name='catButton'>Send Attack!</button></td>";

    if (buildName == "hide") {
        return html + "</td><td align='center' class='lit-item'><img width='15px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/tick.png'></td><td align='center' class='lit-item'></td>";
    } else if (['storage', 'iron', 'stone', 'wood'].indexOf(buildName) >= 0) {

        if (parseInt(currentLevel[buildName]) == parseInt(desiredLevel[buildName])) {
            return html + "</td><td align='center' class='lit-item'><img width='15px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/tick.png'></td><td align='center' class='lit-item'></td>";
        } else {
            return html + "</td><td align='center' class='lit-item'><img width='15px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/x.png'></td><td align='center' class='lit-item'></td>";
        }
    } else if (parseInt(currentLevel[buildName]) != parseInt(desiredLevel[buildName])) {
        return html + "</td><td align='center' class='lit-item'><img width='15px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/x.png'></td>" + button;
    } else {
        return html + "</td><td align='center' class='lit-item'><img width='15px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/tick.png'></td><td align='center' class='lit-item'></td>";
    }
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
THE INTERFACE [MAP]
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
if (game_data['screen'] == "map") {

    if (typeof getCookie("barbShaper_cord") !== 'undefined') {
        var main = "636|464".split("|"); // TODO: need to add curr village
        var target = getCookie("barbShaper_cord").split("|");
        var barbTarget = new Object();
        barbTarget.x = target[0];
        barbTarget.y = target[1];

        $('#mapx').val(barbTarget.x);
        $('#mapy').val(barbTarget.y);
        $('#map_topo > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input')[0].click();

        setTimeout(function () {
            for (let index = 0; index < Object.keys(TWMap.villages).length; index++) {
                if (parseInt(barbTarget.x + barbTarget.y) == TWMap.villages[Object.keys(TWMap.villages)[index]].xy) {
                    barbTarget.name = TWMap.villages[Object.keys(TWMap.villages)[index]].name;
                    barbTarget.points = TWMap.villages[Object.keys(TWMap.villages)[index]].points;
                    barbTarget.id = TWMap.villages[Object.keys(TWMap.villages)[index]].id
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
            if (rhours < 10) {
                rhours = "0" + rhours
            }
            if (rminutes < 10) {
                rminutes = "0" + rminutes
            }
            barbTarget.travel = rhours + ":" + rminutes;


            $("<div></div>").attr('id', 'shapeGUI').insertAfter('body');
            $("#shapeGUI").css({
                "width": "400px",
                "border": "1px solid #a48341",
                "margin": "0",
                "position": "fixed",
                "top": "50px",
                "font-family": "'Open Sans', sans-serif",
                "right": "0",
                "height": "auto",
                "z-index": "21",
                "background-color": "#f4e4bc"
            });
            $("#shapeGUI").draggable();
            $('#shapeGUI').append("<div id='shapeHeader'></div>");
            $('#shapeGUI').append("<div id='shapeBody'></div>");

            function updateContent() {
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
                    <tr title='Headquarters'><td align='center' class='lit-item'><img width='30px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/hq.png'></td> " + updateUI('main') + "\
                    <tr title='Barracks'><td align='center' class='lit-item'><img width='30px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/rax.png'></td> " + updateUI('barracks') + "\
                    <tr title='Stable'><td align='center' class='lit-item'><img width='30px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/stable.png'></td> " + updateUI('stable') + "\
                    <tr title='Workshop'><td align='center' class='lit-item'><img width='30px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/workshop.png'></td> " + updateUI('garage') + "\
                    <tr title='Academy'><td align='center' class='lit-item'><img width='30px' src=''></td> " + updateUI('snob') + "\
                    <tr title='Smithy'><td align='center' class='lit-item'><img width='30px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/smith.png'></td> " + updateUI('smith') + "\
                    <tr title='Rally Point'><td align='center' class='lit-item'><img width='30px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/rally.png'></td> " + updateUI('place') + "\
                    <tr title='Market'><td align='center' class='lit-item'><img width='30px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/market.png'></td> " + updateUI('market') + "\
                    <tr title='Timber'><td align='center' class='lit-item'><img width='30px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/wood.png'></td> " + updateUI('wood') + "\
                    <tr title='Clay'><td align='center' class='lit-item'><img width='30px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/stone.png'></td> " + updateUI('stone') + "\
                    <tr title='Iron'><td align='center' class='lit-item'><img width='30px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/iron.png'></td> " + updateUI('iron') + "\
                    <tr title='Farm'><td align='center' class='lit-item'><img width='30px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/farm.png'></td> " + updateUI('farm') + "\
                    <tr title='Warehouse'><td align='center' class='lit-item'><img width='30px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/storage.png'></td> " + updateUI('storage') + "\
                    <tr title='Hiding Place'><td align='center' class='lit-item'><img width='30px' src='https://raw.githubusercontent.com/Johay90/tw/master/res/hide.png'></td> " + updateUI('hide') + "\
                    </tbody></table>");

                $("#shapeHeader").css({
                    "background-color": "#c1a264",
                    "padding-top": "25px"
                });
                $('#shapeHeader > table > tbody > tr > th, #shapeBody > table > tbody > tr > th').css({
                    "font-size": "14px",
                    "font-family": "'Open Sans', sans-serif",
                    "font-weight": "Bold"
                });
                $('#shapeHeader > table > tbody > tr > td, #shapeBody > table > tbody > tr > td').css({
                    "font-size": "12px",
                    "font-family": "'Open Sans', sans-serif",
                    "padding": "5px 0px 5px 0px"
                });
                $("#shapeBody").css({
                    "background-color": "#f4e4bc"
                });
                $('#shapeBody > table, #shapeBody > table > tbody > tr > th, #shapeBody > table > tbody > tr > td').css({
                    "border": "1px solid #bfa473",
                    "border-collapse": "collapse"
                });
                $("#shapeBody").tooltip({
                    show: null,
                    position: {
                        my: "left top",
                        at: "left bottom"
                    },
                    open: function (event, ui) {
                        ui.tooltip.animate({
                            top: ui.tooltip.position().top + 10
                        }, "fast");
                    }
                });
                $('button[name="catButton"]').click(function () {
                    sendCats = catTable[currentLevel[this.value]];
                    x = this.value;
                    var dialog = setInterval(function () {
                        if ($('#popup_box_popup_command').length) {
                            $('#unit_input_catapult').val(sendCats);
                            clearInterval(dialog);

                            $('#target_attack').click(function () {
                                var dialog2 = setInterval(function () {
                                    if ($('#ds_body > div.autoHideBox.error').text() == "No units selected") {
                                        clearInterval(dialog2);
                                        console.log("No cats selected. This should not happen, please report.");
                                    } else if ($('#ds_body > div.autoHideBox.error').text() == "Not enough units available") {
                                        clearInterval(dialog2);
                                        console.log("Not enough cats, closing attack dialog.");
                                        $('#popup_box_popup_command > div > a')[0].click();
                                    } else if ($('#place_confirm_catapult_target').length) {
                                        clearInterval(dialog2);
                                        $('#place_confirm_catapult_target > table > tbody > tr > td:nth-child(2) > select').val(x);

                                        $('#troop_confirm_go').click(function () {
                                            currentLevel[x] = currentLevel[x] - 1;
                                            $.cookie("barbShaper_" + x, currentLevel[x]);
                                            updateContent();
                                        });

                                    }
                                }, 100);


                            });
                        }
                    }, 100);
                    CommandPopup.openRallyPoint({
                        target: barbTarget.id
                    });
                });
            }
            updateContent();

        }, 300);
    } else {
        alert("No scout report found");
    }
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
SCOUTING
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
if (game_data['screen'] == "report") {
    var delete_cookie = function (name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    if ($('#attack_spy_buildings_left').length) {
        var json = JSON.parse($('#attack_spy_building_data').val());
        var arrBuildName = ["main", "cord", "barracks", "stable", "snob", "garage", "smith", "place", "market", "wood", "stone", "iron", "farm", "hide", "storage"];
        for (let index = 0; index <= arrBuildName.length; index++) {
            delete_cookie('barbShaper_' + arrBuildName[index]);
        }
        for (var i = 0; i < json.length; i++) {
            var obj = json[i];
            document.cookie = "barbShaper_" + obj.id + "=" + obj.level;
        }
        document.cookie = "barbShaper_cord=" + $('#attack_info_def > tbody > tr:nth-child(2) > td:nth-child(2) > span > a:nth-child(1)').text().split(/\(([^)]+)\)/)[1];
    } else {
        alert("Scout report not found. ");
    }
}