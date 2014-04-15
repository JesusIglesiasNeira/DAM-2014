/* global describe, it */

(function () {
    'use strict';


    require.config({
     	baseUrl:'../app/scripts/',
    	nodeRequire: require
    });
    describe('Test de Buzz', function () {

        var mod;
        beforeEach(function(done){
            require(['Buzz'], function(module){
                mod = module;
                done();
            })
        })

    describe('test metodo', function () {
            it('Buzz should return false', function () {
                assert.isFalse(mod.writeBuzz(1), 'false');
                assert.isFalse(mod.writeBuzz(2), 'false');
                assert.isFalse(mod.writeBuzz(3), 'false');
                assert.isFalse(mod.writeBuzz(4), 'false');
                assert.isFalse(mod.writeBuzz(6), 'false');
                assert.isFalse(mod.writeBuzz(7), 'false');
                assert.isFalse(mod.writeBuzz(8), 'false');
                assert.isFalse(mod.writeBuzz(11), 'false');
                assert.isFalse(mod.writeBuzz(), 'false');
                assert.isFalse(mod.writeBuzz('a'), 'false');
            });
        });

        describe('test metodo', function () {
            it('Buzz(5*) should return Buzz', function () {
                assert.equal(mod.writeBuzz(5), 'Buzz');
                assert.equal(mod.writeBuzz(10), 'Buzz');
                assert.equal(mod.writeBuzz(15), 'Buzz');
                assert.equal(mod.writeBuzz(20), 'Buzz');
                assert.equal(mod.writeBuzz(30), 'Buzz');
                assert.equal(mod.writeBuzz(50), 'Buzz');
            });
        });
    });
})();
