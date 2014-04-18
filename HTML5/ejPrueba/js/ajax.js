var App = App||{};
App.ajax = (function(){
    'use strict';

     //funcion que obtiene el programa y llama a la función que lo almacena
    var getprograma =function () {
        var programa = $.ajax({
            url : 'servidor/show.json',
            type : 'POST',
            dataType : 'JSON',
            cache : false,
            success : function(data){
                console.log("Programa obtenido ok");
                App.main.almacenaprograma(data);
            },
            error : function(jqXHR, textStatus, errorThrow){
                alert("No se pudo cargar el programa, vuelva a intentarlo");
                console.log(errorThrow);
            }
        });
    };
    return{
        getprograma : getprograma
    };



})();