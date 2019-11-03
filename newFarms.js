javascript:
/*
- Paste "barb cords" into listOfCords
- Only attacks (pref small, want to target farming only)
- Make sure all are showing (change reports per page).

Script will basically give you a list of cords you need to attack (not found in reports). Good to keep on top of farms early on (<1k farms)

*/

var listOfCords = "612|467 613|467 615|476 611|461 613|473 613|461 617|478 616|480 614|465 615|468 611|457 614|473 611|460 613|462 613|456 620|483 619|476 612|461 613|455 618|479 620|480 612|465 622|482 614|464 621|473 618|477 613|459 618|476 614|455 617|462 620|475 621|477 612|457 621|464 616|461 622|468 624|479 620|470 616|454 625|484 621|480 625|487 626|483 621|472 615|457 623|467 619|455 615|451 622|459 623|479 626|477 624|474 623|476 625|480 622|462 623|462 619|451 626|484 622|457 629|484 619|458 617|452 622|469 617|456 625|482 626|476 629|475 621|462 624|463 627|485 623|468 629|480 628|479 628|470 624|467 630|474 628|476 629|487 628|485 620|456 625|461 629|470 631|472 624|470 630|484 629|466 632|475 628|477 619|447 627|475 628|488 628|480 628|483 626|478 634|487 629|471 631|478 624|450 625|459 623|444 633|486 628|468 629|457 623|448 625|450 619|446 634|473 631|485 631|471 629|474 630|461 626|454 630|458 629|452 622|449 630|466 625|446 636|479 632|474 631|463 633|485 638|486 625|455 630|468 632|455 636|483 633|464 631|458 634|460 631|453 631|459 640|482 639|468 637|466 639|481 644|488 635|453 627|443 637|455 635|446 642|481 642|486 630|442 635|458 639|460 634|445 629|439 636|446 644|470 633|446 640|479 640|457 632|447 633|447 648|472 634|439 642|449 639|450 638|450 640|450";

listOfCords = listOfCords.split(" ");
var reportArr = [];
var textArea;

for (let index = 0; index < $('#report_list > tbody > tr').length; index++) {
    var report = $.trim($('#report_list > tbody > tr:nth-child(' + index + ') > td:nth-child(2) > span.quickedit.report-title > span > a.report-link > span').text())
    report = report.split(/\(([^)]+)\)/)[3];
    reportArr.push(report);
}

var newFarms = listOfCords.filter(function(obj) { 
    return reportArr.indexOf(obj) == -1; 
});

for (let index = 0; index < newFarms.length; index++) {
    if (index > 0) {
        textArea += newFarms[index] + " ";
    } else{
        textArea = newFarms[index] + " ";
    }
}
$("<textarea rows='6' cols='100'>" + textArea + "</textarea>" ).insertBefore( "#content_value > h2");
