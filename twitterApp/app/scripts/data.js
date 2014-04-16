'use strict';
define('data',['ydn-db'], function(ydn) {
    var nomdb = 'twitterDB';
    var nomalm = 'twitterAlm';
    var db =  new  ydn.db.Storage(nomdb);




    var addTweet = function(tweet, succesCalback, errorCallback){
        var req = db.put({name: nomalm, keyPath: 'id'}, tweet);
        req.done(succesCalback);
        req.fail(errorCallback);
    };

    var addTweets = function(tweets, succesCalback, errorCallback){
        var req = db.put({name: nomalm, keyPath: 'id'}, tweets);
        req.done(succesCalback);
        req.fail(errorCallback);
    };

    var getTweet = function(idtweet, succesCalback, errorCallback){
        var req = db.get(nomalm, idtweet);
        req.done(succesCalback);
        req.fail(errorCallback);
    };

    /*var getAllTweets = function(succesCalback, errorCallback){
        var req = db.get(nomalm);
        req.done(succesCalback);
        req.fail(errorCallback);
    };*/

    var removeTweet = function(idtweet, succesCalback, errorCallback){
        var req = db.remove(nomalm, idtweet);
        req.done(succesCalback);
        req.fail(errorCallback);
    };

    return{
            addTweet : addTweet,
            addTweets : addTweets,
            getTweet : getTweet,
            removeTweet : removeTweet,
            //getAllTweets : getAllTweets
        };
});