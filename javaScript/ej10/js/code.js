
    window.$= Element.prototype.$ =function(selector){
        var that = (this instanceof Element) ? this : document;
        var elems = that.querySelectorAll(selector);
        return(elems.length === 1) ? elems[0] : elems;
    };

window.onLoad= (function(){
    var datos = $("input");
    var areas = $("textarea");

    var validadores ={};


    var validar = function(evt){


        if (this.dataset.validator == "required"){
             console.log(validador.required(this.value));
        }
        else if (this.dataset.validator == "email"){
            console.log(validador.email(this.value));

        }
        else if (this.dataset.validator == "password"){
            console.log(validador.password(this.value));

        }
        else if (this.dataset.validator == "min"){
            console.log(validador.min(this.value));
        }

    };


    var enviarForm= function(evt){
        evt.preventDefault();
        var correcto = false;
        for (var k = validadores.length-1; k>=0; k--){
            console.log (validadores[k]);
        }




    };


    for (var i = datos.length-1; i>=0; i--){

        if (datos[i].type == "submit"){
            datos[i].addEventListener("click",  enviarForm);
        }
        else{
            datos[i].addEventListener("blur",  validar);
            console.log(datos[i].name);
            validadores[i].estado = false;
            validadores[i].nombre = datos[i].name;
        }
    }

    for ( i = areas.length-1; i>=0; i--){
        areas[i].addEventListener("blur",  validar);
        validadores[i].estado = false;
        validadores[i].nombre = areas[i].name;
    }

    console.log(validadores);
})();