define('Events',['quo','Controller'],function($,controller){
    'use strict';
    console.log('Events module started');

    //$(document).on('datachange',controller.showLatestTweets);
    $(document).on('datachange',controller, controller.showLatestTweets);










});