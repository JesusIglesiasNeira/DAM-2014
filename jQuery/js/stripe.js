(function($){
    $.fn.stripe= function(color){
        var c = color|| '#CCC'; //si no nos viene nada por defecto ccc

        return this.filter('table').each(function(){
            var $this = $(this);
            $this.find('tr:odd').css('background-color',c);
        });
    };
})(jQuery);

$('table, div').stripe('#F00');