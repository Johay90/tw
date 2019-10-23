javascript:

/* TW Script

Basically I use a lot of "Farm Scripts" which means I have a few cookies around and I want to track what cord they're at.

Currently pretty manual searching for the cookie as I'm not only low points so don't need ot many scripts. I may expand this further if I see fit/needed

*/

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  alert(getCookie("farm"));
