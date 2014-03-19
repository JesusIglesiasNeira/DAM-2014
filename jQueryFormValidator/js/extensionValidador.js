(function($){
    $.fn.extensionValidador= function(options){

    ///////////////////////////////////////////////////////
    var defaults ={
        mensajeErrorFormulario : 'Formulario incorrecto',
        mensajeExito : 'Formulario correcto',
        mensajeErrorCampo: 'El siguiente campo es erroneo:'


    };

    var validOptions = $.extend({}, defaults, options);
    ///////////////////////////////////////////////////////
    var avisos = function(elemento, estado){
        if (!estado){
            //Si no es correcto mostrar mesaje y pintar fondo rojo
            //mostrarMensajes.mostrarError(elemento);
            console.log(validOptions.mensajeErrorCampo + elemento.name);
            coloreador.pintarError(elemento);
        }else{
            //si es correcto pintar fontdo blanco
            coloreador.pintarCorrecto(elemento);
        }

    };

    //Validar los campos
    var validar = function(evt){
        evt.preventDefault();
            var resultado;
            if (this.type == 'checkbox'){
                resultado = this.checked;
            }
            else{
            resultado = validador[this.dataset.validator](this.value);
            }
            avisos(this, resultado);
    };
    //validar elementos al hacer submit
     var validar_elementos = function(elemento){
            var val = this.dataset.validator;
            var val2 = this.value;
            var resultado = validador[val](val2);
            avisos(this, resultado);
            return resultado;
        };

    //Comprobar que todos los campos son correctos al hacer submit
    var enviarForm = function(evt){
        evt.preventDefault();
        var correcto = true;
        var $this = $(this);
        var datos =  $this.find(":input[data-validator]");
        for (var indice= 0; indice <= datos.length-1; indice++){
            var corcheck = (datos[indice].dataset.validator == "required" && datos[indice].type == "checkbox")? datos[indice].checked : validar_elementos.call(datos[indice]);
            correcto = correcto && corcheck;
            if (!corcheck && datos[indice].type == "checkbox"){
                avisos(datos[indice], correcto);
            }
        }
        var escribir = (correcto) ? validOptions.mensajeExito : validOptions.mensajeErrorFormulario;
        console.log(escribir);
    };
    //////////////////////////////////////////////////////////








        return this.filter('form').each(function(){
            var $this = $(this);
            $this.on('blur', ':input[data-validator]',validar);
            $this.on('submit', enviarForm);


        });
    };
})(jQuery);



/*$('form').extensionValidador({'mensajeErrorFormulario':'Formulario no completado/incorrecto',
   'mensajeErrorCampo':'Compruebe el campo '

});*/

