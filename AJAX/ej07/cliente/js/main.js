$(document).ready(function(){
    'use sctrict';
    var $formulario = $('#form1');
    var $enviar = $('#enviar');
    var $disponibilidad = $('#disponibilidad');

var mostrarProvincias = function(datos){
    var desplega= '' ;
    var str = "";
    for (var i = 01; i<=52; i++){
        if (i < 10){
            str='0'+ i.toString();
        }else{
            str= i.toString();
        }
        desplega = desplega +'<option value="'+datos[str]+'" class="seleccionables">'+datos[str]+'</option>';
    }
    desplega = '<select name="provincias" form="form1">'+desplega+'</select>';
    $formulario.append(desplega);
    $(document).on('click', '.seleccionables',cargarMunicipios);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

     $(document).on('click', '#enviar', function(e){
        var $this=$(this);
        $.ajax({
            url : '../servidor/cargaProvinciasJSON.php',
            dataType: 'JSON',
            cache: false,
            success : function(data, textStatus,jqXHR){
                mostrarProvincias(data);
            },
            error : function(jqXHR, textStatus, errorThrow){
                console.log(errorThrow);
            }
        });
    });


      var cargarMunicipios = function(e){
        var $this=$(this);
        console.log($this);
        $.ajax({
            url : '../servidor/cargaMunicipiosJSON.php',
            //data : $nombre,
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



/*<select name="carlist" form="carform">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select>*/


});

/*
Modificar el ejercicio anterior para soportar las respuestas del servidor en formato JSON. Los cambios introducidos son los siguientes:

1) El script del servidor utilizado para cargar las provincias se llama cargaProvinciasJSON.php y la respuesta del servidor tiene el siguiente formato:

{ "01": "Álava/Araba",  "02": "Albacete",  "03": "Alicante/Alacant", ...  }

2) El script del servidor utilizado para cargar los municipios se llama cargaMunicipiosJSON.php y la respuesta del servidor tiene el siguiente formato:

{ "0014": "Alegría-Dulantzi",  "0029": "Amurrio",  ...  }


*/