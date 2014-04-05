(function(){
    "use strict";
    //$("#editable").designMode= 'on';



    //Funcion que gurada en storage el contenido del campo texto
    var guardar = function(){
        sessionStorage.setItem('contenido', $('#texto').val());
        localStorage.setItem('contenido', $('#texto').val());
    };

    $('#texto').val(localStorage.getItem('contenido'));

    $(document).on('keyup','#texto',guardar);

    //Eventos para los que estan escuchando
    function handleStorage(event){
        if (event.newValue === null) {
             $('#texto').val("");
        }
        else{
             $('#texto').val(localStorage.getItem('contenido'));
        }
    }
    window.addEventListener('storage',handleStorage,false);
    window.atachEvent('onstorage',handleStorage);


})();
