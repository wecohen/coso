// videochat js
var publisher;

TB.setLogLevel(TB.DEBUG);

function sessionConnect(){
    session.connect(OT_apiKey, $("unique_token"));
    //link to a connect button in the html
}

function sessionDisconnect() {
            session.disconnect();
            $(this).fadeOut();
            // hide('disconnectLink');
            // hide('publishLink');
            // hide('unpublishLink');
        }
        //link to disconnect button in html

//link to "start a vid chat sesh" in html
function startPublishing() {
    if(!publisher) {
        var $parentDiv = $("#user_video", {width: 120, height: 90}).get();
        var $publisherDiv = $('<div/>');
        $publisherDiv.attr('id', 'opentok_publisher');
        $("#user_video").append($publisherDiv);
        publisher = TB.initPublisher(OT_apiKey, $publisherDiv.attr("id"));
        session.publish(publisher);
        $(this).fadeOut();
        // show('unpublishLink');
        // hide('publishLink');
    }
}

//link to "stop session" button in html
function stopPublishing() {
    if (publisher) {
        sesion.unpublish(publisher);
    }
    publisher = null;
    $(this).fadeOut();

    // show('publishLink');
    // hide('unpublishLink');
}

function sessionConnectHandler(event) {
    //session.publish("user_video", {width: 120, height: 90}); 
    for(var i = 0; i < event.streams.length; i++) {
        addStream(event.streams[i]);
        }
        // show('disconnectLink');
        // show('publishLink');
        // hide('connectLink');
    	// target_stream = event.streams[i]
    	// if (session.connection.connectionId != target_stream.connection.connectionId) {
    	// 	subscribeToStream(event.streams[i]);
    	// 	}
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
    var $subscriberDiv = $("<div/>");
    $subscriberDiv.attr("id", stream.streamId);
    $subscriberDiv.get("#feeds");
    $subscriberDiv.append("#feeds");
    subscribers[stream.streamId] = session.subscribe(stream, subscriberDiv.id);
}
function subscribeToStream(stream) {
    var $div = $('<div/>');
    $("#feeds").append($div);
    $div.attr('id','stream-' + stream.streamId);
	session.subscribe(stream, $div.attr("id"));
}



var main = function() {
    // $("#connectLink").click(sessionConnect);
    // $("input#disconnectLink").click(sessionDisconnect);
    // session.connect(OT_apiKey, OT_token);
    $("input#publishLink").click(startPublishing);
    $("input#unpublishLink").click(stopPublishing);
    
};

$(document).ready(main);

// }
// helper functions


    // function show(id) {
            
    //         document.getElementById(id).style.display = 'block';
    //     }

    //     function hide(id) {
    //         document.getElementById(id).style.display = 'none';
    //     }
