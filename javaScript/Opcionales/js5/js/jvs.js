//Función autoejecutable
var calcula=(function(){
    'use strict';




    var calcula = function(){
      var numero =document.getElementById("entrada").value;
      var cuerpo = document.getElementsByTagName("body");
      if (numero != ""){
        numero = parseInt(numero);
        calcula = numero;
       for (var i = numero-1; i>0; i--){
          calcula= calcula*i;
        }

    }

      var anadelem = document.createElement("p");
      anadelem.innerText = "El factorial de "+numero+" es "+calcula;
      cuerpo[0].appendChild(anadelem);
    };

    return calcula;


})();