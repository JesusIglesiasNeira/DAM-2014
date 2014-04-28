define(['Controller','Events','lungo','quo'], function(Controller,Events,Lungo, $) {
    'use strict';
    console.log('App started');
    //Controller.getTweetsFromTwitter(console.log('cargados'), console.log('error'));
    Controller.showLatestTweets();
});