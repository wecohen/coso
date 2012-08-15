var showInvite = function() {
	alert("showinvite");
	$("#invite_text").slideToggle(200);
}

var showUnpublish = function() {
	$("#publishLink").hide();
	$("#unpublishLink").show();
	// alert("Screentest.js");
};	

var showPublish = function() {
	$("#unpublishLink").hide();
	$("#publishLink").show();
};

var main = function() {
	$("#unpublishLink").hide();
	$("#publishLink").click(showUnpublish);
	$("#unpublishLink").click(function(){
		showPublish()
	});
	$("#invite_text").hide();
	$("#topright").click(showInvite);
	
};

$(document).ready(main);