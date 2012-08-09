var showAbout = function() {
	
}

var hideAbout = function() {
	}

var main = function() {
	$("#about").click(function(){
		showAbout()
	});
	$("#about_text").click(function(){
		hideAbout()
	});
}

$(document).ready(main);