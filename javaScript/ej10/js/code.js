
    window.$= Element.prototype.$ =function(selector){
        var that = (this instanceof Element) ? this : document;
        var elems = that.querySelectorAll(selector);
        return(elems.length === 1) ? elems[0] : elems;
    };

window.onLoad= (function(){
    var datos = $("input");
    var areas = document.getElementsByTagName("textarea");

    var validadores =[];


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
            if (validadores[k][0].dataset.validator == "required"){
                validadores[k][1]=validador.required(validadores[k][0].value);
            }
             else if (validadores[k][0].dataset.validator == "email"){
                validadores[k][1]=validador.email(validadores[k][0].value);

            }
            else if (validadores[k][0].dataset.validator == "password"){
                validadores[k][1]=validador.password(validadores[k][0].value);
            }
            else if (validadores[k][0].dataset.validator == "min"){
                validadores[k][1]=validador.min(validadores[k][0].value);
            }
            else if (validadores[k][0].name === "condiciones"){
                validadores[k][1]=validadores[k][0].checked;
            }
        }

        for ( k = validadores.length-1; k>=0; k--){
            if (validadores[k][1] === false){
                 console.log ("Compruebe el campo "+validadores[k][0].name);
            }
        }




    };


    for (var i = 0; i<= datos.length-1; i++){

        if (datos[i].type == "submit"){
            datos[i].addEventListener("click",  enviarForm);
        }
        else{
            datos[i].addEventListener("blur",  validar);
            validadores[i]=[datos[i],false];
        }
    }

    for ( var j = areas.length-1; j>=0; j--){
        areas[j].addEventListener("blur",  validar);
        var taman =validadores.length;
        validadores[validadores.length] = [areas[j],false];

    }
})();