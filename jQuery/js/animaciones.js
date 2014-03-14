$(function(){
    'use strict';

    var $boxes = $('.box');
        //con jquery
        /*$boxes.animate({
            'height': '50px',
            'width':'50px',
            'color':'tellow',
            'background-color':'blue',
            'font-size':'18px',
            'left':'100%',
        }, 800 );*/

    //con jquery - css
    var $width = $(document).width();
    $boxes.css({
        'height': '50px',
        'width':'50px',
        'font-size':'18px',
        'color': 'yellow',
        'background-color':'blue',
        '-webkit-transform': 'translateX('+($width-100)+'px)',
        '-webkit-transition-property':'all',
        '-webkit-transition-duration':'1s'
        });


});