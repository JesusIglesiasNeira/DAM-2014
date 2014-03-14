$(function(){
    //5.7.2 Añadir una Navegación por Pestañas
    'use_strict';
    var $ocultos = $('div.module');
    $ocultos.hide();
    $nav = $('<ul/>').addClass('tabs');

    var $lis =[];
    $ocultos.each(function(){
        var $module = $(this);
        var $title = $module.find('h2').text();
        var $li = $('<li>',{'text':$title});
        $li.data('target',$module);
        $lis.push($li.get(0));

    });

    $nav.append($lis).insertBefore($ocultos.eq(0));//meter los li en el ul


    var mostrarOcultos = function(e){
        var $this = $(this);
        $this.addClass('current').siblings('.current').removeClass('current');
        $this.data('target').show().siblings('.module').hide();
    };

    $(document).on('click', '.tabs li', mostrarOcultos);

    $ocultos.eq(0).show();
    $nav.find('li').filter(':first').addClass('current');

});