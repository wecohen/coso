// videochat js

var session = TB.initSession(OT_sessionID);



// TB.setLogLevel(TB.DEBUG);

session.addEventListener("sessionConnected", sessionConnectHandler);
session.addEventListener("streamCreated", streamCreatedHandler);

session.connect(OT_apiKey, OT_token);

function sessionConnectHandler(event) {

    session.publish("user_video", {width: 120, height: 90}); 
    for(var i = 0; i < event.streams.length; i++) {
    	target_stream = event.streams[i]
    	if (session.connection.connectionId != target_stream.connection.connectionId) {
    		subscribeToStream(event.streams[i]);
    		}
    	}
        
	}

function streamCreatedHandler(event) {
	for(var i = 0; i < event.streams.length; i++) {
    	target_stream = event.streams[i];

    	if (session.connection.connectionId != target_stream.connection.connectionId) {
    		subscribeToStream(target_stream);
    		}
    	}
	}

function subscribeToStream(stream) {
    var $div = $('<div/>');
    $("#feeds").append($div);
    $div.attr('id','stream-' + stream.streamId);
	session.subscribe(stream, $div.attr("id"));
}