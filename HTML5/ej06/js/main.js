(function(){
    "use strict";

    var lis = $('li.user');
    //var lis = document.getElementsByTagName('li');
    for(var i= 0; i<=lis.length-1;i++){
        //establecer atrib lang a es_ES
        $(lis[i]).data('lang','es_ES');
        //lis[i].dataset.lang = "es_ES";

        //sacar por consola los atributos de las etiquetas
        console.log("name:");
        console.log($(lis[i]).data('name'));
        console.log("city:");
        console.log($(lis[i]).data('city'));
        console.log("lang:");
        console.log($(lis[i]).data('lang'));
        console.log("food:");
        console.log($(lis[i]).data('food'));
        console.log("delete:");
        console.log($(lis[i]).data('delete'));
        console.log("");
        /*
        console.log("name:");
        console.log(lis[i].dataset.name);
        console.log("city:");
        console.log(lis[i].dataset.city);
        console.log("lang:");
        console.log(lis[i].dataset.lang);
        console.log("food:");
        console.log(lis[i].dataset.food);
        console.log("delete:");
        console.log(lis[i].dataset.delete);
        console.log("");*/
        //eliminar las que tienen delete = true
        if(lis[i].dataset.delete){
           lis[i].remove();
        }

    }
})();
