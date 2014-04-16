/* global describe, it */

(function () {
    'use strict';

    require.config({
        baseUrl:'../app/scripts/',
        paths:{
            'ydn-db': '../bower_components/ydn-db/jsc/ydn.db-dev'
        },
        shim: {
            'ydn-db': {
                exports: 'ydn'
            }
        }
    });



    describe('Database Module', function () {
        var DB;

        beforeEach(function(done){
            require(['data'], function(data){
                DB = data;
                done();
            });
        });


        describe('Modulo DBPUT', function () {
            it('add tweet', function (done) {
                var tweet ={'id': 1,
                'text':'Hola que tal'};
                DB.addTweet(tweet,
                    function(){done();},
                    function(error){throw error;});
            });

            it('add tweet id = ala', function (done) {
                var tweet ={'id': 'ala',
                'text':'Hola que tal'};
                DB.addTweet(tweet,
                    function(){done();},
                    function(error){throw error;});
            });
        });
        describe('Modulo DB PUTs', function () {
            it('add tweets', function (done) {
                var tweets =[{'id': 2,'text':'Hola que tal'},
                {'id': 3,'text':'Mal'},
                {'id': 4,'text':'Algo mejor'},
                {'id': 5,'text':'yo igual'},
                {'id': 6,'text':'Patatin PaTATON'},
                {'id': 7,'text':'UIUAADINDONDABA...'},
                ];
                DB.addTweets(tweets,
                    function(){done();},
                    function(error){throw error;});
            });
        });
        describe('Modulo DB GET', function () {
            it('get tweet id = 5', function (done) {
                DB.getTweet(5,
                    function(twt){
                        if(twt){
                            done();
                            assert.equal(twt.text, 'yo igual');
                        }
                    },
                    function(error){throw error;});
            });
            it('get tweet id =ala', function (done) {
                DB.getTweet('ala',
                    function(twt){
                        if(twt){assert.equal(twt.text, 'Hola que tal');}
                        done();
                    },
                    function(error){throw error;});
            });
            it('get tweet id =a', function (done) {
                DB.getTweet('a',
                    function(twt){
                        if(twt){assert.isFalse(twt.text, 'false');}
                        done();
                    },
                    function(error){throw error;});
            });

            it('get tweet id =1114', function (done) {
                DB.getTweet(1114,
                    function(twt){
                        if(twt){assert.isFalse(twt.text, 'false');}
                        done();
                    },
                    function(error){throw error;});
            });
        });
        /*describe('Modulo DB GETAll', function () {
            it('get all tweets', function (done) {
                DB.getAllTweets(
                    function(twt){
                        if(twt){
                            done();
                            console.log(twt);
                            //assert.equal(twt.text, 'yo igual');
                        }
                    },
                    function(error){throw error;});
            });
        });*/

        describe('Modulo DB REMOVE', function () {
            it('remove tweet id = ala', function (done) {
                DB.removeTweet('ala',
                    function(numrem){
                        assert.equal(numrem, 1);
                        done();
                    });
            });

            it('remove tweet id = 5', function (done) {
                DB.removeTweet(5,
                    function(numrem){
                        assert.equal(numrem, 1);
                        done();
                    });
            });
            it('remove tweet id = 11158', function (done) {
                DB.removeTweet(11158,
                    function(numrem){
                        assert.equal(numrem, 0);
                        done();
                    });
            });

        });




    });
})();
