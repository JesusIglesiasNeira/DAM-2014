/* global describe, it */

(function () {
    'use strict';

    require.config({
        baseUrl : '../../app/scripts/',
        paths : {
            // pouchdb  : '../bower_components/pouchdb/dist/pouchdb-nightly',
            'ydn-db' : '../bower_components/ydn-db/jsc/ydn.db-dev',
        },
        shim : {
            'ydn-db': {
                exports : 'ydn'
            }
        }
    });

    describe('DataBase module', function () {
        var DB;

        beforeEach(function(done){
            require(['Data'], function(data){
                DB = data;
                done();
            });
        });

        after(function(done){
            DB.clear(function(){
                done();
            });
        });

        describe('#addTweet', function () {
            it('Add one tweet', function (done) {
                DB.addTweet({id:'1234567890', text:'Mocha testing v2'}, function(){
                    done();
                }, function(err){
                    throw err;
                });
            });
            it('Add duplicate tweet', function (done) {
                DB.addTweet({id:'1234567890', text:'Mocha testing v2'}, function(){
                    throw 'Something is broken';
                }, function(){
                    done();
                });
            });
        });

        describe('#addTweets', function () {
            it('Add some tweets', function (done) {
                var tweets = [
                    {id:'11111', text:'Mocha testing v3'},
                    {id:'22222', text:'Mocha testing v3'}
                ];

                DB.addTweet(tweets, function(keys){
                    assert.equal(2, keys.length);
                    done();
                }, function(err){
                    throw err;
                });
            });
        });

        describe('#getTweet', function () {
            it('Get existing tweet', function (done) {
                DB.getTweet('11111', function(tweet){
                    assert.deepEqual(tweet, {id:'11111', text:'Mocha testing v3'});
                    done();
                }, function(err){
                    throw err;
                });
            });
            it('Get non existing tweet', function (done) {
                DB.getTweet('0', function(tweet){
                    assert.isUndefined(tweet);
                    done();
                }, function(err){
                    throw err;
                });
            });
        });

        describe('#updateTweet', function () {
            it('Update existing tweet', function (done) {
                DB.updateTweet({id:'11111', text:'Mocha testing v4'}, function(id){
                    assert.equal(id, '11111');
                    done();
                }, function(err){
                    throw err;
                });
            });
            it('Try to update a non existing tweet', function (done) {
                DB.updateTweet({id:'00000', text:'Mocha testing v5'}, function(id){
                    throw 'Something is broken';
                }, function(){
                    done();
                });
            });
        });

        describe('#removeTweet', function () {
            it('Remove existing tweet', function (done) {
                DB.removeTweet('11111', function(count){
                    assert.equal(count, 1);
                    done();
                }, function(err){
                    throw err;
                });
            });
            it('Try to remove a non existing tweet', function (done) {
                DB.removeTweet('00000', function(){
                    throw 'Something is broken';
                }, function(){
                    done();
                });
            });
        });
    });
})();
