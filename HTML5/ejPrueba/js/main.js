var App = App||{};
App.main = (function(){
    'use strict';


    //Función que se encarga de pedir que se guarde con IndexedDB el programa descargado y que comiencen a ostrarse los datos
    var almacenaprograma = function(prog){
        App.programaIDB.addProg(prog,prog.id);
        cargarInicial(prog);
    };

    //Función que recoge los datos del programa y pide que se muestre el 1ºjuego y los datos del 1º jugador
    var cargarInicial= function(prog){

        var dtavbles =  $('#vistaPrograma');
        var programa = prog;
        var fechaprog= programa.date;
        var horaprog= programa.hour;
        var idprog= programa.id;
        var $datosprog = $('#datosprog');
        var player = parseInt(dtavbles.data('player'));
        $datosprog.empty();
        $datosprog.append("<p> Fecha: "+fechaprog+" Hora: "+horaprog+"</p>");
        console.log("Jugadores: "+programa.players[player].player.name);
        //Se muestra por defecto los datos y el 1º juego del 1ºjugador
        dtavbles.data('progr' , programa.id);
        dtavbles.data('coordslat',programa.players[player].challenges[0].place.latitude);
        dtavbles.data('coordslong',programa.players[player].challenges[0].place.longitude);
        dtavbles.data('direccion',programa.players[player].challenges[0].place.adress);
        dtavbles.data('direccionphoto',programa.players[player].challenges[0].place.photo);
        dtavbles.data('solucion',programa.players[player].challenges[0].selected);
        dtavbles.data('juegoActual',0);
        //Pedir que se muestren los datos del jugador y el juego
        App.ui.mostrarDatosPlayer(programa.players[player]);
        App.ui.mostrarjuego(programa.players[player].challenges[0]);
    };

    //Función que recoge los datos del programa y en función del jugador y juego actual decide que juego mostrar
    var sigJuego = function(prog){
        var programa = prog.programa;
        var player = parseInt($('#vistaPrograma').data('player'));
        var juegoActual = parseInt($('#vistaPrograma').data('juegoActual'))+ 1;
        $('#vistaPrograma').data('juegoActual',juegoActual);
        var juego = programa.players[player].challenges[juegoActual];
        if (juego){
            $('#vistaPrograma').data('progr',programa.id);
            $('#vistaPrograma').data('coordslat',juego.place.latitude);
            $('#vistaPrograma').data('coordslong',juego.place.longitude);
            $('#vistaPrograma').data('direccion',juego.place.adress);
            $('#vistaPrograma').data('direccionphoto',juego.place.photo);
            $('#vistaPrograma').data('solucion',juego.selected);
            //Pedir que se muestre el siguiente juego
            App.ui.mostrarjuego(juego);
        }
        else{
            //A falta de algo mejor anunciar con alert
            alert('No hay mas juegos para este jugador, pulse el boton "Siguiente jugador", u obtenga más programas');
        }
    };


    //funcion que pide el siguiente juego al actual
    var mostrarsiguientejuego= function(){
         App.programaIDB.getProg("sigJuego");
    };


    //Función que recoge los datos del programa y en función del jugador y juego actual decide que juego mostrar
    var sigJugador = function(prog){
        var player =  parseInt($('#vistaPrograma').data('player'));
        if (player != 1){
            player +=1;
            var juegoActual = 0;
            $('#vistaPrograma').data('juegoActual',juegoActual);
            $('#vistaPrograma').data('player',player);
            cargarInicial(prog.programa);
        }
        else{
            alert ('No hay más jugadores para este programa. Por favor descargue otro programa.');
        }
    };


    //funcion que pide el siguiente juego al actual
    var mostrarsiguientejugador= function(){
         App.programaIDB.getProg("sigJugador");
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
        else {
            //Si no se soporta geolocalizacion se muestra una imagen de la tienda y su direccion
            var direccion = $('#vistaPrograma').data('direccion');
            var direccionphoto = $('#vistaPrograma').data('direccionphoto');
            console.log("Su navegador no soporta geolocalizacion");
            var direccTienda = "<p> Direccion: "+direccion+"</p>";
            var phototienda = "<figure> <img src="+direccionphoto+" alt="+direccion+"></figure>";
            document.querySelector('#map').appendChild(phototienda);
            document.querySelector('#map').appendChild(direccTienda);
        }
    };



    function showMap(position) {
        var mapcanvas = document.createElement('div');
        mapcanvas.id = 'mapcanvas';
        mapcanvas.style.height = '400px';
        mapcanvas.style.width = '560px';
        var coordslat = $('#vistaPrograma').data('coordslat');
        var coordslong = $('#vistaPrograma').data('coordslong');

        document.querySelector('#map').appendChild(mapcanvas);

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
    ////////////////////////////////////////Lógica del juego////////////////////////////////////////////////////
    var comprobaracierto= function(){
        var intento = "option1";
        var acierto = false;
        var solucion = $('#vistaPrograma').data('solucion');
        if(this.id=="fig2"){
            intento = "option2";
        }
        if (solucion === intento){
            alert("El resultado es el correcto");
            acierto= true;
        }
        else{alert("Buen Intento");}
        guardarseleccionada(acierto);
    };
    //Función que guarda la opción elegida y muestra el siguiente juego si lo hubiese////////////////
    var guardarseleccionada = function(acierto){
        var juegoActual =  parseInt($('#vistaPrograma').data('juegoActual'));
        var player = parseInt($('#vistaPrograma').data('player'));
        var progr = parseInt($('#vistaPrograma').data('progr'));
        var almac = {"programa":progr,"jugador":player,"juego":juegoActual,"acertado":acierto.toString()};
        App.resultStorage.almacenaResult(almac);
    };
    ///////////////////////////////Fin Lógica del juego////////////////////////////////////////////////////////


    var guardaFormulario = function(){
        var aa= $('#nom');
        var nom= $('#nom').val();
        var email= $('#email').val();
        var date= $('#date').val();
        var op= $('#op').val();

        var opinion = {"Nombre":nom,"email":email,"fecha":date,"opinion":op};
        App.resultStorage.almacenaForm(opinion);
    };




    $(document).on('click','#muestrasig',mostrarsiguientejuego);
    $(document).on('click','#muestraTiendaOpc1',mostrarmapa);
    $(document).on('click','#muestraTiendaOpc2',mostrarmapa);
    $(document).on('click','#fig1',comprobaracierto);
    $(document).on('click','#fig2',comprobaracierto);
    $(document).on('click','#guardaForm',guardaFormulario);
    $(document).on('click','#muestrasigplayer',mostrarsiguientejugador);


    return{
            almacenaprograma : almacenaprograma,
            sigJuego : sigJuego,
            sigJugador : sigJugador,
            mostrarmapa : mostrarmapa,
            showMap : showMap,
            comprobaracierto : comprobaracierto,
            guardarseleccionada : guardarseleccionada
        };
})();