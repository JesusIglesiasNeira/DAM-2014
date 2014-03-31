(function(){
    "use strict";
    $("#editable").designMode= 'on';



    var ponerNegrita = function(){
        document.execCommand("bold",false,null);
    };
    var ponerSubrayado = function(){
        document.execCommand("underline",false,null);
    };
    var ponerCursiva = function(){
        document.execCommand("italic",false,null);
    };
    var guardar = function(){
        localStorage.setItem('contenido', $('#texto').html());
    };

    $('#texto').html(localStorage.getItem('contenido')|| "Texto editable");

    $(document).on('click','#negrita',ponerNegrita);
    $(document).on('click','#subrayado',ponerSubrayado);
    $(document).on('click','#cursiva',ponerCursiva);
    $(document).on('click','#guardar',guardar);

})();
