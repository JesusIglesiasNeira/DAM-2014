/* global describe, it */

(function () {
    'use strict';


    require.config({
     	baseUrl:'../app/scripts/',
    	nodeRequire: require
    });


    describe('Test de Fizz', function () {

    	var mod;
    	beforeEach(function(done){
    		require(['Fizz'], function(module){
    			mod = module;
    			done();
    		})
    	})

        describe('test metodo', function () {
            it('Fizz should return false', function () {
                assert.isFalse(mod.writeFizz(1), 'false');
                assert.isFalse(mod.writeFizz(2), 'false');
                assert.isFalse(mod.writeFizz(4), 'false');
                assert.isFalse(mod.writeFizz(5), 'false');
                assert.isFalse(mod.writeFizz(7), 'false');
                assert.isFalse(mod.writeFizz(8), 'false');
                assert.isFalse(mod.writeFizz(10), 'false');
                assert.isFalse(mod.writeFizz(11), 'false');
                assert.isFalse(mod.writeFizz(), 'false');
                assert.isFalse(mod.writeFizz('a'), 'false');
            });
        });

        describe('test metodo', function () {
            it('Fizz(3*) should return Fizz', function () {
                assert.equal(mod.writeFizz(3), 'Fizz');
                assert.equal(mod.writeFizz(6), 'Fizz');
                assert.equal(mod.writeFizz(9), 'Fizz');
                assert.equal(mod.writeFizz(12), 'Fizz');
                assert.equal(mod.writeFizz(15), 'Fizz');
                assert.equal(mod.writeFizz(18), 'Fizz');
            });
        });
    });
})();
