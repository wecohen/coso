// screen/browser sharing js

var pusher = new Pusher('b31d655fa7f11bd6f11d');
var channel = pusher.subscribe('channel_name');
channel.bind('URL_change', function(data) {
	if ("iframe#main_frame".attr("src") != data['url']){
    	$("iframe#main_frame").attr("src", data['url']);
    	}
    $("input#destination_url").attr("value", data['url']);
});
channel.bind('click', function(data) {
	$(document.elementFromPoint(data['x'], data['y'])).click();
    $("input#destination_url").attr("value", data['']); //COME UP WITH HOW TO GET CURRENT URL
});

function navigate(url) {
	$("iframe#main_frame").attr("src", url);
	return false;
}

function navigate_request() {
    var destination = $("input#destination_url").val();
    if(destination.substring(0, 4) != "http"){
        destination = "http://" + destination;
    }
    navigate(destination);
    // $.get("http://localhost:5000/navigate", 
    //         {"destination_url" : destination});
    return false;
}
function back() {
	var previous = history.go(-1);
	navigate(previous);
	// $.get("http://localhost:5000/navigate", {"destination_url" : previous});
	return false;
}
function forward() {
	var next = history.go(1);
	$.get("http://localhost:5000/navigate", {"destination_url" : next});
	return false;
}

var url_enter = function(event) {
    if(event.keyCode == 13)	{
        $("a#navigate").click();
    }
};

var message_listener = function(event) {
//    if (event.origin === _target_frame.location.origin) {
        console.log(event.data);
        if (event.data.type == "click") {
        	console.log("It was a click at " + event.data.target[0] + " " + event.data.target[1]);
			$.get("http://localhost:5000/click", 
				{"x": event.data.target[0], "y": event.data.target[1]});
			return false;
        }
        else if (event.data.type == "location") {
        	var new_url = event.data.val;
            $("input#destination_url").val(new_url);
   //          $.get("http://localhost:5000/navigate", {"destination_url" : new_url});
			// return false;
        }
//    }
};

var _target_frame = null;

var url_change_listener = function() {
    connect_target();
};

var main = function() {
	$("input#destination_url").keyup(url_enter);
    $("a#navigate").click(navigate_request);
    $("a#back").click(back);
    $("a#forward").click(forward);
    $("iframe#main_frame").load(url_change_listener);

    _target_frame = $("iframe")[0].contentWindow;
    window.onmessage = message_listener;
};

function connect_target() {
    _target_frame.postMessage("Connect", "*");
    console.log("Parent to child");
}
$(document).ready(main);