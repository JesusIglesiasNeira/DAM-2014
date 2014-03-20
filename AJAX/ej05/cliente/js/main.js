$(document).ready(function(){
    'use sctrict';
    var $nombre = $('#login').val();



//////////////////////////////////////////////////////////////////////////////////////////////////////////

    var peticion = function(e){
        var $this=$(this);
        $.ajax({
            url : '../servidor/compruebaDisponibilidadJSON.php',
            //data : $nombre,
            dataType: 'JSON',
            cache: false,
            success : function(data, textStatus,jqXHR){
                console.log(data);
            },
            error : function(jqXHR, textStatus, errorThrow){
                console.log(errorThrow);
            }
        });
    };

//////////////////////////////////////////////////////////////////////////////////////////////////////////



    $(document).on('click','#comprobar', peticion);




});

/*
4.1.5 EJERCICIO 5
Rehacer el ejercicio 4 para procesar respuestas del servidor en formato JSON. Los cambios producidos son:

El script del servidor se llama compruebaDisponibilidadJSON.php y el parámetro que contiene el nombre se llama login.
La respuesta del servidor es un objeto JSON con la siguiente estructura:
El nombre de usuario está libre:

{ disponible: "si" }
El nombre de usuario está ocupado:

{ disponible: "no", alternativas: ["...", "...", ..., "..."] }
*/