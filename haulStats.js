javascript:

//could use inbuilt tw obj for this, but meh. Already have this
var url_string = window.location.href; 
var url = new URL(url_string);
var mode = url.searchParams.get("mode");
var type = url.searchParams.get("type")
if (mode == "commands" && type == "return"){


    var totalWood = 0;
    var totalClay = 0;
    var totalIron = 0;
    var rows = $('#commands_table tr').length + 1;
    $(function(){ 
        var i = 2;
        $("<div></div>").attr('id', 'waitDiv').insertBefore('#commands_table');
        $("#waitDiv").html('<h2></h2>');
        var eleExists = setInterval(function() {
            $("#waitDiv > h2").text(((100 * i) / rows).toFixed(3)+'%');
        }, 15);
        function nextCall() {
            var reportString = "https://en110.tribalwars.net" + $('#commands_table > tbody > tr:nth-child(' + i +  ') > td:nth-child(1) > span.quickedit > span > a:nth-child(1)').attr("href");
            i++;
            if(i > rows) {
                clearInterval(eleExists);
                $("#waitDiv").remove();
                $("<div></div>").attr('id', 'ResInc').insertBefore('#commands_table');
                $("#ResInc").html('<h2>Incoming Res</h2><table><tbody><tr><th>Wood</th><th>Clay</th><th>Iron</th></tr><tr><td>' + totalWood + '</td><td>' + totalClay + '</td><td>' + totalIron + '</td></tr></tbody></table>');
                return;
            }
                $.ajax({
                    url:reportString,
                    success: function(data){   
                        var haulString = ($(data).find('#content_value > :contains("Haul:")').text().split(" "));
                        var wood = haulString[1];
                        var clay = haulString[3];
                        var iron = haulString[5];
                        if (typeof(wood) == "undefined") wood = 0; else wood = parseInt(wood);
                        if (typeof(clay) == "undefined") clay = 0; else clay = parseInt(clay);
                        if (typeof(iron) == "undefined") iron = 0; else iron = parseInt(iron);
                        totalWood = parseInt(totalWood + wood); 
                        totalClay = parseInt(totalClay + clay); 
                        totalIron = parseInt(totalIron + iron);
                    nextCall();
                    }
                });
        }
        nextCall();
    });
}else{
    alert("Run on Overview -> Commands -> Returns");
}