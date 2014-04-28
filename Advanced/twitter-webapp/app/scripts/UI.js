define('UI',['quo', 'handlebars'],function($, handlebars){
    'use strict';
    console.log('UI module started');

    var showTweetsList = function(tweets,succes, error){
        console.log(tweets);
        var $list = $('#twitter-list');
        var list = $('#list-twt').html();
        var template = handlebars.compile(list);
        var html= template({tweets:tweets});
        $list.html(html);
        //$list.append(html);
        if (succes){
            succes();
        }
    };

    return{
        showTweetsList:showTweetsList
    };
});