(function(){
    "use strict";
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

    //$('formulario').addEventListener('submit', enviarForm);
    $('input').on('blur', actualizaMetter);
})();
