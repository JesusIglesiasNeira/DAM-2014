$(function(){
    'use strict';

    var $municipio = $('#municipio');
    var $lista = $('<div/>').insertAfter($municipio);

    $municipio.data('resultados', $lista);

    var obtenerMunicipios = function() {
        var $this = $(this),
            val = $this.val();

        if(val.trim().length > 0) {
            $.ajax({
                url : '../servidor/autocompletaMunicipios.php',
                type : 'POST',
                data : { municipio : $this.val() },
                dataType : 'json',
                cache : false,
                success : mostrarMunicipios,
                error : mostrarError
            });
        }
    };

    var mostrarMunicipios = function(municipios) {

        if(municipios.length > 0) {
            var $ul = $('<ul/>');

            var lis = [];
            for(var i in municipios) {
                var $li = $('<li/>', {
                    html : municipios[i].replace(new RegExp("(" + $municipio.val() + ")", "gi"), '<strong>$1</strong>')
                });
                lis.push($li[0]);
            }

            $ul.append(lis);
            $lista.addClass('resultados');
            $lista.html($ul);
            $lista.show();
        } else {
            $lista.hide();
        }

    };

    var mostrarError = function(jqXHR, status, error) {
        console.log(error);
    };

    $(document).on('click', ':not(#municipio, .resultados)', function(){
        $lista.hide();
    });

    $municipio.on('keyup', obtenerMunicipios);
});

/*
A partir del formulario proporcionado, añadir la opción de autocompletar el nombre del municipio que está escribiendo el usuario. El esquema del funcionamiento propuesto es el siguiente:

Al cargar la página, se debe crear un elemento HTML de tipo <div> en el que se van a mostrar las sugerencias enviadas por el servidor. Además, se debe establecer el evento de teclado adecuado en el cuadro de texto y también se debe posicionar el cursor en ese cuadro de texto para poder escribir en el directamente.
Cuando se pulse una tecla sobre el cuadro de texto, se debe ejecutar la función autocompleta(). Desde esta función, se debe llamar a la función responsable de obtener la lista de municipios del servidor. El script se llama autocompletaMunicipios.php, el parámetro que se envía mediante POST, se llama municipio y debe contener la cadena de texto escrita por el usuario.
El servidor responde con un array en formato JSON con la lista de municipios cuyo nombre comienza por el texto enviado. Ejemplo de respuesta del servidor:

[ "Alegría-Dulantzi", "Amurrio", "Añana", "Aramaio", "Armiñón", ... ]
Una vez obtenido el array de sugerencias, se debe mostrar en forma de lista de elementos (etiqueta <ul> de HTML). Para transformar el array en la lista <ul>, modificar el prototype del objeto Array y añadir una función específica que realice la transformación.
*/