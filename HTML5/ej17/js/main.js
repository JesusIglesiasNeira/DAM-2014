(function(){
    "use strict";


    var escribenum= function(evt){
        var nums=  $('#primos').text();
        $('#primos').text(nums +" "+ evt.data+" ");
    };

    var obtenPrimos = function(){
        if(Modernizr.webworkers) {
            var number=  $('#num').val();
            if (number){
                var worker = new Worker('js/worker-primos.js');
                //calculaprimos(number);
                worker.postMessage({'num': number});
                worker.addEventListener('message', escribenum, false);
            }
        }
        else {
            alert('El explorador NO soporta Web workers');
        }
    };

    $(document).on('click','#obtprim',obtenPrimos);

})();
