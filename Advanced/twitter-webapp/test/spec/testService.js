(function () {
    'use strict';

    require.config({
        baseUrl : '../app/scripts/',
        paths : {
            // pouchdb  : '../bower_components/pouchdb/dist/pouchdb-nightly',
            jquery : '../bower_components/jquery/dist/jquery',
        },
        shim : {
            /*'ydn-db': {
                exports : 'ydn'
            }*/
        }
    });


    describe('Ajax Service module', function () {
        var srv;
        var $;
        beforeEach(function(done){
            require(['Service', 'jquery'], function(Service, jquery){
                srv = Service;
                $ = jquery;
                sinon.spy($, 'ajax');
                done();
            });
        });

        afterEach(function(done){
            $.ajax.restore();
            done();
        });


        describe('#test Ajax', function () {
            //var   spy =   sinon.spy(PubSub,   'subscribe');
            it('$.ajax has been called', function (done) {
                srv.getTweets();
                assert.isTrue($.ajax.calledOnce);
                assert.equal('/app/data/tweets.json',$.ajax.firstCall.args[0].url);
                //console.log($.ajax);
                done();
            });
        });


        describe('#getTweets', function () {
            it('Get all tweets', function (done) {
                srv.getTweets({
                    apiKey: '',     //De momento se falseará
                }, function (tweets){
                    if(tweets && tweets.statuses && tweets.statuses.length === 100){
                        console.log('Tweets obtenidos: '+ tweets.statuses.length );
                        done();
                    }
                    else{
                        throw 'No se han obtenido los tweets';
                    }
                },
                function(err){
                    throw err;
                });
            });
        });


    });
})();