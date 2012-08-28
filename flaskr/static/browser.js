// browser sharing js
console.log(sessionId);

var browser_id = Math.random(); // assigns id to identify each browser in session
var pushing = false; // value to indicate when content changes were results of pushes
var click_execution = null; // refer to timeout on receipt of click message from iframe

var pusher = new Pusher('b31d655fa7f11bd6f11d'); // set up new session
var channel = pusher.subscribe('channel_name'); // subscribe to this session
channel.bind('URL_change', function(data) {
    console.log("Pusher URL_change called")
    // pusher pushing to all subscribed to keep iframes at the same place, if
    // statement discludes the browser that originated the push (already updated).
	if (browser_id != data["leader_id"]){
        // DECIDE WHETHER TO ADD IF STATEMENT THAT CURRENT URL IS DIFFERENT FROM NEW ONE
		pushing = true; // mark that a push is going out, expect load event back from iframe
    	$("iframe#main_frame").attr("src", data['url']);
    	}
    $("input#destination_url").attr("value", data['url']); // change text box content
    // for all, since leader may not have changed this already.
});
channel.bind('click', function(data) {
    if (browser_id != data["leader_id"]){
        pushing = true;
        _target_frame.postMessage({"type": "click", "x": data['x'], "y": data['y']}, "*");
    }
});
channel.bind('scroll', function(data) {
    if (browser_id != data["leader_id"]){
        pushing = true;
        _target_frame.postMessage({"type": "scroll", "offset_x": data['offset_x'], "offset_y": data['offset_y']}, "*");
    }
});
channel.bind('key', function(data) {
    if (browser_id != data["leader_id"]){
        pushing = true;
        _target_frame.postMessage({"type": "key", "code": data['code']}, "*");
    }
});

function navigate(url) {
    // change iframe location to url function receives. This should also trigger load event.
	$("iframe#main_frame").attr("src", url);
	return false;
}

function navigate_request() {
    // clean up URL entered by user and call navigate, providing the cleaned URL
    var destination = $("input#destination_url").val();
    if(destination.substring(0, 4) != "http"){
        destination = "http://" + destination;
    }
    navigate(destination);
    return false;
}
function back() {
    // call navigate, providing previous URL using built in history functionality
	var previous = history.go(-1);
	navigate(previous);
	return false;
}
function forward() {
    // call navigate, providing next URL using built in history functionality
	var next = history.go(1);
	navigate(next);
	return false;
}

var url_enter = function(event) {
    // simulate clicking submit button when user presses enter key in text box
    if(event.keyCode == 13)	{
        $("a#navigate").click();
    }
};

var message_listener = function(event) {
    console.log("Event from iframe");
    console.log(event);
    // look for messages sent from iframe (client.js file)
    // if (event.origin === _target_frame.location.origin) {
    // if statement is security precaution to make sure messages are coming from child iframe.
        if (event.data.type == "click") {
            // user clicked in the iframe
            var leader_id = browser_id; // adding an identifier that this iframe originated event
    		if (pushing == false) {
                click_execution = setTimeout(function() {
                	$.get("http://coso.herokuapp.com/click", 
        				{"x": event.data.target[0], "y": event.data.target[1], "leader_id" : leader_id});
                }, 500); // push click event to rest of session after 500 milliseconds
			}
            else if (pushing == true) {
                pushing = false;
            }
            return false;
        }
        else if (event.data.type == "location") {
        	// iframe loaded new page
            clearTimeout(click_execution); // cancel click event from pushing if there was one
        	var new_url = event.data.val; // message from iframe includes new url
        	var leader_id = browser_id; // adding an identifier that this iframe originated event
        	if (pushing == false) {
                // if load was not the result of pushing (was a new action), call pusher function
		        $.get("http://coso.herokuapp.com/navigate", {"destination_url" : new_url, "leader_id" : leader_id});
			}
            else if (pushing == true) {
                // if load was the result of pushing, turn off indicator watching for this
                pushing = false;
            }
			return false;
        }
        else if (event.data.type == "scroll") {
            var leader_id = browser_id; // adding an identifier that this iframe originated event
            if (pushing == false) {
                $.get("http://coso.herokuapp.com/scroll", {"offset_x" : event.data.offset[0],
                 "offset_y" : event.data.offset[1], "leader_id" : leader_id});
            }
            else if (pushing == true) {
                pushing = false;
            }
            return false;
        }
        else if (event.data.type == "key") {
            var leader_id = browser_id; // adding an identifier that this iframe originated event
            if (pushing == false) {
                console.log(event.data.code)
                $.get("http://coso.herokuapp.com/key", {"code": event.data.code, "leader_id": leader_id});
            }
            else if (pushing == true) {
                pushing = false;
            }
            return false;
        }
//    }
};

var _target_frame = null;
// creating variable to be assigned to child iframe to facilitate communication

function connect_target() {
    // setting up connection with iframe (client.js) when it loads
    _target_frame.postMessage("Connect", "*");
}

var main = function() {
	$("input#destination_url").keyup(url_enter);
    $("a#navigate").click(navigate_request);
    $("a#back").click(back);
    $("a#forward").click(forward);
    $("iframe#main_frame").load(connect_target);
    _target_frame = $("iframe")[0].contentWindow;
    window.onmessage = message_listener;
};

$(document).ready(main);