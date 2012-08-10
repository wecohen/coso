var showUnpublish = function() {
	$("#publishLink").hide();
	$("#unpublishLink").show();
};

var showPublish = function() {
	$("#unpublishLink").hide();
	$("#publishLink").show();
};

var main = function() {
	$("#unpublishLink").hide();
	$("#publishLink").click(function(){
		showUnpublish()
	});
	$("#unpublishLink").click(function(){
		showPublish()
	});
};

$(document).ready(main);