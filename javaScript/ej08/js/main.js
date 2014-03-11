var ocultar = (function(){
    "use strict";


    window.$= Element.prototype.$ =function(selector){
        var that = (this instanceof Element) ? this : document;
        var elems = that.querySelectorAll(selector);
        return(elems.length === 1) ? elems[0] : elems;
    };

    var enlaces = document.getElementsByTagName("a");
    console.log(enlaces);



    var ocultarMostrarTexto=function(e){
        e.preventDefault();
        e.stopPropagation();
        var pulsado = this.previousElementSibling;
        console.log(pulsado);
        if (pulsado.className =="oculto"){
            pulsado.classList.add("visible");
            pulsado.classList.remove("oculto");
        }
        else {
            pulsado.classList.add("oculto");
            pulsado.classList.remove("visible");
        }

    };

       for (var i = enlaces.length-1; i>=0; i--){
        enlaces[i].addEventListener("click", ocultarMostrarTexto);
    }

})();




