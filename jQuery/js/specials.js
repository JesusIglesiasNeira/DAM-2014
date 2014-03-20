$(document).ready(function(){
    'use sctrict';
    $(document).on('change', 'select[name=day]', function(e){
        var $this=$(this);

        /*console.log($this.val());
        var  $res=$.getJSON(
        'data/specials.json',
        {data : $this.val()},
        function(data, textStatus,jqXHR){
            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);
        });*/
        $.ajax({
            url :'data/specials.json',
            data :{data: $this.val()},
            dataType: 'json',
            cache: false,
            success : function(data, textStatus,jqXHR){
                console.log(data);
            },
            error : function(jqXHR, textStatus, errorThrow){
                console.log(errorThrow);
            }
        });

    });
});
/*7.7.2 Cargar Contenido Utilizando JSON

Abra el archivo /ejercicios/index.html en el navegador. Realice el ejercicio utilizando el archivo /ejercicios/js/specials.js. La tarea es mostrar los detalles del usuario para un día determinado cuando se selecciona desde la lista desplegable.

    Añadir un elemento div después del formulario que se encuentra dentro del elemento #specials; allí será el lugar en donde se colocará la información a obtener.
    Vincular el evento change en el elemento select; cuando se realiza un cambio en la selección, enviar una petición Ajax a /ejercicios/data/specials.json.
    Cuando la petición devuelve una respuesta, utilizar el valor seleccionado en el select (ayuda: $.fn.val) para buscar la información correspondiente en la respuesta JSON.
    Añadir algún HTML con la información obtenida en el div creado anteriormente.
    Finalmente remover el botón submit del formulario.
*/
