javascript:

/* Made by Johay - 04/11/2019
This script should be run on the map page

It will search for bonus village close by (you can choose which to search for). Again, it will only search for bonus villages close'ish to your active village. This script uses the TWMap Object for this.

In scope, this script is fairly small and simple and has the limitation of the distance to active village due to using thw TAMap obj.

*/

if (game_data.screen == "map") {
    var formHTML = '<div id="bonusForm">\
                <h3>Find Bonus Villages</h3>\
                Type:\
                <select>\
                </select>\
                <button class="btn" type="button" onclick=submit()>Submit</button>\
                <p>* This will only show near to your selected villa (Tech note: I am not sure what the max distance is, check TWMap obj for more information on that if you wish.)</p>\
                </div>';

var outputHtml = '<div id="bonusFinder">\
                    <table class="vis overview_table">\
                        <tbody>\
                            <tr>\
                                <th>Village Name</th>\
                                <th>Points</th>\
                                <th>Type</th>\
                            </tr><tr></tr>\
                            </tbody></table>\
                </div>';

$('#bonusForm, #bonusFinder').remove(); // We could just add some proper checks, but we're lazy.
$(formHTML).insertBefore('#content_value > h2');
$('#bonusForm > p').css({"font-size": "10px", "font-style": "italic"});

for (let index = 1; index <= Object.keys(TWMap.bonus_data).length; index++) {
    $('#bonusForm > select').append('<option value="' + TWMap.bonus_data[index].text  + '">' + TWMap.bonus_data[index].text  + '</option>');
}

function submit(){
    $('#bonusFinder').remove();
    $(outputHtml).insertBefore('#content_value > h2');
     var whichBonus = $('#bonusForm > select').val();
     for (let index = 0; index < Object.keys(TWMap.villages).length; index++) {
        if (TWMap.villages[Object.keys(TWMap.villages)[index]].owner == "0") {
            if (null != TWMap.villages[Object.keys(TWMap.villages)[index]].bonus) {
                if (whichBonus == TWMap.villages[Object.keys(TWMap.villages)[index]].bonus[0]) { // We could do bonus.id, but this is fine.
                    $('#bonusFinder > table').append('<tr>\
                    <td>\
                    <a href="/game.php?village=' + TWMap.currentVillage + ' &screen=info_village&id='+TWMap.villages[Object.keys(TWMap.villages)[index]].id+'">'+TWMap.villages[Object.keys(TWMap.villages)[index]].name+'</a></td>\
                    <td>'+ TWMap.villages[Object.keys(TWMap.villages)[index]].points + '</td>\
                    <td>'+ TWMap.villages[Object.keys(TWMap.villages)[index]].bonus[0] + '</td>\
                    </tr>');
                }
            }
        }
    }
}
}