'use strict';
define(
	'Fizz',[],function(){

		var isFizz = function(n){
			return (n % 3 === 0);
		};

		var writeFizz= function(n){
			if(isFizz(n)){
				return('Fizz');
			}
			else{return(false);}
		};

		return{
			writeFizz : writeFizz
		};

	}


);