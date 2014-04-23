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
                done();
            });
        });

        /*afterEach(function(done){
            $.ajax.restore();
            done();
        });*/


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
    });
})();