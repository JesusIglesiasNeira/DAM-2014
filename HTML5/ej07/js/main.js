$(document).ready(function(){
    "use strict";

    var myVideo=document.getElementById("miVideo");
    var myvar=$('#barra').value;


    var iniciar =function (){
        myVideo.play();
    };
    var pausar =function (){
        myVideo.pause();
    };
    var parar =function (){
        myVideo.pause();
        myVideo.currentTime = 0;
    };
    var avanz10 =function (){
        myVideo.currentTime = myVideo.currentTime+10;
    };
    var retr10 =function (){
        if (myVideo.currentTime >= 10){
            myVideo.currentTime = myVideo.currentTime-10;
        }
        else{
            myVideo.currentTime = 0;
        }
    };

    var siguiente =function (){
        var video =0;
        for (var i=0; i <=  $('#videos')[0].length-1; i++){
            if ($('#videos')[0][i].selected){
                if (i<$('#videos')[0].length-1){
                    $('#videos')[0][video].selected=false;
                    video=i+1;
                }
                //video actual es el ultimo, se reproducira el 1º
                else{
                    var ultimo =('#videos')[0].length-1;
                     $('#videos')[0][ultimo].selected=false;
                }
            }
        }
        $('#videos')[0][video].selected=true;
        cambiaVideo();
    };

    var anterior =function (){
        var video =('#videos')[0].length;
        for (var i=0; i <=  $('#videos')[0].length-1; i++){
            if ($('#videos')[0][i].selected){
                if (i>0){
                    $('#videos')[0][i].selected=false;
                    video=i-1;
                }
                //video actual es el primero, se reproducira el ultimo
                else{
                     $('#videos')[0][0].selected=false;
                }
            }
        }
        $('#videos')[0][video].selected=true;
        cambiaVideo();
    };

    var full =function (){
        if (myVideo.requestFullScreen){myVideo.requestFullScreen();}
        else if (myVideo.webkitRequestFullScreen){myVideo.webkitRequestFullScreen();}
        else if (myVideo.mozRequestFullScreen){myVideo.mozRequestFullScreen();}
        //myVideo.webkitEnterFullscreen();
    };
    var volumen = function(){
      myvar=$('#barra');
      console.log(myvar[0].value);
      var volumen = parseInt(myvar[0].value)/100;
      myVideo.volume = volumen;
    };
    //Actualizar la barra de progreso
    var progr = function(){
        var progres = $('#progreso')[0].value;
        var duracion = myVideo.duration;
        var recorrido = parseInt(myVideo.currentTime)/parseInt(duracion);
        $('#progreso')[0].value=recorrido || 0;
    };

    var cambiaVideo = function(){
        parar();
        var vidselecc = $('#videos')[0].selectedOptions[0].value;
        $('#mp4')[0].src="videos/"+vidselecc+".mp4";
        $('#webm')[0].src="videos/"+vidselecc+".webm";
         document.getElementById("miVideo").load();

    };




    $(document).on('click','#reproducir',iniciar);
    $(document).on('click','#pausar',pausar);
    $(document).on('click','#stop',parar);
    $(document).on('click','#avanza10',avanz10);
    $(document).on('click','#reteocede10',retr10);
    $(document).on('click','#anterior',anterior);
    $(document).on('click','#siguiente',siguiente);
    $(document).on('click','#pantcompleta',full);
    $(document).on('change','#barra',volumen);
    $(document).on('load',volumen);
    $('#miVideo').on('timeupdate',progr);
    $(document).on('change','#videos',cambiaVideo);
});
