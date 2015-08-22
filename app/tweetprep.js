var sentiment = require('sentiment');

var tweetPrep = {

    //classify tweet text according to sentiment
    getSentiment: function(text) {
    
        //sentiment processing (AFINN-111)
        var tweetSentiment = sentiment(text);
    
        //classify tweet accoring to sentiment score
        if (tweetSentiment.score === 0) {
            var tweetNlp = "neutral";
        } else if (tweetSentiment.score > 0) {
            var tweetNlp = "positive";
        } else {
            var tweetNlp = "negative";
        }

        return tweetNlp;
    
    }, //close getSentiment method


    //build js object to return to client
    buildTweet: function(tweet, tweetNlp) {
        
        //build JS object for tweet
        tweetData = {
            user: tweet.user.screen_name,
            coordone: String(tweet.geo.coordinates[1]),
            coordtwo: String(tweet.geo.coordinates[0]),
            message: tweet.text,
            time: tweet.timestamp_ms,
            image: tweet.user.profile_image_url,
            sentiment: tweetNlp
        }

        return tweetData;
    }

}; //close tweetPrep object

module.exports = tweetPrep;