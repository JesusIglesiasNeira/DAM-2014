//Función autoejecutable
var lanza=(function(){
    'use strict';




    var lanza = function(){
      var cuerpo = document.getElementsByTagName("body");
      var resultados = [];
      var salidas = [0,0,0,0,0,0,0,0,0,0,0];
      for (var i=0 ; i<=360-1; i++){
        var num1= parseInt(Math.random()*(6-1)+1);
        var num2= parseInt(Math.random()*(6-1)+1);
        resultados.push( num1 + num2);
        salidas[(num1 + num2)-2]++;
      }
      var numveces = 0;
      var masrepetido=0;
      for (var j=0 ; j<=salidas.length-1; j++){
        if (salidas[j] > numveces){
          numveces= salidas[j];
          masrepetido = j+2;
        }
      }



      var anadelem = document.createElement("p");
      anadelem.innerText = resultados+"\n"+"El numero que mas ha salido es "+masrepetido;
      cuerpo[0].appendChild(anadelem);
    };

    return lanza;


})();