// screen/browser sharing js

var pusher = new Pusher('b31d655fa7f11bd6f11d');
var channel = pusher.subscribe('channel_name');
channel.bind('URL_change', function(data) {
  $("iframe#main_frame").attr("src", data['url']);
  $("input#destination_url").attr("value", data['url']);
});

function navigate_request() {
    var destination = $("input#destination_url").val();
    $.get("http://localhost:5000/navigate", 
            {"destination_url" : destination});
    return false;
}

$(document).ready(function() {
    $("a#navigate").click(navigate_request);
});