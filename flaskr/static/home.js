var showAbout = function() {
	$("#about_text").slideToggle(600);
};

var showInvite = function() {
	$("#invite_text").slideToggle(200);
};

var main = function() {
	$("#about_text").hide();
	$("#about").click(function(){
		showAbout()
	});

};




$(document).ready(main);
