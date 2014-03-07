var validarDNI = (function(){
    "use strict";

    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];

    var validarLongitud = function(dni){ //comprobar si la longitud es 9
        return dni && dni.length == 9;
    };


    var validarNumero = function(dni){   //comprobar el número
        var num = dni && parseInt(dni);
        return !isNaN(num) && (num) && (num > 0) && (num <= 99999999);
    };


    var validarLetra = function(dni){
        var letra = dni.charAt(dni.length-1);
        var num = dni && parseInt(dni);
        var index = num % 23;
        return letras[index] === letra;
    };


    var validarDNI = function(dni){
        return validarLongitud(dni) && validarNumero(dni) && validarLetra(dni);
    };

    return validarDNI;      //Para poder ejecutarla desde fuera de la función autoejecutable

})();

console.log(validarDNI("44153570X"));
console.log(validarDNI("44153570Y"));
console.log(validarDNI("441535708"));
console.log(validarDNI("44153570888"));