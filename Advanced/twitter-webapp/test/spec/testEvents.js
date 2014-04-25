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


    describe('Events module', function () {
        var evt;
        var ctrl;
        var DB;
        var $;
        beforeEach(function(done){
            require(['Events','Controller', 'Data' ,'jquery'], function(Events, Controller, Data ,jquery){
                evt = Events;
                ctrl = Controller;
                DB = Data;
                $ = jquery;
                sinon.spy(ctrl, 'showLatestTweets');
                done();
            });
        });

        afterEach(function(done){
            ctrl.showLatestTweets.restore();
            done();
        });


        describe('#test Event', function () {
            it('Event is fired', function (done) {
                var errTimeOut = setTimeout(function(){
                    assert(false, 'Event never fired');
                    done();
                },1000);
                $(document).on('datachange',function(){
                    clearTimeout(errTimeOut);
                    assert(true);
                    done();
                });
                document.dispatchEvent(new Event('datachange'));

            });
        });






    });
})();