$(document).ready(function(){
    'use sctrict';
    var $est = $('#estados');
    var $cont = $('#contenidos');
    var $rec = $('#recurso');
    var $code = $('#codigo');
    var $cab = $('#cabeceras');
    $rec.val(window.location.href);

////////////////////Funciones que rellena los campos/////////////////////////////////////////////////////
    var mostrarContenido = function(datos){
       $cont.text(datos);
    };

    var mostrsarEstados = function(estado){
        if ($est.text() ===''){
            $est.text($est.text()+ estado);
        }
        else{
       $est.text($est.text()+'\n'+ estado);
       }
    };

    var mostrarCabHTTP = function(cabeceras){
       $cab.text(cabeceras);
    };

    var mostrarCodigoServ = function(estado, codigo){
        if ($code.text() ===''){
           $code.text(estado+' '+codigo);}
        else{$code.text($code.text()+'\n'+ (estado+' '+codigo));}
    };


    mostrsarEstados('No Inicializada');
//////////////////////////////////////////////////////////////////////////////////////////////////////////
    $(document).on('click', 'input[value=Mostrar contenidos]', function(e){
        var $this=$(this);

        mostrsarEstados('Cargando');


        $.ajax({
            url : $rec.val(),
            dataType: 'text',
            cache: false,
            success : function(data, textStatus,jqXHR){
                mostrarContenido(data);
                mostrsarEstados('Recibido');
                mostrarCodigoServ(jqXHR.statusText,jqXHR.status);
                mostrarCabHTTP(jqXHR.getAllResponseHeaders());

            },
            error : function(jqXHR, textStatus, errorThrow){
                console.log(errorThrow);
                 mostrsarEstados('Erroneo');
                 mostrarCodigoServ(jqXHR.statusText,jqXHR.status);
            }
        });

    });
});

/*
4.1.1 Ejercicio 1

A partir de la página web proporcionada, añadir el código JavaScript necesario para que:

    Al cargar la página, el cuadro de texto debe mostrar por defecto la URL de la propia página.
    Al pulsar el botón "Mostrar Contenidos", se debe descargar mediante peticiones AJAX el contenido correspondiente a la URL introducida por el usuario. El contenido de la respuesta recibida del servidor se debe mostrar en la zona de "Contenidos del archivo".
    En la zona "Estados de la petición" se debe mostrar en todo momento el estado en el que se encuentra la petición (No inicializada, cargando, completada, etc.)
    Mostrar el contenido de todas las cabeceras de la respuesta del servidor en la zona "Cabeceras HTTP de la respuesta del servidor".
    Mostrar el código y texto de estado de la respuesta del servidor en la zona "Código de estado".
*/