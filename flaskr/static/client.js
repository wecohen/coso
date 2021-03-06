var __my_parent_win = null;
var __origin = null;

var apply_event = function(e) {
	if (e.data.type == "click") {
		event = document.createEvent("HTMLEvents");
		event.initEvent("click", true, true);
		document.elementFromPoint(e.data.x, e.data.y).dispatchEvent(event);
		document.elementFromPoint(e.data.x, e.data.y).focus();
	}
	if (e.data.type == "scroll") {
		window.scrollTo(e.data.offset_x, e.data.offset_y);
	}
	if (e.data.type == "key") {
		fill_key(e.data.code);
	}
};

function fill_key(contents) {
	document.activeElement.value = contents;
};

var install_message_listener = function(e) {
	__origin = e.origin;
	var data = e.data;
	var win = e.source;
	if (__origin === "http://coso.herokuapp.com") {
		__my_parent_win = win;
		__my_parent_win.postMessage({"type": "location", 
			"val": window.location.href}, "*");
		window.onmessage = apply_event;
	};
};

window.onmessage = install_message_listener;

var event_wrapper = function(fn1, fn2) {
	return (function(event) {
		var result = fn2(event);
		if (fn1 !== null && result !== false) {
			fn1(event);
		}
		else if (result == false) {
			event.preventDefault;
			event.stopPropagation;
			return false;
		}
	});
};

var our_click_handler = function(event) {
	elem = document.elementFromPoint(event.pageX, event.pageY);
	if (elem.tagName == "A" && elem.target) {
		our_new_window_handler(elem.href);
		return false;
	}
    else {
        __my_parent_win.postMessage({"type": "click", 
        	"target": [event.pageX, event.pageY]}, "*");
    }
};

var our_scroll_handler = function(event) {
    __my_parent_win.postMessage({"type": "scroll", 
    	"offset": [window.pageXOffset, window.pageYOffset]}, "*");
};

var our_key_handler = function(event) {
    __my_parent_win.postMessage({"type": "key", "code": document.activeElement.value}, "*");
};

var our_new_window_handler = function(url, name, specs, replace) {
	window.location.href = url;
	return false;
}

var install_coso = function() {
	if (__my_parent_win !== null) {
		links = document.body.getElementsByTagName('a');
		for (i in links) {
	    links[i].target = "";
		} 
		document.body.onclick = event_wrapper(document.body.onclick, our_click_handler);
		window.onscroll = event_wrapper(window.onscroll, our_scroll_handler);
		document.body.onkeyup = event_wrapper(document.body.onkeyup, our_key_handler);
		window.open = our_new_window_handler;
	}
};

setTimeout("install_coso();", 100);