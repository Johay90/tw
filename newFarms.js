    javascript:
        /*
        - Paste a list of barb cords into listOfCords
        - Filters: Loot assist > (pref green/yellow)

        Script will basically give you a list of cords you need to attack (not found in reports). 

        Hmm, returns err=>429 if dev tools is not open.... ????
        */

        $("<div id='loading'><h1>Checking for new farms, please wait. This could take a while.</h1></div>").insertBefore("#content_value > h2");

    var listOfCords = "612|473 612|467 613|467 615|476 611|461 613|473 611|459 616|474 613|461 617|478 616|480 617|479 614|465 615|475 615|468 611|457 619|481 614|473 611|460 613|462 613|456 620|483 619|476 612|461 613|455 618|479 619|483 613|468 618|468 620|480 612|465 615|463 622|482 614|464 621|473 618|477 613|459 616|460 622|480 618|476 619|463 624|487 614|455 617|462 622|474 620|475 617|454 621|477 612|457 621|464 618|464 616|468 616|461 622|468 619|477 624|479 620|470 616|454 625|484 615|449 617|451 621|480 625|487 626|483 621|472 622|472 615|454 615|457 623|467 623|474 619|455 615|451 622|459 623|479 626|477 624|474 623|476 625|480 622|462 623|462 619|451 626|484 622|457 619|450 629|484 619|458 617|452 622|469 617|456 625|482 626|476 629|475 621|462 624|463 627|485 623|468 630|489 629|480 628|479 620|450 626|462 628|470 624|467 630|474 628|476 629|487 628|485 620|456 628|469 625|461 629|470 631|472 624|470 630|484 629|466 624|458 632|475 628|477 619|447 627|475 628|488 628|480 628|483 626|478 634|487 629|471 631|478 624|450 625|459 623|444 633|486 632|473 628|468 629|457 623|448 625|450 619|446 634|473 631|485 631|471 629|474 630|461 626|454 630|458 629|452 622|449 630|466 625|446 625|442 629|467 636|479 630|476 632|474 631|463 633|485 638|486 625|455 634|469 635|479 633|462 635|468 635|465 630|450 635|472 630|468 638|487 625|453 630|462 630|449 637|475 633|465 632|455 636|483 633|464 631|458 634|460 631|453 631|459 640|482 639|468 637|466 639|481 644|488 635|453 627|443 637|455 635|446 642|481 642|486 630|442 635|458 639|460 634|445 629|439 636|446 644|470 633|446 640|479 640|457 632|447 633|447 648|472 634|439 642|449 639|450 638|450 640|450 646|468 647|468 650|485 651|477";

    listOfCords = listOfCords.split(" ");
    if (game_data.screen == "report") {
        var reportArr = [];
        var textArea;

        var x = $.when();

        // TMRW note, maybe fuck promises?
        // also get rid of loops, can just do it by var total and call it in success.

        function checkReport(report, reportLink) {
            return $.ajax({
                url: reportLink,
                success: function (data) {
                    var villageURL = ($(data).find('#attack_info_def > tbody > tr:contains("Destination")').find("a:first").attr("href"));
                    $.ajax({
                        url: villageURL,
                        success: function (p) {
                            if (!$(p).find('#content_value > table > tbody > tr:contains("Player:")').length && $(p).find('#content_value > table > tbody > tr > td:contains("Coordinates")').find("td:eq(2)").text()) {
                                $('#loading > h1').text("Checking for new farms, please wait. This could take a while. This is a barb --> " + $(p).find('#content_value > table > tbody > tr > td:contains("Coordinates")').find("td:eq(2)").text());
                                report = report.split(/\(([^)]+)\)/)[3];
                                reportArr.push(report);
                            } else {
                                $('#loading > h1').text("Checking for new farms, please wait. This could take a while. This is not a barb-> " + $(p).find('#content_value > table > tbody > tr > td:contains("Coordinates")').find("td:eq(2)").text());
                            }
                        }
                    });
                },
            });
        }

        var total = $('#report_list > tbody  > tr').length;
        var i = 0;

        $('#report_list > tbody  > tr').each(function (index) {
            var report = $.trim($('#report_list > tbody > tr:nth-child(' + index + ') > td:nth-child(2) > span.quickedit.report-title > span > a.report-link > span').text())
            var reportLink = $('#report_list > tbody > tr:nth-child(' + index + ') > td:nth-child(2) > span.quickedit.report-title > span > a.report-link').attr("href");
            x = x.then(function () {
                    i++;
                    return checkReport(report, reportLink);
            });
        })

        var lazy = setInterval(function() {
            if (total == i) {
                sort();
                clearInterval(lazy);
            }
        }, 100);


        function sort(){
            $('#loading > h1').remove();
            var newFarms = listOfCords.filter(function (obj) {
                return reportArr.indexOf(obj) == -1;
            });
            for (let index = 0; index < newFarms.length; index++) {
                if (index > 0) {
                    textArea += newFarms[index] + " ";
                } else {
                    textArea = newFarms[index] + " ";
                }
            }

            var newFarmCords = textArea.split(" ");

            for (let index = 0; index < newFarmCords.length; index++) {
                console.log(newFarmCords[index]);
            }

            $("<textarea rows='6' cols='100'>" + textArea + "</textarea>").insertBefore("#content_value > h2");
        }

    }