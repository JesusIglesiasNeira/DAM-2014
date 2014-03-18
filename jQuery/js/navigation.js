$(function(){

    $(document).ready(function(){
        $('#nav li').mouseenter(function(){
            var $this = $(this);
            $this.addClass('hover').find('ul').show();
        }).mouseleave(function(){
            var $this = $(this);
            $this.removeClass('hover').find('ul').hide();});
    }).css({'cursor':'pointer'});





});