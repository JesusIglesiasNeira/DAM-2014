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
    var anterior =function (){

    };
    var siguiente =function (){

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
    var progr = function(){
        var progres = $('#progreso')[0].value;
        var duracion = myVideo.duration;
        var recorrido = parseInt(myVideo.currentTime)/parseInt(duracion);
        $('#progreso')[0].value=recorrido;
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
});
