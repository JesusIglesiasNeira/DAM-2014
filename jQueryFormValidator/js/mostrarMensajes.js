var mostrarMensajes = (function(){

    var mensajeError = function(elemento){
        console.log("El campo " + elemento.name + " es erroneo");

    };

    return{
        mostrarError : mensajeError
    };

})();