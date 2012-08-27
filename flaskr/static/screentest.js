 var showInvite = function() {
	$("div.all").toggleClass("show_invite");
	return false;
};

var showUnpublish = function() {
	$("#publishLink").hide();
	$("#unpublishLink").show();
};	

var showPublish = function() {
	$("#unpublishLink").hide();
	$("#publishLink").show();
};

var topThreeLong = function() {
	$("#top.top_showing").slideToggle(200);
	$("#browser.browser_showing").slideToggle(200);
};


var main = function() {
	$("#unpublishLink").hide();
	$("#publishLink").click(showUnpublish);
	$("#unpublishLink").click(showPublish);
 	$("#topright").click(showInvite);
};

$(document).ready(main);