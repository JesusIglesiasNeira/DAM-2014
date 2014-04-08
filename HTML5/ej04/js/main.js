(function(){
    'use strict';

    var actualizaMetter= function(){
         var $inp= $('input');
         var $porcent = parseInt($('meter')[0].attributes[0].value);
         $porcent=0;
         for (var i= 0; i<= $inp.length -1; i++){
             //if ($inp[i].value.length > 0){
             if ($inp[i].validity.valid){
                 $porcent=$porcent+1;
                 $('meter')[0].attributes[0].value= ($porcent+1).toString();
             }
         }
    };
     $('input').on('blur', actualizaMetter);


    //Sacar por consola que inputs reconoce el navegador
    console.log(Modernizr);
    var $ul = $('#datos');
    $ul.empty();

    //Comprobar inputs soportados
    $ul.append('<li>TIPOS: </li>');
    for (var tipo in Modernizr.inputtypes){
        $ul.append('<li>Tipo: ' + tipo + ' ----  Valor: ' + Modernizr.inputtypes[tipo] +'</li>');
    }

    //Comprobar codecs de video soportados
    $ul.append('<li>VIDEO: </li>');
    for (var codec in Modernizr.video){
        $ul.append('<li>Codec: ' + codec + ' ----  Valor: ' + Modernizr.video[codec] +'</li>');
    }

    //Comprobar sistemas de almacenamiento local soportados
    $ul.append('<li>ALMACENAMIENTO: </li>');
    $ul.append('<li>Sistema: localstorage ----  Valor: ' + Modernizr.localstorage +'</li>');
    $ul.append('<li>Sistema: sessionstorage ----  Valor: ' + Modernizr.sessionstorage +'</li>');
    $ul.append('<li>Sistema: websockets ----  Valor: ' + Modernizr.websockets +'</li>');
    $ul.append('<li>Sistema: websqldatabase ----  Valor: ' + Modernizr.websqldatabase +'</li>');
    $ul.append('<li>Sistema: webworkers ----  Valor: ' + Modernizr.webworkers +'</li>');
    $ul.append('<li>Sistema: indexeddb ----  Valor: ' + Modernizr.indexeddb +'</li>');
})();

