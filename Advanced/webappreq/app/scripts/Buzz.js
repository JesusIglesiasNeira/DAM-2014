'use strict';
define(
	'Buzz',[],function(){

	var isBuzz = function(n){
		return (n % 5 === 0);
	};

	var writeBuzz= function(n){
		if(isBuzz(n)){
			return('Buzz');
		}
		else{return(false);}
	};

		return{
			writeBuzz : writeBuzz
		};

	}

);