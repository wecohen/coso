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

var message_listener = function(event) {
    if (event.origin === _target_frame.location.origin) {
            console.log(event.data);        
    }
};

var hide_paragraph = function(event) {
	console.log("Trying to hide")
    $(this).slideUp();
};

var _target_frame = null;

var main = function() {
	$("input#destination_url").keyup(url_enter);

    $("p#test").click(hide_paragraph);
    
    $("iframe#main_frame").click(hide_paragraph);

    $("a#navigate").click(navigate_request);

    _target_frame = $("iframe")[0].contentWindow;
    window.onmessage = message_listener;
};

function connect_target() {
    _target_frame.postMessage("Connect", "*");
}
$(document).ready(main);