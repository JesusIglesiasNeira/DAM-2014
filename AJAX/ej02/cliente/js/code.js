$(document).ready(function(){
    'use sctrict';

     var $tick = $('#ticker');
     var $deten = $('#detener');
     var $ant = $('#anterior');
     var $sig = $('#siguiente');
     var $noticias=[];
     var $pidiendo = true;
     var $intervalID;


      var mostrarContenido = function(datos){
            var fech= new Date();
            var horas = fech.getHours()+':'+fech.getMinutes()+':'+fech.getSeconds();
            $tick.text(horas+' '+datos);
            guardarDatos($tick.text());
        };

        var guardarDatos = function(noticia){
            if ($.inArray(noticia, $noticias) == -1){
               $noticias.push(noticia);
            }
        };






//////////////////////////////////////////////////////////////////////////////////////////////////////////

    var peticion = function(e){
        var $this=$(this);
        $.ajax({
            url : '../servidor/generaContenidos.php',
            dataType: 'text',
            cache: false,
            success : function(data, textStatus,jqXHR){
                //var $ff = jqXHR.getResponseHeader();
                mostrarContenido(data);

                //mostrsarEstados('Recibido');
                //mostrarCodigoServ(jqXHR.statusText,jqXHR.status);
                //mostrarCabHTTP(jqXHR.getAllResponseHeaders());

            },
            error : function(jqXHR, textStatus, errorThrow){
                console.log(errorThrow);
                 //mostrsarEstados('Erroneo');
                 //mostrarCodigoServ(jqXHR.statusText,jqXHR.status);
            }
        });

    };

    var mostrarAnterior= function(e){
        stopPlayRequest();
        var indice = $.inArray($tick.text(), $noticias);
        $tick.text($noticias[indice-1]);
     };
     var mostrarSiguiente= function(e){
        stopPlayRequest();
        var indice = $.inArray($tick.text(), $noticias);
        $tick.text($noticias[indice+1]);
     };

     var stopPlayRequest = function(e){
        if ($pidiendo){
            clearInterval($intervalID);
            $pidiendo= false;
        }
        /*else if (e.target == '#detener'){
            $intervalID = setInterval(peticion,1000);
            $pidiendo= true;
        }*/
     };



    $intervalID = setInterval(peticion,1000);


    $(document).on('click',$deten, stopPlayRequest);
    $(document).on('click',$ant, mostrarAnterior);
    $(document).on('click',$sig, mostrarSiguiente);



});

/*
4.1.2 Ejercicio 2

La página HTML proporcionada incluye una zona llamada ticker en la que se deben mostrar noticias generadas por el servidor. Añadir el código JavaScript necesario para:

    De forma periódica cada cierto tiempo (por ejemplo cada segundo) se realiza una petición al servidor mediante AJAX y se muestra el contenido de la respuesta en la zona reservada para las noticias.
    Además del contenido enviado por el servidor, se debe mostrar la hora en la que se ha recibido la respuesta.
    Cuando se pulse el botón "Detener", la aplicación detiene las peticiones periódicas al servidor. Si se vuelve a pulsar sobre ese botón, se reanudan las peticiones periódicas.
    Añadir la lógica de los botones "Anterior" y "Siguiente", que detienen las peticiones al servidor y permiten mostrar los contenidos anteriores o posteriores al que se muestra en ese momento.
    Cuando se recibe una respuesta del servidor, se resalta visualmente la zona llamada ticker.
    Modificar la aplicación para que se reutilice continuamente el mismo objeto XMLHttpRequest para hacer las diferentes peticiones.

*/