define('Data', ['ydn-db'], function(ydn) {
    'use strict';
    console.log('Data module started');

    var dbName = 'TwitterDB',
        keyPath = 'id',
        tweetTable = 'twitter',
        db = new ydn.db.Storage(dbName);

    var addTweet = function(tweet, success, error) {
        var req = db.add({name: tweetTable, keyPath: keyPath}, tweet);

        req.done(function(){
            throwEvents();
            success();
        });
        req.fail(error);
    };

    var addTweets = function(tweets, success, error) {
        console.log('Data.addTweets()');
        var req = db.add({name: tweetTable, keyPath: keyPath}, tweets);
        console.log('Tweets insertados:'+tweets.length);
        req.done(success);
        req.fail(error);
    };

    var getTweet = function(id, success, error) {
        var req = db.get(tweetTable, id);
        req.done(success);
        req.fail(error);
    };

    var getTweets = function(success, error) {
        var req = db.values(tweetTable);
        req.done(function(values){
            console.log(values);
        });
        req.fail(error);
    };

    var updateTweet = function(tweet, success, error) {
        getTweet(tweet.id, function(t){
            if(t) {
                var req = db.put({name: tweetTable, keyPath: keyPath}, tweet);
                req.done(success);
                req.fail(error);
            } else {
                error('There is no tweet with id ' + tweet.id);
            }
        }, error);
    };

    var removeTweet = function(id, success, error){
        getTweet(id, function(tweet) {
            if(tweet) {
                var req = db.remove(tweetTable, id);
                req.done(success);
                req.fail(error);
            } else {
                error('There is no tweet with id ' + id);
            }
        });
    };

    var clear = function(success, error){
        var req = db.clear(tweetTable);
        req.done(success);
        req.fail(error);
    };

    var throwEvents = function(){
        var event = new Event('datachange');
        document.dispatchEvent(event);

    };

    return {
        addTweet : addTweet,
        addTweets : addTweets,
        getTweet : getTweet,
        getTweets : getTweets,
        updateTweet : updateTweet,
        removeTweet : removeTweet,
        clear : clear
    };
});