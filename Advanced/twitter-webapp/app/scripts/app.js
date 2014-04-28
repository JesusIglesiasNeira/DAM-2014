define(['Controller','Events','lungo','quo'], function(Controller,Events,Lungo, $) {
    'use strict';
    console.log('App started');
    Controller.getTweetsFromTwitter();
    Controller.showLatestTweets();
});