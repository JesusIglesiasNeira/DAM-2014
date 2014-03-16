//Función autoejecutable
var mensaje=(function(){
    'use strict';

    //Sacar mensajes por alerta y devolver el mensaje
    var mens1 ="Hola Mundo!";
    var mens2="Que facil es incluir 'comillas simples' y \"comillas dobles\"";
    alert(mens1+'\n'+mens2);
    var mensaje = mens1+'\n'+mens2;
    return mensaje;
})();