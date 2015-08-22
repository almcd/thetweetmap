$(document).ready(function() {
		
L.mapbox.accessToken = 'pk.eyJ1IjoiYWxtY2QiLCJhIjoiTkhyWmpxcyJ9.hQu_1FXmUrLEsc1ElNZLOQ';
var maptiles = 'almcd.7e0f3d40';

//bounds
var southWest = L.latLng(51.2232, -0.7251),
northEast = L.latLng(51.7559, 0.5479),
bounds = L.latLngBounds(southWest, northEast);

//Map Config	
var map = L.mapbox.map('map', maptiles, {
	maxZoom: 16,
  	minZoom: 10,
    maxBounds: bounds
}).setView([51.5072, -0.1275], 12);	


//object to hold sentiment stats
var SentimentStats = {
    positive: 0,
    negative: 0,
    neutral: 0
}

//--------------------------------------------------------------------------------------------
//ABOUT DIALOG

$(".about-dialog").click(function() {
     $(".dialog").fadeIn("fast");
});

$(".dialog-close img").click(function() {
     $(".dialog").fadeOut("fast");
});

var currentYear = new Date().getFullYear();
$(".current-year").html(currentYear);

//--------------------------------------------------------------------------------------------
//PLACE MARKERS FUNCTION
	
function placeMarkers (tweet) {
	
    //build twitter handle with link
    var tweetUser = "<a href=\"http://www.twitter.com/" + tweet.user + "\" target=\"_blank\">" + tweet.user + "</a>"
    //console.log(tweetUser);

    //auto link urls in incoming tweet
    var tweetContent = Autolinker.link( tweet.message, { className: "tweetLink" } );

    //set marker colour and count according to sentiment
    if (tweet.sentiment === "positive") {
        var tweetMarker = "#34af8c";
        SentimentStats.positive ++;
        $('.positive-val').text(SentimentStats.positive);
    } else if (tweet.sentiment === "negative") {
        var tweetMarker = "#f33834";
        SentimentStats.negative ++;
        $('.negative-val').text(SentimentStats.negative);
    } else {
        var tweetMarker = "#fda63f";
        SentimentStats.neutral ++;
        $('.neutral-val').text(SentimentStats.neutral);
    }

    //setup layer
    var myLayer = L.mapbox.featureLayer().addTo(map);

    //build marker as geojson
	var geojson = [
    {
		'type': 'Feature',
		'geometry': {
		    'type': 'Point',
		    // coordinates here are in longitude, latitude order because
		    // x, y is the standard for GeoJSON and many formats
		    'coordinates': [
		      tweet.coordone,
              tweet.coordtwo
		      

		    ]
		},
		'properties': {
		    'title': tweetUser,
		    'description': tweetContent,
            'sentiment': tweet.sentiment,
		    'marker-size': 'large',
		    'marker-color': tweetMarker
		}
    } 
	];

    //add to map 
    myLayer.setGeoJSON(geojson).addTo(map);

    //fade out status message
    $(".user-status").fadeOut("fast");
	
} //close placeMarkers function


//--------------------------------------------------------------------------------------------
//CONNECT TO WEBSOCKETS
try {
    //attempt connection
    var socket = io.connect({
        'reconnection': true,
        'reconnectionDelay': 1000,
        'reconnectionDelayMax' : 5000,
        'reconnectionAttempts': 60
    });
} catch(e) {
    //if connection fails warn user
    $(".user-status").html("Error Connecting!");
    $(".user-status").fadeIn("slow");
}


//--------------------------------------------------------------------------------------------
 //PRINT DATA WHEN RETURNED FROM THE SERVER
if (socket !== undefined) {    
    //listen for data from server
    socket.on('status', function(tweet) {                    
        //call placeMarkers function to place returned data on map
        placeMarkers(tweet);
    });


    //error handling if server is no longer available
    socket.on('disconnect', function () {
        $(".user-status").html("Disconnected!");
        $(".user-status").fadeIn("slow");
    });

    socket.on('connect', function () {
        $(".user-status").fadeIn("fast");
        $(".user-status").html("Connected! <br /> Waiting for tweets with geolocation<br /><img src=\"../img/loader.gif\" alt=\"\" />");
        //$(".user-status").html("Connected! <br /> Fetching tweets...").delay(5000).fadeOut('slow');
    });

}

//close doc ready
});	