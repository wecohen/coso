var switchUnpublish = function() {
	$("#unpublishLink").toggle();
	$("#publishLink").toggle();
};

var main = function() {
	$("#unpublishLink").hide();
	$("#publishLink").click(function(){
		switchUnpublish()
	});
	$("#unpublishLink").click(function(){
		switchUnpublish()
	});
};

$(document).ready(main);