var showAbout = function() {
	$("#about_text").slideToggle(600);
};

// var hideAbout = function() {
// 	}

var main = function() {
	$("#about_text").hide();
	$("#about").click(function(){
		showAbout()
	});
	// $("#about_text").click(function(){
	// 	hideAbout()
	// });
};

$(document).ready(main);
