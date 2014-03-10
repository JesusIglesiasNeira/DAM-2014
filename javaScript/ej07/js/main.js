var anade = (function(){
    "use strict";


    window.$= Element.prototype.$ =function(selector){
        var that = (this instanceof Element) ? this : document;
        var elems = that.querySelectorAll(selector);
        return(elems.length === 1) ? elems[0] : elems;
    };

    var lista = document.getElementById("lista");


//////////////////////////Eventos////////////
    var lis = lista.children;
    console.log(lis);

    var mostrarTexto=function(e){
        e.preventDefault();
        e.stopPropagation();
        console.log(this);
        console.log(e);
    };

    for (var i= lis.length-1; i>=0; i--){
        lis[i].addEventListener("click", mostrarTexto);
    }
    //lista.addEventListener("click", mostrarTexto);
////////////////////////////////////////////


    var anade = function(){
        //var anadelem = document.createElement("li").createTextNode("Elemento "+ lista2.length);
        var anadelem = document.createElement("li");
        //var contenido = document.createTextNode("Elemento "+ lista.children.length);
        anadelem.innerText = "Elemento "+ lista.children.length;
        //anadelem.appendChild(contenido);
        lista.appendChild(anadelem);
    };
    return anade;
})();




