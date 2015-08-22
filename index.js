//REQUIRE MODULES
//--------------------------------------------------------------------------------------
require('newrelic');
var logger = require('tracer').console();
var Twit = require('twit');
var config = require('./app/config');
var tweetPrep = require("./app/tweetprep.js");

//SET UP SERVER WITH EXPRESS + SOCKET.IO
//--------------------------------------------------------------------------------------
var express = require('express'),
    http = require('http');
 
var app = express();
var server = app.listen(config.port);
var client = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

//serve index.htm when root is requested
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.htm');
});

logger.log("Express server listening on port " + config.port);

var concurrentUsers = 0;

//CONFIGURE ACCESS TO TWITTER API
//--------------------------------------------------------------------------------------
var T = new Twit({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret
})


//CORE FUNCTIONALITY
//--------------------------------------------------------------------------------------
//listen for request from client
client.on('connection', function(socket) {

    concurrentUsers ++;
    logger.log("Concurrent Users: " + concurrentUsers);

    //geographic bounds to monitor
    var data = ['-0.31586', '51.44267', '0.10059', '51.53502'];

    //make request to streaming api
    var stream = T.stream('statuses/filter', { locations: data});

    //when tweet arrives
    stream.on('tweet', function (tweet) {
    logger.log("tweet received");

        //check if tweet is geotagged
        if (tweet.geo) {
            logger.log("tweet with geotag received");

            //get tweet sentiment
            var tweetNlp = tweetPrep.getSentiment(tweet.text);

            //build tweet data for client
            tweetPrep.buildTweet(tweet, tweetNlp); //call method

            //emit tweet data to all clients via websockets
            client.emit('status', tweetData);
        }
    }) //close stream.on


//when user disconnects
socket.on('disconnect', function(){
    logger.log('User Disconnected');
    concurrentUsers --;
    logger.log("Concurrent Users: " + concurrentUsers);
    stream.stop();
});


}); //close client.on
