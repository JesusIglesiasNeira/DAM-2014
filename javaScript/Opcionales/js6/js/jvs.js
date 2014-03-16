//Función autoejecutable
var calcula=(function(){
    'use strict';




    var calcula = function(){
      var numero =document.getElementById("entrada").value;
      var cuerpo = document.getElementsByTagName("body");
      if (numero != ""){
        numero = parseInt(numero);
        calcula = 'par';
        if (numero%2 != 0){
          calcula='impar';
        }
      }
      else{
        calcula ='no es un numero';
      }

      var anadelem = document.createElement("p");
      anadelem.innerText = "El numero "+numero+" es "+calcula;
      cuerpo[0].appendChild(anadelem);
    };

    return calcula;


})();