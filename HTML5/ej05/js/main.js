(function(){
    'use strict';

        var $progress = $('#progress');

    $(document).on('change', 'input', function(e){
        var $this = $(this);
        if ($this.value!== '')
            $progress.val($progress.val()+1);

    });


    //Sacar por pantalla que inputs reconoce el navegador
    console.log(Modernizr);
    var $ul = $('#datos');
    $ul.empty();
    $ul.append('<li>TIPOS: </li>');

    for (var tipo in Modernizr.inputtypes){

        $ul.append('<li>Tipo: ' + tipo + ' ----  Valor: ' + Modernizr.inputtypes[tipo] +'</li>');
    }

    $ul.append('<li>VIDEO: </li>');
    for (var codec in Modernizr.video){

        $ul.append('<li>Codec: ' + codec + ' ----  Valor: ' + Modernizr.video[codec] +'</li>');
    }

    $ul.append('<li>Placeholder: </li>');
    $ul.append('<li>Codec: placeholder ----  Valor: ' + Modernizr.input.placeholder +'</li>');
    $ul.append('<li>Progress: </li>');
    $ul.append('<li>Codec: Progress ----  Valor: ' + Modernizr.progress +'</li>');
    $ul.append('<li>Geolocation: </li>');
    $ul.append('<li>Codec: geolocation ----  Valor: ' + Modernizr.geolocation +'</li>');


    Modernizr.load({
        test:Modernizr.input.color,
        nope:'libs/vendor/color-polyfill.js'
    });
})();

