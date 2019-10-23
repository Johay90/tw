javascript:
/*
THIS SCRIPT SHOULD BE RUN ON THE achievements ACHIEVEMENTS PAGE
It basically estimated your farmed by the end of the day.
*/
    var amountFarmed = $('#content_value > div:nth-child(4) > div:nth-child(1) > div.award-group-content > div:nth-child(5) > div.award-desc > div > span').text().split('/')[0].replace(/\D/g, '');
    var amountPlundered = $('#content_value > div:nth-child(4) > div:nth-child(1) > div.award-group-content > div:nth-child(7) > div.award-desc > div > span').text().split('/')[0].replace(/\D/g, '');
    var time = $('#serverTime').text();
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    var FarmedPerHour = Math.round(amountFarmed / (hours + minutes / 60));
    var PlundersPerHour = Math.round(amountPlundered / (hours + minutes / 60));
    var EstimatedFarmed = FarmedPerHour * 24;
    var EstimatedPlundered = PlundersPerHour * 24;
    var htmlIns = '<table class="vis" style="width: 100%">\
		<tbody><tr>\
			<th>Farm Stats</th>\
		</tr>\
        <tr>\
            <tr> <td><label> ' + 'Projected Farm </td><td>' + EstimatedFarmed + '</label></td> </tr> \
            <tr> <td><label> ' + "Farmed Per Hour </td><td>" + FarmedPerHour + '</label></td> </tr> \
            <tr> <td><label> ' + "Each Res Per Hour </td><td>" + Math.round(FarmedPerHour / 3) + '</label></td> </tr> \
            <tr><th>Plunder Stats</th></tr> \
            <tr> <td><label> ' + "Plunders Per Hour </td><td>" + PlundersPerHour + '</label></td> </tr> \
            <tr> <td><label> ' + "Projected Plunders </td><td>" + EstimatedPlundered + '</label></td> </tr> \
            <tr> <td><label> ' + "Res Per Plunder </td><td>" + Math.round(EstimatedFarmed/EstimatedPlundered) + '</label></td> </tr> \
        </tr></tbody></table><br /><br />';
    $(htmlIns).insertBefore("#content_value > div:nth-child(4) > div:nth-child(1)");

