var esPalin = (function(){  //Funcion para saber si un texto e palíndromo
    "use strict";

    var esPalin = function(texto){
        texto = texto.trim().replace(/ /gi,"").toLowerCase();
        var pal = texto.split("").reverse().join("");
        return texto && texto === pal;
    };

    return esPalin;      //Para poder ejecutarla desde fuera de la función autoejecutable

})();

console.log(esPalin("La ruta nos aporto otro paso natural")+"La ruta nos aporto otro paso natural");
console.log(esPalin("hola")+"hola");
console.log(esPalin("HoloH")+"HoloH");
console.log(esPalin("Hol78oH")+"Hol78oH");




