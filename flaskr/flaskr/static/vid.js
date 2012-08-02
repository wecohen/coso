// videochat js

var session = TB.initSession(OT_sessionID);
var publisher;




TB.setLogLevel(TB.DEBUG);

session.addEventListener("sessionConnected", sessionConnectHandler);
session.addEventListener("streamCreated", streamCreatedHandler);

//BUTTON FUNCTIONS IN OT

// document.ready

function sessionConnect(){
    session.connect(OT_apiKey, OT_token);
    //link to a connect button in the html
}

function sessionDisconnect() {
            session.disconnect();
            hide('disconnectLink');
            hide('publishLink');
            hide('unpublishLink');
        }
        //link to disconnect button in html

//link to "start a vid chat sesh" in html
function startPublishing() {
    if(!publisher) {
        var $parentDiv = $("#user_video").get();
        var $publisherDiv = $('<div/>');
        publisherDiv.attr('id', 'opentok_publisher');
        $("#user_video").append($publisherDiv);
        {"#user_video"}publisher = TB.initPublisher(OT_apiKey, publisherDiv.id);
        session.publish(publisher,{width: 120, height: 90});
        show('unpublishLink');
        hide('publishLink');
    }
}

//link to "stop session" button in html
function stopPublishing() {
    if (publisher) {
        sesion.unpublish(publisher);
    }
    publisher = null;

    show('publishLink');
    hide('unpublishLink');
}

function sessionConnectHandler(event) {

    session.publish("user_video", {width: 120, height: 90}); 
    for(var i = 0; i < event.streams.length; i++) {
        addStream(event.streams[i]);
        }
        show('disconnectLink');
        show('pulishLink');
        hide('connectLink');
    	// target_stream = event.streams[i]
    	// if (session.connection.connectionId != target_stream.connection.connectionId) {
    	// 	subscribeToStream(event.streams[i]);
    	// 	}
    	}
        
	}

function streamCreatedHandler(event) {
	for(var i = 0; i < event.streams.length; i++) {
    	//target_stream = event.streams[i];
        addStream(event.streams[i]);
    	}
	}

function addStream(stream) {
    if (stream.connection.connectionId == session.connection.connectionId) {
        return;
    }
    var subscriberDiv = 
}
function subscribeToStream(stream) {
    var $div = $('<div/>');
    $("#feeds").append($div);
    $div.attr('id','stream-' + stream.streamId);
	session.subscribe(stream, $div.attr("id"));
}

