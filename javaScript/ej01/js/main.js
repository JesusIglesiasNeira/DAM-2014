(function(){
    "use strict";
    var meses =["Enero", "Febrero"];
    meses.push("Marzo");
    meses.push("Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre", "Diciembre");

    //alert(meses);/*Solo para alertas importantes*/

    console.log(meses);

    for (var i = meses.length-1; i>=0; i--){
        console.log(meses[i]);
    }
})();