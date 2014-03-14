
$(function(){

    //5.7.1 Crear una "Sugerencia" para una Caja de Ingreso de Texto
    var $lbl = $('label');
    var $initext = $lbl.text();
    var $inpt = $('input.input_text');
    $inpt.val($lbl.text());
    $inpt.addClass('hint');
    $lbl.hide();

    var eliminaText = function(e){
        var $this = $(this);
        if ($this.val()=== $initext){
            $this.removeClass('hint');
            $this.val("");
        }
    };

    var anadeText = function(e){
        var $this = $(this);
        if ($this.val().length <= 0){
            $this.val($lbl.text());
            $this.addClass('hint');
        }
    };



    //creación de eventos
    $inpt.on('focus', eliminaText);
    $inpt.on('blur', anadeText);





});