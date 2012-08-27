// ==UserScript==
// @name       Coso script
// @namespace  http://coso.herokuapp.com
// @version    0.1
// @description  For use with Coso videochat and browser sharing service
// @match      http://*/*
// @exclude    http://coso.herokuapp.com/*
// ==/UserScript==

d = document.createElement("script");
d.src = "http://coso.herokuapp.com/static/client.js";
d.type = "text/javascript";
document.body.appendChild(d);