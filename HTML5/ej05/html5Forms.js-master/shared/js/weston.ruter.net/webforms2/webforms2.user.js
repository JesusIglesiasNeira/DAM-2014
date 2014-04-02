// ==UserScript==
// @name           Web Forms 2.0 Support
// @description    Activates Web Forms 2.0 support on every webpage.
// @namespace      http://code.google.com/p/webforms2/

// ==/UserScript==

//Sites to test on:
// http://tc.labs.opera.com/html/
// http://lachy.id.au/dev/markup/tests/html5/
// http://simon.html5.org/test/
// http://hasather.net/test/html/
// http://html5lib.googlecode.com/svn/trunk/
// http://www.hixie.ch/tests/adhoc/
// http://webforms2.testsuite.org/

(function(){
var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', "http://webforms2.googlecode.com/svn/trunk/webforms2-p.js");

var parent = document.getElementsByTagName('head')[0];
if(!parent)
	parent = document.getElementsByTagName('*')[0];
parent.insertBefore(script, parent.firstChild);//document.getElementsByTagName('head')[0].appendChild(script);

})();