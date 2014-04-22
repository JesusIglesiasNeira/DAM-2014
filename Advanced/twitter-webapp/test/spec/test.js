/* global describe, it */

(function () {
    'use strict';

    require.config({
        baseUrl : '../../app/scripts/',
        paths : {
            pouchdb: '../bower_components/pouchdb/dist/pouchdb-nightly',
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

        describe('#put method', function () {
            it('Add some tweets', function (done) {
                DB.addTweet({_id:'123456789', text:'Mocha testing'}, function(){
                    done();
                }, function(err){
                    throw err;
                });
            });
        });

        after(function(done){
            DB.clear(function(){
                done();
            }, function(err){
                throw err;
            });
        });
    });
})();
