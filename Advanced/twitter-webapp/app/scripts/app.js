define(['Controller','Events','lungo','quo'], function(Controller,Events,Lungo, $) {
    'use strict';
    console.log('App started');
    //Si hay nuevos tweets se insertan en la BD y se muestran todos con el 1º callback si no hay nuevos se muestran los de la
    //BD con el 2º callback
    Controller.getTweetsFromTwitter(Controller.showLatestTweets,Controller.showLatestTweets);
});