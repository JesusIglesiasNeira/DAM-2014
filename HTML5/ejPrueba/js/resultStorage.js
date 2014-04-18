var App = App||{};
App.resultStorage = (function(){
    'use strict';
    //Guardar resultados y opiniones del usuario

    //Funcion que almacena cada jugada del usuario
    var almacenaResult = function(res){
        var resultados = JSON.parse(localStorage.getItem("prog"+res.programa));
        if (resultados){
            resultados.push(JSON.stringify(res));
            localStorage.setItem("prog"+res.programa, JSON.stringify(resultados));
        }
        else{
        var result = JSON.stringify([res]);
        localStorage.setItem("prog"+res.programa, result);
        }
    };

    //Función que almacena las opiniones del usuario
    var almacenaForm = function(op){
        var opiniones = JSON.parse(localStorage.getItem("opinion"));
        if (opiniones){
            opiniones.push(JSON.stringify(op));
            localStorage.setItem("opinion", JSON.stringify(opiniones));
        }
        else{
        localStorage.setItem("opinion", JSON.stringify([op]));
        }

    };



     return{
            almacenaResult : almacenaResult,
            almacenaForm : almacenaForm
        };

})();