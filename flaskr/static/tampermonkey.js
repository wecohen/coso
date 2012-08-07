// Script to install in TamperMonkey for Chrome to inject client.js
// onto all pages visited so browser sharing works for sites outside
// our domain.

d = document.createElement("script");
d.src = "http://localhost:5000/static/client.js";
d.type = "text/javascript";
document.body.appendChild(d);

// Be sure to add this to script settings -- User Excludes so it applies 
// only to pages visited outside our domain (in the iframe) and doesn't 
// load for our actual page.

http://localhost:5000/*