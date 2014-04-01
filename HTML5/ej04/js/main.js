(function(){
    "use strict";
    var $tipos= $('input');
    var $nocarga=[];
    var $carga=[];
    var $nominput ;
    for (var i = 0; i<= $tipos.length-1; i++){
        $nominput= $tipos[i].attributes[0].value;
        var $moder= "Modernizr.inputtypes."+$nominput;
        if ($moder) {
             $carga.push($nominput);
        } else {
            $nocarga.push($nominput);
        }
    }
    if (Modernizr.meter) {
        $carga.push("meter");
    } else {
        $nocarga.push("meter");
    }
    if (Modernizr.progress) {
        $carga.push("progress");
    } else {
        $nocarga.push("progress");
    }

    var $cargados = "Se cargan correctamente: ";
    if ($carga.length > 0){
        for (var j = 0; j<= $carga.length-1; j++){
            $cargados = $cargados+"</br> "+$carga[j];
        }
        $('section').append('<p>'+$cargados+'</p>');
    }
    var $nocargados = "</br>No se cargan correctamente: ";
    if ($nocarga.length > 0){
        for (var k = 0; k<= $nocarga.length-1; k++){
            $nocargados = $nocargados+"</br> "+$nocarga[k];
        }
        $('section').append('<p>'+$nocargados+'</p>');
    }
})();
