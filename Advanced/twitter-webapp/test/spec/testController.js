(function () {
    'use strict';

    require.config({
        baseUrl : '../app/scripts/',
        paths : {
            // pouchdb  : '../bower_components/pouchdb/dist/pouchdb-nightly',
            jquery : '../bower_components/jquery/dist/jquery',
        },
        shim : {
        }
    });


    describe('Controller module', function () {
        var ctrl;
        var srv;
        var DB;

        beforeEach(function(done){
            require(['Controller', 'Service','Data'], function(Controller, Service, Data){
                ctrl = Controller;
                srv = Service;
                DB = Data;
                sinon.spy(srv,'getTweets');
                sinon.spy(DB,'addTweets');
                sinon.spy(ctrl, 'showLatestTweets');
                done();
            });
        });

        afterEach(function(done){
            ctrl.showLatestTweets.restore();
            srv.getTweets.restore();
            DB.addTweets.restore();
            done();
        });


        describe('#getTweetsFromTweeter', function () {
            it('Get all tweets from Twitter ', function (done) {
                ctrl.getTweetsFromTwitter(
                    function(){
                        assert.isTrue(DB.addTweets.calledOnce,'setTweets not called');
                        done();
                    },
                    function(e){throw e;}//error
                );
                assert.isTrue(srv.getTweets.calledOnce,'getTweets not called');
            });
        });

        describe('#showLatestTweets', function () {
            it('showLatestTweets called', function (done) {
                var errTimeOut = setTimeout(function(){
                    assert(false, 'Event never fired');
                    done();
                },1000);

                ctrl.showLatestTweets(function(){
                    clearTimeout(errTimeOut);
                    assert(true);
                    done();
                }, function(err){
                    throw err;
                });
            });
        });
    });
})();