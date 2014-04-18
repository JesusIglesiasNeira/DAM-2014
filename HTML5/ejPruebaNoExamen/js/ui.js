var App = App||{};
App.ui = (function(){
    'use strict';
    //funcion que muestra los datos del jugador actual
    var mostrarDatosPlayer= function(jugador){
        var edad = jugador.player.age;
        var description = jugador.player.description;
        var name= jugador.player.name;
        var photo= jugador.player.photo;
        var $datosprog = $('#datosprog');
        $datosprog.append("<figure> <img src="+photo+"  alt="+description+"></figure>");
        $datosprog.append("<p> Nombre: "+name+" Edad: "+edad+" Descripcion: "+description+"</p>");
    };

    //funcion que muestra el juego actual
    var mostrarjuego= function(opciones){
         $('#fig1').remove();
         $('#fig2').remove();
         $('#datopc11').remove();
         $('#datopc12').remove();
         $('#datopc13').remove();
         $('#datopc14').remove();
         $('#datopc21').remove();
         $('#datopc22').remove();
         $('#datopc23').remove();
         $('#datopc24').remove();
         $('#muestraTiendaOpc1').remove();
         $('#muestraTiendaOpc2').remove();
         $('#mapcanvas').hide();
        var $opc1 = $('#opc1');
        var photo= opciones.option1.photo;
        var description= opciones.option1.description;
        var name= opciones.option1.name;
        var likes= opciones.option1.likes;
        var price= opciones.option1.price;
        $opc1.append("<figure id='fig1'> <img src="+photo+" alt="+description+"></figure>");
        $opc1.append("<p id='datopc11'> Nombre: "+name+"</p>");
        $opc1.append("<p id='datopc12'> Descripcion: "+description+"</p>");
        $opc1.append("<p id='datopc13'> Likes: "+likes+"</p>");
        $opc1.append("<p id='datopc14'> Precio: "+price+"</p>");
        $opc1.append("<button id='muestraTiendaOpc1'>Mostrar tienda</button>");

        var $opc2 = $('#opc2');
        var photo2= opciones.option2.photo;
        var description2= opciones.option2.description;
        var name2= opciones.option2.name;
        var likes2= opciones.option2.likes;
        var price2= opciones.option2.price;
        $opc2.append("<figure id='fig2'> <img src="+photo2+" alt="+description2+"></figure>");
        $opc2.append("<p id='datopc21'> Nombre: "+name2+"</p>");
        $opc2.append("<p id='datopc22'> Descripcion: "+description2+"</p>");
        $opc2.append("<p id='datopc23'> Likes: "+likes2+"</p>");
        $opc2.append("<p id='datopc24'> Precio: "+price2+"</p>");
        $opc2.append("<button id='muestraTiendaOpc2'>Mostrar tienda</button>");
    };


    return{
        mostrarDatosPlayer : mostrarDatosPlayer,
        mostrarjuego : mostrarjuego
    };



})();