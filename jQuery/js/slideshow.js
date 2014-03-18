$(document).ready(function(){
    'use strict';

    //Efecto de amplicion de imagen
    var $fncy =$(".fancy");
    $fncy.fancybox();

   var $bxs = $('.bxslider');

//Efecto de pasar imagenes
  var onslideSiguiente=function ($slideElement, oldIndex, newIndex){
    console.log($slideElement, oldIndex, newIndex);
  };
    var onslideAnt=function ($slideElement, oldIndex, newIndex){
        console.log($slideElement, oldIndex, newIndex);
  };



  $bxs.bxSlider({
    'mode':'fade',
    'controls' : false,
    'pager' : false,
    'onSlideAfter': onslideSiguiente,
    'onSlidePrev': onslideAnt
  });




var $btnAnt  = $('.ant');
var $btnSig = $('.sig');


function cargaSig(){

    $bxs.goToNextSlide();
}

function cargaAnt(){
    $bxs.goToPrevSlide();
}

$btnAnt.on('click', cargaAnt);
$btnSig.on('click', cargaSig);


});