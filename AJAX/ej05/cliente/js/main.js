$(document).ready(function(){
    'use sctrict';
    var $nombre = $('#login').val();
    var $disponibilidad = $('#disponibilidad');

var mostrarDisponibilidad = function(datos){
    if (datos.disponible && datos.disponible === 'si'){
        $disponibilidad.text('Disponible');
    }
    else if (datos.disponible && datos.disponible === 'no'){
        crearList(datos.alternativas);
        //$disponibilidad.text('No Disponible, alternativas: '+datos.alternativas);
    }

};

var crearList = function(datos){
    var elemli= '' ;
    for (var i = 0; i<=datos.length-1; i++){
        elemli = elemli +'<li>'+datos[i]+'</li>';
    }
    elemli = '<ul>'+elemli+'</ul>';
     $disponibilidad.text('No Disponible, alternativas: ');
     $disponibilidad.append(elemli);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

    var peticion = function(e){
        var $this=$(this);
        $.ajax({
            url : '../servidor/compruebaDisponibilidadJSON.php',
            data :  {login :$nombre},
            type: 'POST',
            dataType: 'JSON',
            cache: false,
            success : function(data, textStatus,jqXHR){
                mostrarDisponibilidad(data);
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