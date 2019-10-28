/* -- THIS SCRIPT IS HEAVY WIP, NOT EVEN NEARLY WORKING

PROGRESS
- Finished Interface


TODO
- UI FUNCTIONABLE (Inclu functioning cat table etc, village cords, etc)
- Units input, cord input etc, click event etc. 
- Scout section (import village/buildings level into our arrays/cookies etc)
- Notebook/paste comment button

RESOURCES
cat table: https://help.tribalwars.net/wiki/Charts

COMMENT
The UI and idea is completetly ripped from https://puu.sh/Dis7z.mp4 (https://i.gyazo.com/1847222f0bed892b6a97c950e8530052.png) which I found on the forum. I loved the idea behind this. I'm aware this idea was never TW approved, but fuck it. It's not breaking any rules; the idea is really cool. 
*/

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
Font Import(s)
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function addGoogleFont(FontName) {
    $("head").append("<link href='https://fonts.googleapis.com/css?family=" + FontName + "' rel='stylesheet' type='text/css'>");
}
addGoogleFont("Ubuntu"); 

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
            <tr><td align='center' class='lit-item'><img src='https://i.imgur.com/K2hWz63.png'></td>\
            <td align='center' class='lit-item'>20</td>\
            <td align='center' class='lit-item'>1</td>\
            <td align='center' class='lit-item'><img width='20px' src='https://i.imgur.com/5pTo4s9.png'></td>\
            <td align='center' class='lit-item'>test3</td>\
            \
            <tr><td align='center' class='lit-item'><img src='https://i.imgur.com/K2hWz63.png'></td>\
            <td align='center' class='lit-item'>20</td>\
            <td align='center' class='lit-item'>1</td>\
            <td align='center' class='lit-item'><img width='20px' src='https://i.imgur.com/e09IQ4s.png'></td>\
            <td align='center' class='lit-item'>test3</td>\
            \
            \
            <tr><td align='center' class='lit-item'><img src='https://i.imgur.com/K2hWz63.png'></td>\
            <td align='center' class='lit-item'>20</td>\
            <td align='center' class='lit-item'>1</td>\
            <td align='center' class='lit-item'><img width='20px' src='https://i.imgur.com/e09IQ4s.png'></td>\
            <td align='center' class='lit-item'>test3</td>\
            \
            <tr><td align='center' class='lit-item'><img src='https://i.imgur.com/K2hWz63.png'></td>\
            <td align='center' class='lit-item'>20</td>\
            <td align='center' class='lit-item'>1</td>\
            <td align='center' class='lit-item'><img width='20px' src='https://i.imgur.com/e09IQ4s.png'></td>\
            <td align='center' class='lit-item'>test3</td>\
            \
            <tr><td align='center' class='lit-item'><img src='https://i.imgur.com/K2hWz63.png'></td>\
            <td align='center' class='lit-item'>20</td>\
            <td align='center' class='lit-item'>1</td>\
            <td align='center' class='lit-item'><img width='20px' src='https://i.imgur.com/e09IQ4s.png'></td>\
            <td align='center' class='lit-item'>test3</td>\
            \
            <tr><td align='center' class='lit-item'><img src='https://i.imgur.com/K2hWz63.png'></td>\
            <td align='center' class='lit-item'>20</td>\
            <td align='center' class='lit-item'>1</td>\
            <td align='center' class='lit-item'><img width='20px' src='https://i.imgur.com/e09IQ4s.png'></td>\
            <td align='center' class='lit-item'>test3</td>\
            \
            <tr><td align='center' class='lit-item'><img src='https://i.imgur.com/K2hWz63.png'></td>\
            <td align='center' class='lit-item'>20</td>\
            <td align='center' class='lit-item'>1</td>\
            <td align='center' class='lit-item'><img width='20px' src='https://i.imgur.com/e09IQ4s.png'></td>\
            <td align='center' class='lit-item'>test3</td>\
            \
            <tr><td align='center' class='lit-item'><img src='https://i.imgur.com/K2hWz63.png'></td>\
            <td align='center' class='lit-item'>20</td>\
            <td align='center' class='lit-item'>1</td>\
            <td align='center' class='lit-item'><img width='20px' src='https://i.imgur.com/e09IQ4s.png'></td>\
            <td align='center' class='lit-item'>test3</td>\
            </tbody></table><br><br>testing..</div>\
        ");
        $("#shapeHeader").css({
            "background-color": "#c1a264",
            "padding-top":"25px"
            });
        $("#shapeBody").css({
             "background-color": "#f4e4bc"
         }); 
        $('#shapeHeader > table, #shapeBody > table').css({
           // "border": "1px solid #bfa473"
        }); 
        $('#shapeBody > table, #shapeBody > table > tbody > tr > th, #shapeBody > table > tbody > tr > td').css({
           "border": "1px solid #bfa473",
            "border-collapse": "collapse"
        }); 
