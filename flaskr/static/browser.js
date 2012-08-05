// screen/browser sharing js

var pusher = new Pusher('b31d655fa7f11bd6f11d');
var channel = pusher.subscribe('channel_name');
channel.bind('URL_change', function(data) {
  $("iframe#main_frame").attr("src", data['url']);
  $("input#destination_url").attr("value", data['url']);
});

function navigate_request() {
    var destination = $("input#destination_url").val();
    if(destination.substring(0, 4) != "http"){
        destination = "http://" + destination;
    }
    $.get("http://localhost:5000/navigate", 
            {"destination_url" : destination});
    return false;
}

var url_enter = function(event) {
    if(event.keyCode == 13)	{
        $("a#navigate").click();
    }
};

var hide_paragraph = function(event) {
	console.log("Trying to hide")
    $(this).slideUp();
};

var main = function() {
	$("input#destination_url").keyup(url_enter);

    $("p#test").click(hide_paragraph);
    
    $("iframe#main_frame").click(hide_paragraph);

    $("a#navigate").click(navigate_request);
};

$(document).ready(main);