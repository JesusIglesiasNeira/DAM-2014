(function () {
    'use strict';

    require.config({
        baseUrl : '../app/scripts/',
        paths : {
            // pouchdb  : '../bower_components/pouchdb/dist/pouchdb-nightly',
            jquery : '../bower_components/jquery/dist/jquery',
            handlebars : '../bower_components/handlebars.js/dist/handlebars',
        },
        shim : {
            'handlebars': {
                exports : 'Handlebars'
            }
        }
    });


    describe('UI module', function () {
        var ctrl;
        var ui;
        var srv;
        var DB;

        beforeEach(function(done){
            require(['UI', 'Controller','Service','Data'], function( UI,Controller,Service,Data){
                ui =  UI;
                ctrl = Controller;
                srv = Service;
                DB = Data;
                /*sinon.spy(srv,'getTweets');*/
                sinon.spy(ui,'showTweetsList');
                done();
            });
        });

        afterEach(function(done){
            ui.showTweetsList.restore();
            done();
        });


        describe('#ShowTweetsFromTwiter', function () {
            it('Show one tweet from Twitter ', function (done) {
                var tweets =[];
                var tweet ={
                    id:'555',
                    text:'BlaBlaBla',
                    usr:'Alfonso',
                    date:'18/12/1886'
                };
                tweets.push(tweet);
                ui.showTweetsList(tweets, function(){
                        assert.isTrue(ui.showTweetsList.calledOnce,'showTweetsList not called');
                        done();
                    },
                    function(e){throw e;}//error
                );

            });

            it('Show all tweets from Twitter ', function (done) {
                DB.getTweets(
                    function(tweets){
                        ui.showTweetsList(tweets, function(){
                            var lista = $('#twitter-list').children().length;
                            assert.equal(lista, 100);
                            done();
                        }, function(e){
                            console.log('errShowTweetsList');//throw e;
                        }
                    );
                    },
                    function(e){
                        console.log('errGetTweets');//throw e;
                    });
            });
        });
    });
})();