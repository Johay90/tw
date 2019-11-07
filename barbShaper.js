/*

Next TODOs
- Notebook
- Add a h3 or something for mass scouting to show we're in progress.

To gather reports run on the report page (where it shows you a list of reports). The script will mass gather these reports. I would advise running on the LA report page, so you don't gather "player" reports.

The UI and idea is completetly ripped from https://puu.sh/Dis7z.mp4 (https://i.gyazo.com/1847222f0bed892b6a97c950e8530052.png). My implementation is much much more simpler (read: worse). I just really loved this idea, and it makes shaping so much easier.

*/

function addGoogleFont(FontName) {
    $("head").append("<link href='https://fonts.googleapis.com/css?family='Spectral' rel='stylesheet' type='text/css'>");
    $("head").append("<link href='https://fonts.googleapis.com/css?family='Ubuntu' rel='stylesheet' type='text/css'>");
    $("head").append("<link href='https://fonts.googleapis.com/css?family='Open+Sans' rel='stylesheet' type='text/css'>");
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

var storageName = "johays_Shaper";
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

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
THE INTERFACE [MAP]
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
if (game_data['screen'] == "map") {

    function execute() {

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


        if ((localStorage.getItem(storageName) == null) || ($.parseJSON(localStorage.getItem(storageName)).length < 1)) {
            alert("Could not find any scout reports.");
        } else {
            var villages = $.parseJSON(localStorage.getItem(storageName));
            var main = "636|464".split("|"); // TODO: need to add curr village
            var min = Infinity;
            var closestIndex;
            var timeFrame = 72;
            var g = 0;

            for (let index = 0; index < Object.keys(villages).length; index++) {
                var dateOne = villages[index].report_date;
                var dateTwo = dateTime;
                var dateOneObj = new Date(dateOne);
                var dateTwoObj = new Date(dateTwo);
                var hours = Math.round(Math.abs(dateTwoObj - dateOneObj) / 36e5);
                if (hours < timeFrame) {
                    g++;

                    var split = villages[Object.keys(villages)[index]].cords.split("|");

                    var fieds = [];
                    for (let index = 0; index <= 1; index++) {
                        fieds.push(Math.abs(parseInt(main[index])) - Math.abs(parseInt(split[index])));
                    }

                    q = Math.sqrt(Math.pow(fieds[0], 2) + Math.pow(fieds[1], 2));
                    if (q < min) {
                        min = q;
                        closestIndex = index;
                    }
                }
            }

            if (g == 0) {
                alert("No reports found within the timeframe. Please grab recent reports.");
                throw new Error("No reports to shape from recent reports");
            }

            function buildCheck(name) { // This was a silly/bad way to do this, but meh. 
                if (Number.isNaN(parseInt(villages[closestIndex][name]))) {
                    return 0;
                } else {
                    return parseInt(villages[closestIndex][name]);
                }
            }

            var currentLevel = {
                main: parseInt(buildCheck("main")),
                barracks: parseInt(buildCheck("barracks")),
                stable: parseInt(buildCheck("stable")),
                garage: parseInt(buildCheck("garage")),
                snob: parseInt(buildCheck("snob")),
                smith: parseInt(buildCheck("smith")),
                place: parseInt(buildCheck("place")),
                market: parseInt(buildCheck("market")),
                wood: parseInt(buildCheck("wood")),
                stone: parseInt(buildCheck("stone")),
                iron: parseInt(buildCheck("iron")),
                farm: parseInt(buildCheck("farm")),
                hide: parseInt(buildCheck("hide")),
                storage: parseInt(buildCheck("storage")),
            };

            var target = villages[closestIndex].cords.split("|");
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
                        barbTarget.owner = TWMap.villages[Object.keys(TWMap.villages)[index]].owner
                        break;
                    }
                }

                if (barbTarget.owner != "0") {
                    alert("This village is a plyer owned village, just so you're aware.");
                }

                catTravelTime = 30;
                var hours = (min * 30 / 60);
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

                if (!$('#shapeGUI').length) {
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
                }

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
                    </tbody></table><hr>\
                    <center>\
                    <button class='attack btn btn-attack btn-target-action' type='button' id='notepadButton'>Notebook!</button>\
                    <button class='btn btn-build current-quest' type='button' id='villageShaped'>Village Shaped?</button>\
                    </center><hr>");

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
                                        } else if ($('#ds_body > div.autoHideBox.error').text() == "Not enough units available") {
                                            clearInterval(dialog2);
                                            $('#popup_box_popup_command > div > a')[0].click();
                                        } else if ($('#place_confirm_catapult_target').length) {
                                            clearInterval(dialog2);
                                            $('#place_confirm_catapult_target > table > tbody > tr > td:nth-child(2) > select').val(x);

                                            $('#troop_confirm_go').click(function () {
                                                currentLevel[x] = currentLevel[x] - 1;
                                                villages[closestIndex].x = currentLevel[x];
                                                localStorage.setItem(storageName, JSON.stringify(villages));
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
                    $("#villageShaped").click(function () {
                        villages.splice(closestIndex, 1);
                        localStorage.setItem(storageName, JSON.stringify(villages));
                        execute();
                    })
                }
                updateContent();

            }, 300);
        }
    }
    execute();
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
MASS-SCOUTING (This section will be used, ie 'normal scouting' will be removed)
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

