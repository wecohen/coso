 var showInvite = function() {
 	// alert("showinvite");
// 	$("#invite_text").slideToggle(200);
	$("div.all").toggleClass("show_invite");
	return false;
};

var showUnpublish = function() {
	$("#publishLink").hide();
	$("#unpublishLink").show();
	// alert("Screentest.js");
};	

var showPublish = function() {
	$("#unpublishLink").hide();
	$("#publishLink").show();
};

var topThreeLong = function() {
	$("#top.top_showing").slideToggle(200);
	$("#browser.browser_showing").slideToggle(200);
	// $("#top_three_short").hide();
};


var main = function() {
	$("#unpublishLink").hide();
	$("#publishLink").click(showUnpublish);
	$("#unpublishLink").click(showPublish);
	// $("#invite_text").hide();
	// $("#top_three_short").show();
	// $("#top_three.top_three_long").hide();
	// $("#topright").click(function() {
	// 	alert("mewf");
	// });
 	$("#topright").click(showInvite);
 /*
	$("#topright").click(function() {
		showInvite();
		topThreeLong();
	});
*/	
};

$(document).ready(main);