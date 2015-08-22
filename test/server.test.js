/* UNIT TESTS */

var rewire = require('rewire'),
    assert = require('assert'),
    config = rewire("../app/config.js"),
    tweetPrep = rewire("../app/tweetprep.js"),
    mocks = require('./twitter-spec-mock-data.js');


describe('config module', function(){

    it('should be defined', function(){
        assert.ok(config);
    });

    it('should have 5 properties', function() {
        assert.equal(Object.keys(config).length, 5);
    });

    it('should have a port property', function() {
        assert.ok(config.port);
    });
    
}); //close describe config module




describe('tweetPrep module', function(){


    describe('getSentiment method', function(){
    var getSentiment;
        
        before(function() {
            getSentiment = tweetPrep.__get__('tweetPrep.getSentiment'); //place method in global scope
        });

        it('should be defined', function(){
            assert.ok(getSentiment);
        });

        
        describe('sentiment analysis of tweet', function(){
        var tweet, mock;
     
            before(function() {
                mock = mocks[0].text; //assign mock tweet text property to mock variable
                tweetNlp = getSentiment(mock); //call sentiment analysis method
            });

            it('should return a tweetNlp variable', function() {
                assert.ok(tweetNlp);
            });

            it('should be `positive`', function() {
                assert.equal(tweetNlp, 'positive');
            });

        }); 
    }); //close getSentiment method describe


    describe('buildTweet method', function(){
        var buildTweet;
        
        before(function() {
            buildTweet = tweetPrep.__get__('tweetPrep.buildTweet'); //place method in global scope
        });

        it('should be defined', function(){
            assert.ok(buildTweet);
        });

        describe('build tweet for client', function(){
        var tweetData, mock, sentiment;
     
            before(function() {
                mock = mocks[0]; //assign mock tweet to mock variable
                tweetData = buildTweet(mock, tweetNlp);
            });

            it('should have 7 properties', function() {
                assert.equal(Object.keys(tweetData).length, 7);
            });
            
            it('should have a username property', function() {
                assert.ok(tweetData.user);
            });
            
            it('should have a longitude coordinate property', function() {
                assert.ok(tweetData.coordone);
            });
            
            it('should have a latitude coordinate property', function() {
                assert.ok(tweetData.coordtwo);
            });
            
            it('should have tweet text property', function() {
                assert.ok(tweetData.message);
            });
            
            it('should have time property', function() {
                assert.ok(tweetData.time);
            });
            
            it('should have an image property', function() {
                assert.ok(tweetData.image);
            });
            
            it('should have a sentiment property', function() {
                assert.ok(tweetData.sentiment);
            });  
        }); 
    }); //close buildTweet method describe
}); //close tweetPrep module describe