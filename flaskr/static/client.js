var __my_parent_win = null;
var __origin = null;

var apply_event = function(e) {
	alert("Need to implement this");
};

var install_message_listener = function(e) {
	__origin = e.origin;
	var data = e.data;
	var win = e.source;

	if (__origin === "http://localhost:5000") {
		__my_parent_win = win;
		__my_parent_win.postMessage("Success, dude", "*");

		window.onmessage = apply_event;
	};
};

var send_event = function(e) {
	__my_parent_win.postMessage({"type": e.type, "target": [e.pageX, e.pageY]}, "*")
};

window.onmessage = install_message_listener;

$(document).ready(function() {
	$("body").click(function(e) {
		send_event(e);
	});
});