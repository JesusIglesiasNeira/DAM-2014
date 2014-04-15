/* global describe, it */

(function () {
    'use strict';


    require.config({
     	baseUrl:'../app/scripts/',
    	nodeRequire: require
    });


    describe('Test de FizzBuzz', function () {

    	var mod;
    	beforeEach(function(done){
    		require(['FizzBuzz'], function(module){
    			mod = module;
    			done();
    		})
    	})

        describe('test metodo', function () {
            it('fizzuzz(1) should return 1', function () {
            	var resp = mod.fb(1);
            	assert.equal(resp, '1');
            	assert.typeOf(resp, 'string');
            });
        });

        describe('test metodo', function () {
            it('fizzuzz(2)should return 1 2', function () {
            	var resp = mod.fb(2);
            	    assert.equal(resp, '1 2');
            	assert.typeOf(resp, 'string');
            });
        });

        describe('test metodo', function () {
            it('fizzuzz(2)should return 1 2 Fizz', function () {
            	var resp = mod.fb(3);
            	assert.equal(resp, '1 2 Fizz');
            	assert.typeOf(resp, 'string');
            });
        });

        describe('test metodo', function () {
            it('fizzuzz(5)should return 1 2 Fizz 4 Buzz', function () {
            	var resp = mod.fb(5);
            	assert.equal(resp, '1 2 Fizz 4 Buzz');
            	assert.typeOf(resp, 'string');
            });
        });

        describe('test metodo', function () {
            it('fizzuzz(6)should return 1 2 Fizz 4 Buzz Fizz', function () {
                var resp = mod.fb(6);
                assert.equal(resp, '1 2 Fizz 4 Buzz Fizz');
                assert.typeOf(resp, 'string');
            });
        });

        describe('test metodo', function () {
            it('fizzuzz(7)should return 1 2 Fizz 4 Buzz Fizz 7', function () {
                var resp = mod.fb(7);
                assert.equal(resp, '1 2 Fizz 4 Buzz Fizz 7');
                assert.typeOf(resp, 'string');
            });
        });

        describe('test metodo', function () {
            it('fizzuzz(15)should return 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz', function () {
                var resp = mod.fb(15);
                assert.equal(resp, '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz');
                assert.typeOf(resp, 'string');
            });
        });
        describe('test metodo', function () {
            it('fizzuzz(30)should return 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz Fizz 22 23 Fizz Buzz 26 Fizz 28 29 FizzBuzz', function () {
                var resp = mod.fb(30);
                assert.equal(resp, '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz Fizz 22 23 Fizz Buzz 26 Fizz 28 29 FizzBuzz');
                assert.typeOf(resp, 'string');
            });
        });
        describe('test metodo', function () {
            it('fizzuzz()should return ""', function () {
                var resp = mod.fb();
                assert.equal(resp, '');
                assert.typeOf(resp, 'string');
                assert.lengthOf(resp, 0);
            });
        });
        describe('test metodo', function () {
            it('fizzuzz(a)should return ""', function () {
            	var resp = mod.fb('a');
            	assert.equal(resp, '');
            	assert.typeOf(resp, 'string');
                assert.lengthOf(resp, 0);
            });
        });
    });
})();
