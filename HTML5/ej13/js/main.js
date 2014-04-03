$(document).ready(function() {
    // Calcular posición



    function showMap(position) {
        var mapcanvas = document.createElement('div');
        mapcanvas.id = 'mapcanvas';
        mapcanvas.style.height = '400px';
        mapcanvas.style.width = '560px';

        document.querySelector('article').appendChild(mapcanvas);

        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeControl: false,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "¡Usted está aquí!"
        });
        $('#status')[0].textContent="latitud: "+position.coords.latitude+" Longitud: "+position.coords.longitude+
            " Precision "+position.coords.accuracy+" altitud: "+position.coords.altitude+" Precision "+
            position.coords.altitudeAccuracy;

    }
    function cambiarEstado(position){
        $('#status')[0].textContent= "Finalizado";
        showMap(position);
    }

    var error = (function(position) {
        $('#status')[0].textContent= "Error detectado";
    });


    if(Modernizr.geolocation) {
        //navigator.geolocation.getCurrentPosition(showMap);
        navigator.geolocation.watchPosition(cambiarEstado,error,{
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0});
    }
    else $('#status')[0].textContent="Su navegador no soporta geolocalizacion";
});