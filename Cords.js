javascript:
/*
Quick script made my johay.

Basically gets cords of selected group. Only gets cords visible on page.

Working as of 27/06. If it breaks look into the tbale name and change the .each selecter accordingly.

*/

if ($('#overview_menu').length == 1) {
  function GUI(){
    $("<div></div>").attr('id', 'scriptBody').insertBefore('#contentContainer');
    $("#scriptBody").html("\
          <textarea rows='4' cols='50' id='tArea'></textarea>\
    ");
  }

  GUI();

  $("#production_table > tbody > tr").each(function (index) {
    if (index === 0) { return true; }
          var this_row = $(this);
          text = $.trim(this_row.find('td:eq(1)').text());
          text = text.substring(text.indexOf('(') + 1, text.indexOf(')'));
          $('#tArea').append(text + " ");
      });
} else {
  alert("Run on Village Overview and have a prm acocunt.");
}
