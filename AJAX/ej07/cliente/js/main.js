$(document).ready(function(){
    'use sctrict';
    var $formulario = $('#form1');
    var $disponibilidad = $('#disponibilidad');

var mostrarProvincias = function(datos){
    var desplega= '<option value="SeleccioneP" class="noseleccionable">Seleccione Provincia...</option>' ;
    for(var cp in datos) {
        desplega = desplega +'<option value="'+cp+'" id="'+cp+'">'+datos[cp]+'</option>';
    }
    desplega = '<select name="provincias" form="form1" id="provincias">'+desplega+'</select>';
    $formulario.append(desplega);
    $(document).on('change', '#provincias',cargarMunicipios);
};

var mostrarMunicipios = function(municipios){
    $('#municipios').remove();
    var desplega= '<option value="SeleccioneM" class="noseleccionable">Seleccione Municipio...</option>' ;
    for(var cp in municipios) {
        desplega = desplega +'<option value="'+municipios[cp]+'" class="seleccionables">'+municipios[cp]+'</option>';
    }
    desplega = '<select name="municipios" form="form1" id="municipios">'+desplega+'</select>';
    $formulario.append(desplega);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////



      var cargarMunicipios = function(e){
        if (this.value !='SeleccioneP'){
            $.ajax({
                url : '../servidor/cargaMunicipiosJSON.php',
                type : 'POST',
                data : { provincia : this.value },
                dataType : 'json',
                cache : false,
                success : mostrarMunicipios,
                error : function(jqXHR, textStatus, errorThrow){
                    console.log(errorThrow);
                }
            });
        }
        else{$('#municipios').remove();}
    };

//Se cargan las provincias al cargar la pagina
    $.ajax({
        url : '../servidor/cargaProvinciasJSON.php',
        dataType: 'json',
        cache: false,
        success : mostrarProvincias,
         error : function(jqXHR, textStatus, errorThrow){
            console.log(errorThrow);
        }
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////



});

/*
Modificar el ejercicio anterior para soportar las respuestas del servidor en formato JSON. Los cambios introducidos son los siguientes:

1) El script del servidor utilizado para cargar las provincias se llama cargaProvinciasJSON.php y la respuesta del servidor tiene el siguiente formato:

{ "01": "Álava/Araba",  "02": "Albacete",  "03": "Alicante/Alacant", ...  }

2) El script del servidor utilizado para cargar los municipios se llama cargaMunicipiosJSON.php y la respuesta del servidor tiene el siguiente formato:

{ "0014": "Alegría-Dulantzi",  "0029": "Amurrio",  ...  }


*/