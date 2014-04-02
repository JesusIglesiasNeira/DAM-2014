(function(){
    "use strict";

    var lis = $('li.user');
    //var lis = document.getElementsByTagName('li');
    for(var i= 0; i<=lis.length-1;i++){
        var parr = "<p>";
        //establecer atrib lang a es_ES
        $(lis[i]).data('lang','es_ES');
        //lis[i].dataset.lang = "es_ES";

        //sacar por consola los atributos de las etiquetas
        parr=parr+"<br/> name:"+$(lis[i]).data('name');
        console.log("name:");
        console.log($(lis[i]).data('name'));

        parr=parr+"<br/> city:"+$(lis[i]).data('city');
        console.log("city:");
        console.log($(lis[i]).data('city'));

        parr=parr+"<br/> lang:"+$(lis[i]).data('lang');
        console.log("lang:");
        console.log($(lis[i]).data('lang'));

        parr=parr+"<br/> food:"+$(lis[i]).data('food');
        console.log("food:");
        console.log($(lis[i]).data('food'));

        parr=parr+"<br/> delete:"+$(lis[i]).data('delete');
        console.log("delete:");
        console.log($(lis[i]).data('delete'));
        console.log("");

        /*parr=parr+"<br/> name:"+lis[i].dataset.name;
        console.log("name:");
        console.log(lis[i].dataset.name);

        parr=parr+"<br/> city:"+lis[i].dataset.city;
        console.log("city:");
        console.log(lis[i].dataset.city);

        parr=parr+"<br/> lang:"+lis[i].dataset.lang;
        console.log("lang:");
        console.log(lis[i].dataset.lang);

        parr=parr+"<br/> food:"+lis[i].dataset.food;
        console.log("food:");
        console.log(lis[i].dataset.food);

        parr=parr+"<br/> delete:"+lis[i].dataset.delete;
        console.log("delete:");
        console.log(lis[i].dataset.delete);
        console.log("");*/

        //eliminar las que tienen delete = true
        if(lis[i].dataset.delete){
           lis[i].remove();
        }
        parr= parr+"</p>";
        $('section').append(parr);

    }
})();
