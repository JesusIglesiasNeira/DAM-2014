var coloreador = (function(){

    var pintarFondoError = function(elemento){

        elemento.classList.add("erroneo");
    };

    var pintarFondoCorrecto = function(elemento){
        elemento.classList.remove("erroneo");
    };

    return{
        pintarError : pintarFondoError,
        pintarCorrecto : pintarFondoCorrecto
    };
})();
