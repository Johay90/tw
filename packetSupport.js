javascript:
var popsend = 25;
var minPop = 25;
var alertWhenDone = 0;
var nextVillageWhenDone = 0;
var include = {
  spear: 1,
  sword: 1,
  scout: 0,
  heavy: 1,
  cat: 0,
  archer: 1
};

var targets = '636|464';

var doc = (window.frames.length > 0) ? window.main.document : document;

function getTroop(a) {
  return parseInt(doc.units[a].parentNode.getElementsByTagName("a")[1].innerHTML.match(/\d+/), 10);
}
var SP = include.spear ? getTroop("spear") : 0;
var HC = include.heavy ? getTroop("heavy") : 0;
var CAT = include.cat ? getTroop("catapult") : 0;
var Arch = include.archer ? getTroop("archer") : 0;
var SPY = include.scout ? getTroop("spy") : 0;
var SW = include.sword ? getTroop("sword") : 0;
var pop = SP + SW + Arch + 2 * SPY + 8 * CAT + 6 * HC;
if (pop >= minPop) {
  var ratio = popsend / pop;
  ratio = ratio > 1 ? 1 : ratio;
  doc.forms[0].spear.value = Math.round(SP * ratio);
  doc.forms[0].heavy.value = Math.round(HC * ratio);
  doc.forms[0].sword.value = Math.round(SW * ratio);
  doc.forms[0].archer.value = Math.round(Arch * ratio);
  doc.forms[0].catapult.value = Math.round(CAT * ratio);
  doc.forms[0].spy.value = Math.round(SPY * ratio);
  targets = targets.split(" ");
  var index = 0;
  var farmcookie = document.cookie.match("(^|;) ?fluffy_fake=([^;]*)(;|$)");
  if (farmcookie == null) {
    index = Math.floor(Math.random() * (targets.length + 1));
  } else {
    index = parseInt(farmcookie[2]);
  }
  if (index >= targets.length) index = 0;
  var coord = targets[index].split("|");
  index++;
  cookie_date = new Date(2099, 11, 11);
  document.cookie = "fluffy_fake=" + index + "; expires=" + cookie_date.toGMTString();
  doc.forms[0].x.value = coord[0];
  doc.forms[0].y.value = coord[1];
  void(0);
} else {
  if (alertWhenDone) alert('done');
  if (nextVillageWhenDone) {
    var sitter = doc.URL.match(/t=\d+/);
    sitter = sitter ? "&" + sitter : "";
    window.location = "game.php?village=n" + window.game_data.village.id + "&screen=place" + sitter
  }
}

// Not sure who made this. Quite an old script. Just updated troops for en110, I take no credit for script.