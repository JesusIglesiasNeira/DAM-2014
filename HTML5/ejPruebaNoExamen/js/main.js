var App = App||{};
App.main = (function(){
    'use strict';
    //Inicializar la BBDD donde se almacenará el programa
    App.programaIDB.initDB();

    var jugadores = 0;
    var juegoActual = 0;
    var player = 0;
    var coordslat="";
    var coordslong="";
    $('#form').hide();
    $('#volv').hide();


    //funcion que obtiene el programa y llama a la función que lo almacena
    var getprograma =function () {
        var programa = $.ajax({
            url : 'servidor/show.json',
            type : 'POST',
            dataType : 'JSON',
            cache : false,
            success : function(data){
                //var lis = JSON.stringify(data);
                console.log("Programa obtenido ok");
                //almacenaprograma(JSON.stringify(data));
                almacenaprograma(data);
            },
            error : function(jqXHR, textStatus, errorThrow){
                alert("No se pudo cargar el programa, vuelva a intentarlo");
                console.log(errorThrow);
            }
        });
    };

    //Guardar el programa descargado, con IndexedDB
    var almacenaprograma = function(prog){
        App.programaIDB.add(prog,prog.id);

    };

    //Función que carga el programa del almacenamiento local y muestra el 1ºjuego
    var obtenjuego = function(prog){
        var programa = prog.programa;

        var fechaprog= programa.date;
        var horaprog= programa.hour;
        var idprog= programa.id;
        var $datosprog = $('#datosprog');
        $datosprog.empty();
        $datosprog.append("<p> Fecha: "+fechaprog+" Hora: "+horaprog+"</p>");
        for (var i in programa.players){
            console.log("Jugadores: "+programa.players[i]);
            jugadores = jugadores+1;
            //Se muestra por defecto los datos y el 1º juego del 1ºjugador
            if (jugadores === 1){
                coordslat= programa.players[i].challenges[0].place.latitude;
                coordslong= programa.players[i].challenges[0].place.longitude;
                mostrarDatosPlayer(programa.players[i]);
                mostrarjuego(programa.players[i].challenges[0]);

            }
        }


    };

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
         $('#datopc1').remove();
         $('#datopc2').remove();
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
        $opc1.append("<p id='datopc1'> Nombre: "+name+", Descripcion: "+description+", Likes: "+likes+", Precio: "+price+"</p>");
        $opc1.append("<button id='muestraTiendaOpc1'>Mostrar tienda</button>");

        var $opc2 = $('#opc2');
        var photo2= opciones.option2.photo;
        var description2= opciones.option2.description;
        var name2= opciones.option2.name;
        var likes2= opciones.option2.likes;
        var price2= opciones.option2.price;
        $opc2.append("<figure id='fig2'> <img src="+photo2+" alt="+description2+"></figure>");
        $opc2.append("<p id='datopc2'> Nombre: "+name2+", Descripcion: "+description2+", Likes: "+likes2+", Precio: "+price2+"</p>");
        $opc2.append("<button id='muestraTiendaOpc2'>Mostrar tienda</button>");
    };

    //funcion que muestra el juego actual
    var mostrarsiguientejuego= function(){
        var programa = JSON.parse(localStorage.getItem('programa'));
        juegoActual = juegoActual+ 1;
        var juego = programa.players[player].challenges[juegoActual];
        if (juego){
            coordslat= juego.place.latitude;
            coordslong= juego.place.longitude;
            mostrarjuego(juego);
        }
        else{
            alert('No hay mas juegos para este jugador');
        }
    };

    ///////////////////////////////////Geolocalizacion/////////////////////////////////////
    //Función que muestra un mapa con la localización de la tienda
    var mostrarmapa = function(){
        if(Modernizr.geolocation) {
            $('#mapcanvas').show();
            navigator.geolocation.watchPosition(showMap,errorgeo,{
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0});
        }
        else alert("Su navegador no soporta geolocalizacion");

    };



    function showMap(position) {
        var mapcanvas = document.createElement('div');
        mapcanvas.id = 'mapcanvas';
        mapcanvas.style.height = '400px';
        mapcanvas.style.width = '560px';

        document.querySelector('article').appendChild(mapcanvas);

        var latlngt = new google.maps.LatLng(coordslat,coordslong );
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeControl: false,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
        var marker = new google.maps.Marker({
            position: latlngt,
            map: map,
            title: "¡La tienda esta aqui!"
        });
        var marker2 = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "¡Usted está aquí!"
        });
    }


    var errorgeo = (function(position) {
        console.log("Error detectado: "+position);
    });
    ///////////////////////////////////FinGeolocalizacion ////////////////////////////////////////////////
    ///////////////////////////////////Mostrar pantllas juego o formulario////////////////////////////////
    var mostrarpantformulario= function(){
        $('#principal').hide();
        $('#rellenaform').hide();
        $('#form').show();
        $('#volv').show();
    };

    var mostrarpantjuego= function(){
        $('#form').hide();
        $('#volv').hide();
        $('#principal').show();
        $('#rellenaform').show();
    };


////////////////////////////////////////Lógica del juego////////////////////////////////////////////////////
    var comprobaracierto= function(){
        var intento = "option1";
        if(this.id=="fig2"){
            intento = "option2";
        }

        var programa = JSON.parse(localStorage.getItem('programa'));
        var juego = programa.players[player].challenges[juegoActual];
        var solucion= juego.selected;
        if (solucion === intento){
            alert("El resultado es el correcto");
        }
        else{alert("El resultado es el incorrecto");}
    };




    //Función que guarda la opción elegida y muestra el siguiente juego si lo hubiese
    var guardarseleccionada = function(){

    };





    $(document).on('click','#obtjuego',App.programaIDB.get);
    $(document).on('click','#muestrasig',mostrarsiguientejuego);
    $(document).on('click','#fig1',guardarseleccionada);
    $(document).on('click','#fig2',guardarseleccionada);
    $(document).on('click','#muestraTiendaOpc1',mostrarmapa);
    $(document).on('click','#muestraTiendaOpc2',mostrarmapa);
    $(document).on('click','#rellenaform',mostrarpantformulario);
    $(document).on('click','#volv',mostrarpantjuego);
    $(document).on('click','#fig1',comprobaracierto);
    $(document).on('click','#fig2',comprobaracierto);



    return{
            getprograma : getprograma,
            obtenjuego : obtenjuego,
            almacenaprograma : almacenaprograma,
            mostrarDatosPlayer : mostrarDatosPlayer,
            mostrarjuego : mostrarjuego,
            mostrarsiguientejuego : mostrarsiguientejuego,
            mostrarmapa : mostrarmapa,
            showMap : showMap,
            mostrarpantformulario : mostrarpantformulario,
            mostrarpantjuego : mostrarpantjuego,
            comprobaracierto : comprobaracierto,
            guardarseleccionada : guardarseleccionada
        };
})();