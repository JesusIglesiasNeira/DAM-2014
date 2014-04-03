$(document).ready(function() {
    // Calcular posición
    //navigator.geolocation.getCurrentPosition(showMap);
    navigator.geolocation.watchPosition(cambiarEstado);


    function cambiarEstado(position){
        var aa = $('#status');
        $('#status')[0].textContent= "Finalizado";
        showMap(position);
    }

    function showMap(position) {
        alert("latitud: "+position.coords.latitude+" Longitud: "+position.coords.longitude+" Precision "+position.coords.accuracy);
        alert("altitud: "+position.coords.altitude+" Precision "+position.coords.altitudeAccuracy);
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
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            enableHighAccuracy: true,
            timeout: 2000,
        };
        var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "¡Usted está aquí!"
        });
        console.log("latitud: "+position.coords.latitude+" Longitud: "+position.coords.longitude+" Precision "+position.coords.accuracy);
        console.log("altitud: "+position.coords.altitude+" Precision "+position.coords.altitudeAccuracy);


    }
});