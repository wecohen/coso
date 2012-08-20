// ==UserScript==
// @name           COSO browser sharing enabler
// @description    For use with Coso live videochat and browser sharing tool, enables you to collaboratively browser share with friends
// @author         Ashley Lorden and Whitaker Cohen
// @exclude        http://localhost:5000/*
// @include        *
// @version        1.0
// ==/UserScript==

d = document.createElement("script");
d.src = "http://localhost:5000/static/client.js";
d.type = "text/javascript";
document.body.appendChild(d);