if (game_data['screen'] == "report") {
    var villages = [];

    if (localStorage.getItem(storageName) != null) {
        localStorage.setItem(storageName, JSON.stringify(villages))
    } else {
        villages = $.parseJSON(localStorage.getItem(storageName));
    }


    var total = $('#report_list > tbody > tr').length;
    var index = 0;
    var i = 0;
    var retries = 0;

    function nextImg() {
        i++;
        scoutLoop();
    }

    function scoutLoop() {
        if (total >= index) {
            if (i <= 5) {
                if ($('#report_list > tbody > tr:nth-child(' + index + ') > td:nth-child(2) > div > img:nth-child(' + i + ')').length) {
                    if ($('#report_list > tbody > tr:nth-child(' + index + ') > td:nth-child(2) > div > img:nth-child(' + i + ')').attr("src").indexOf("spy") != -1) {
                        $.ajax({
                            url: $('#report_list > tbody > tr:nth-child(' + index + ') > td:nth-child(2) > span.quickedit.report-title > span > a.report-link').attr("href"),
                            success: function (data) {
                                if ($(data).find('#attack_spy_buildings_left').length) {
                                    var json = JSON.parse($(data).find('#attack_spy_building_data').val());
                                    for (var i = 0; i < json.length; i++) {
                                        var obj = json[i];
                                        var arrIndex = villages.findIndex(villages => villages.cords === $(data).find('#attack_info_def > tbody > tr:nth-child(2) > td:nth-child(2) > span > a:nth-child(1)').text().split(/\(([^)]+)\)/)[1])

                                        if (arrIndex != -1) {
                                            villages[arrIndex][obj.id] = obj.level;
                                            villages[arrIndex]['report_date'] = dateTime;
                                        } else {
                                            villages.push({
                                                'cords': $(data).find('#attack_info_def > tbody > tr:nth-child(2) > td:nth-child(2) > span > a:nth-child(1)').text().split(/\(([^)]+)\)/)[1],
                                                [obj.id]: obj.level,
                                            }, );
                                        }
                                    }
                                } else {
                                    retries++
                                    if (retries >= 5) {
                                        alert("Lots of errors. Make sure you're on LA page, with scout reports. Also refresh the page for new reports.");
                                    }
                                    scoutLoop();
                                }
                                index++;
                                i = 0;
                                scoutLoop();
                            }

                        });
                    } else {
                        nextImg();
                    }
                } else {
                    nextImg();
                }
            } else if (i > 5) {
                i = 0;
                index++;
                scoutLoop();
            }
        } else {
            localStorage.setItem(storageName, JSON.stringify(villages))
        }
    }
    scoutLoop();
}