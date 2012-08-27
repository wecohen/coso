// videochat js
var publisher;
var session = null;
var subscribers = {};

function sessionConnect(){
    //link to a connect button in the html
}

function sessionDisconnect() {
            session.disconnect();
            $(this).fadeOut();
        }
        //link to disconnect button in html

//link to "start a vid chat sesh" in html
function startPublishing() {
    if(!publisher) {
        var $parentDiv = $("#user_video").get();
        var $publisherDiv = $('<div/>');
        $publisherDiv.attr('id', 'opentok_publisher');
        $("#user_video").append($publisherDiv);
        publisher = TB.initPublisher(OT_apiKey, $publisherDiv.attr("id"), {width: 160, height: 120});
        session.publish(publisher);

    }
}

//link to "stop session" button in html
function stopPublishing() {
    if (publisher) {
        session.unpublish(publisher);
    }
    publisher = null;
}

function sessionConnectHandler(event) {
    for(var i = 0; i < event.streams.length; i++) {
        addStream(event.streams[i]);
    }  
}

function streamCreatedHandler(event) {
	for(var i = 0; i < event.streams.length; i++) {
        addStream(event.streams[i]);
    }
}

function streamDestroyedHandler(event) {
}

function addStream(stream) {
    if (stream.connection.connectionId == session.connection.connectionId) {
        return;
    }
    var $subscriberDiv = $("<div/>");
    $subscriberDiv.attr("id", stream.streamId);
    $("div#feeds").append($subscriberDiv);
    subscribers[stream.streamId] = session.subscribe(stream, stream.streamId, {width: 160, height: 120});
}

function subscribeToStream(stream) {
    var $div = $('<div/>');
    $("#feeds").append($div);
    $div.attr('id','stream-' + stream.streamId);
	session.subscribe(stream, $div.attr("id"));
}

var main = function() {
    session = TB.initSession(sessionId);
    session.connect(OT_apiKey, uniqueToken);
    session.addEventListener("streamCreated", streamCreatedHandler);
    // session.addEventListener("streamDestroyed", streamDestroyedHandler);
    session.addEventListener("sessionConnected", sessionConnectHandler);
    $("input#unpublishLink").click(stopPublishing);
    $("input#publishLink").click(startPublishing);
};

$(document).ready(main);
