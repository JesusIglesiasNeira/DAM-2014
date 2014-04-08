(function(){
    "use strict";
    //$("#editable").designMode= 'on';



    //Funcion que gurada en storage el contenido (store) del campo texto
    var guardar = function(){
        sessionStorage.setItem('store', $('#texto').val());
        localStorage.setItem('store', $('#texto').val());
    };

    $('#texto').val(localStorage.getItem('store'));

    $(document).on('keyup','#texto',guardar);

    //Eventos para los que estan escuchando
    function handleStorage(event){
        if (event.newValue === null) {
             $('#texto').val("");
        }
        else{
             $('#texto').val(localStorage.getItem('store'));
        }
    }
    //Escuchar eventos
    window.addEventListener('storage',handleStorage,false);
    window.atachEvent('onstorage',handleStorage);


})();
