// ==UserScript==
// @name         TW Stats
// @namespace    http://tampermonkey.net/
// @version      1
// @description  try to take over the world!
// @author       You
// @match        https://www.twstats.com/en***/index.php?page=player***
// @grant        none
// ==/UserScript==

/*
Just a quick script for TW Stats. It adds en100+ worlds.

We don't automate worlds, just change "worldCount". It's possible to automate worlds but it's not a super quick thing; lots of things to consider one being if we do it via AJAX we're gonna have lots of waiting around.

*/

// TODO Automate this a bit, use get to see if player played that world?

var worldCount = 110;
var currentURL = window.location.href 
var id = currentURL.substring(currentURL.indexOf('id=') + 3).replace(/\D/g,'');

for (let i = 100; i <= worldCount; i++) {
    if (typeof span == 'undefined'){ // can't create span in above scope else it ruins the html.
        var span = '<span class="world" style="padding-right: 6px"><a href="/en'+i+'/index.php?page=player&amp;id='+id+'">EN'+i+'</a></span>'
    }else{
        span += '<span class="world" style="padding-right: 6px"><a href="/en'+i+'/index.php?page=player&amp;id='+id+'">EN'+i+'</a></span>'
    }
}

$("<tr></tr>").attr('id', 'newBox').insertAfter('#main > div.widget > div > div > div:nth-child(2) > div > table > tbody > tr:nth-child(11)');
$("#newBox").html('<th class="left">Post 100 Worlds:</th><td>'+span+'</td>');