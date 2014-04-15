'use strict';
define(
	'FizzBuzz',['Fizz','Buzz'],function(Fizz,Buzz){

		var fb = function(n){

			var respuesta = [];
			if (n){
				for (var i = 1; i <= n; i++){
					if (!Fizz.writeFizz(i) && !Buzz.writeBuzz(i)){respuesta.push(i);}
					else if(Fizz.writeFizz(i) && Buzz.writeBuzz(i)){respuesta.push("FizzBuzz");}
					else if(Fizz.writeFizz(i)){respuesta.push('Fizz');}
					else if(Buzz.writeBuzz(i)){respuesta.push('Buzz');}
				}
			}
			return respuesta.join(" ");
		};


		return{
			fb : fb
		};

	}


);