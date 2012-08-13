var showAbout = function() {
	$("#about_text").slideToggle(600);
};

var showInvite = function() {
	$("#invite_text").slideToggle(200);
}

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];
	if(!d.getElementById(id)){js=d.createElement(s);
		js.id=id;
		js.src="//platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js,fjs);}}
		(document,"script","twitter-wjs");


(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}
(document, 'script', 'facebook-jssdk'));

var main = function() {
	$("#about_text").hide();
	$("#invite_text").hide();
	$("#topright").click(function(){
		showInvite()
	});
	$("#about").click(function(){
		showAbout()

	});

};


$(document).ready(main);
