var mostrarMensajes = (function(){

    var mensajeError = function(elemento){
        console.log("El campo " + elemento.id + " es erroneo");

    };

    return{
        mostrarError : mensajeError
    };

})();