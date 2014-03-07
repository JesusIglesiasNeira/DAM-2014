var mayusMinus = (function(){
    "use strict";



    var comprobarMayusculas = function(texto){ //comprobar si la longitud es 9
        return texto && texto.toString()&& texto.toUpperCase() === texto && "Mayusculas";
    };


    var comprobarMinus = function(texto){   //comprobar el número
       return texto && texto.toString() && texto.toLowerCase() === texto && "Minusculas";
    };


    var comprobarTexto = function(texto){
        return texto && texto.toString() && "Mixtas";
    };


    var mayusMinus = function(texto){
        return comprobarMayusculas(texto) || comprobarMinus(texto) || comprobarTexto(texto) || "No es un texto";
    };

    return mayusMinus;      //Para poder ejecutarla desde fuera de la función autoejecutable

})();

console.log(mayusMinus("HOLA")+"HOLA");
console.log(mayusMinus("hola")+"hola");
console.log(mayusMinus("Hola")+"Hola");
console.log(mayusMinus("Hola777")+"Hola777");
console.log(mayusMinus("4415AAA3")+"4415AAA3");
console.log(mayusMinus(""));
console.log(mayusMinus());

