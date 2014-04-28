define('Controller',['Data','Service', 'UI'],function(DB, srv, UI){
    'use strict';
    console.log('Controller module started');

    var processtweets = function(data, success, err){
        var tweets =[];
        var tweet ={
            id:'',
            text:'',
            usr:'',
            date:''
        };

       data = JSON.parse(data);

        if (data && data.statuses && data.statuses.length >0){
            for (var i in data.statuses){
                tweet ={id:'',text:'',usr:'',date:''};
                tweet.id = data.statuses[i].id_str;
                tweet.text = data.statuses[i].text;
                tweet.usr = data.statuses[i].user.name;
                tweet.date = new Date(data.statuses[i].created_at).getTime();
                tweets.push(tweet);
            }
            DB.addTweets(tweets,success,err);
        }

    };

    var error = function(e){
        throw e;
    };

    var getTweetsFromTwitter = function(success, err){
        srv.getTweets({}, function(data){
            processtweets(data,success,err);
        }, error);
    };



    var showLatestTweets = function(success, err){
        //Get latest data from provider
        DB.getTweets(function(tweets){
            //Show new data
            UI.showTweetsList(tweets);
            if (success){
                success();
            }
        });


    };

    return{
        getTweetsFromTwitter:getTweetsFromTwitter,
        showLatestTweets: showLatestTweets
    };

});