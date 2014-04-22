define('Controller',['Data','Service'],function(DB, srv){
    'use strict';

    var processtweets = function(data){
        var tweets =[];
        var tweet ={
            id:'',
            text:'',
            usr:'',
            date:''
        };

        if (data && data.statuses && data.statuses.length >0){
            for (var i in data.statuses){
                tweet ={id:'',text:'',usr:'',date:''};
                tweet.id = data.statuses[i].id_str;
                tweet.text = data.statuses[i].text;
                tweet.usr = data.statuses[i].user.name;
                tweet.date = new Date(data.statuses[i].created_at).getTime();

                tweets.push(tweet);
            }
            DB.addTweets(tweets,
                function(){console.log('conseguido');},//success
                function(){console.log('no conseguido');} //error

                );
        }

    };

    var error = function(){

    };

    var getTweetsFromTwitter = function(){
        srv.getTweets({}, processtweets, error);
    };

    return{
        getTweetsFromTwitter:getTweetsFromTwitter
    };

});