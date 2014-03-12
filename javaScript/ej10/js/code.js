
    window.$= Element.prototype.$ =function(selector){
        var that = (this instanceof Element) ? this : document;
        var elems = that.querySelectorAll(selector);
        return(elems.length === 1) ? elems[0] : elems;
    };

window.onload= function(){
    var datos = $("[data-validator]");
    var form  = $('#registro');
    var validadores =[];


    var avisos = function(elemento, estado){
        if (!estado){
            //Si no es correcto mostrar mesaje y pintar fondo rojo
            mostrarMensajes.mostrarError(elemento);
            coloreador.pintarError(elemento);
        }else{
            //si es correcto pintar fontdo blanco
            coloreador.pintarCorrecto(elemento);
        }

    };
    //Validar los campos
    var validar = function(evt){
        var val = (evt.type === 'blur')? this.dataset.validator : 'check';
        var val2 = (evt.type === 'blur')? this.value : this;
        var resultado = validador[val](val2);
        console.log(validador[val](val2));
        avisos(this, resultado);
    };

    var validar_elementos = function(elemento){
        var val = (evt.type === 'blur')? this.dataset.validator : 'check';
        var val2 = (evt.type === 'blur')? this.value : this;
        var resultado = validador[val](val2);
        console.log(validador[val](val2));
        avisos(this, resultado);
    };

    //Comprobar que todos los campos son correctos
    var enviarForm = function(evt){
        evt.preventDefault();
        var correcto = true;

        for (var indice in datos){
            correcto = correcto && validar(datos[indice]);
        }

        console.log("Formulario correcto: " + correcto);
    };

    //Asignar los escuchadores de eventos
    for (var i = 0; i<= datos.length-1; i++){
        var e = (datos[i].type == "checkbox") ? 'click' : 'blur';

        datos[i].addEventListener(e, validar);

    }
    form.addEventListener('submit', enviarForm);

};