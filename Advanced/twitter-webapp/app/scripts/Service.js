define('Service',['quo'],function($){
    'use strict';
    console.log('Service module started');

    var getTweets = function (config, success, error){
        $.ajax({
            url : '/app/data/tweets.json',
            dataType : 'json',
            success : success,
            error : error
        });
    };
    return{
        getTweets : getTweets
    };
});