define('UI',['jquery', 'handlebars'],function($, handlebars){
    'use strict';
    console.log('UI module started');

    var showTweetsList = function(tweets,succes, error){
        var $list = $('#twitter-list');
        var list = $('#list-twt').html();
        var template = handlebars.compile(list);
        var html= template({tweets:tweets});
        $list.html(html);
        //$list.append(html);
        succes();

    };

    return{
        showTweetsList:showTweetsList
    };
});