var nodos = (function(){
    "use strict";

    //Obtener todos los enlaces
    var enlaces= document.getElementsByTagName("a");
    console.log(enlaces.length);

    enlaces = document.querySelectorAll("a");
    console.log(enlaces.length);

    console.log(enlaces);


    //Penultimo enlace
    if (enlaces.length && enlaces.length>= 1){
        var penultimo = enlaces[enlaces.length-2];
        console.log("Direccion" + penultimo.href);
    }
    console.log(enlaces);
/*enlaces = document.querySelectorAll("p:nth-last-of-type(1)");
    console.log(enlaces);*/


//Contar el nº de enlaces que enlazan a prueba
    var count = 0;
    for (var i= enlaces.length-1; i>=0; i--){
        if (enlaces[i].href === "http://prueba/"){
            count++;
        }

    }
    console.log(count);

    /*var enlaces2 = document.querySelectorAll("a[href = 'http://prueba']").length;
    console.log(enlaces2);*/


    //nº de enlaces del tercer parrafo
    var parrafos= document.querySelectorAll("body > p");
    var enlaces3;
    if (parrafos.length>=3){
        enlaces3= parrafos[2].querySelectorAll("a");
        console.log(enlaces3);
    }

   /* var enlaces4 = document.querySelectorAll("body > p:nth-of-type a");
    console.log(enlaces4);*/


})();




