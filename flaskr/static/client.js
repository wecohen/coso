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
		__my_parent_win.postMessage({"type": "location", "val": window.location.href}, "*");
		window.onmessage = apply_event;
	};
};

window.onmessage = install_message_listener;

var event_wrapper = function(fn1, fn2) {
	return (function(event) {
		fn2(event);
		if (fn1 !== null) {
			fn1(event);
		}
	});
};

var our_click_handler = function(event) {
    if (__my_parent_win !== null) {
        __my_parent_win.postMessage({"type": "click", "target": [event.pageX, event.pageY]}, "*");
    }
};

var install_coso = function() {
	document.body.onclick = event_wrapper(document.body.onclick, our_click_handler);
};

setTimeout("install_coso();", 100);

