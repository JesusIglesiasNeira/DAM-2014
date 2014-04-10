$(document).ready(function() {
    // Calcular posición



    function showMap(position) {
        var mapcanvas = document.createElement('div');
        mapcanvas.id = 'mapcanvas';
        mapcanvas.style.height = '200px';
        mapcanvas.style.width = '280px';

        document.querySelector('article').appendChild(mapcanvas);

        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var latlng1 = new google.maps.LatLng("43.03", "3.00");
        var latlng2 = new google.maps.LatLng("41.14", "1.48");
        var latlng3 = new google.maps.LatLng("42.22", "-1.00");

        var myOptions = {
            zoom: 4,
            center: latlng,
            mapTypeControl: false,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "¡Pitufo bromista!"
        });
        var marker1 = new google.maps.Marker({
            position: latlng1,
            map: map,
            title: "¡Pitufina!"
        });
        var marker2 = new google.maps.Marker({
            position: latlng2,
            map: map,
            title: "¡Papa Pitufo!"
        });
        var marker3 = new google.maps.Marker({
            position: latlng3,
            map: map,
            title: "¡Pitufo cocinero!"
        });

    }

    var error = (function(position) {

        $('#pitumap').append('<div data-role="popup" id="popupBasic"><a href="#" data-rel="back" data-role="button" data-theme="b" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a><p>Ha ocurrido un error<p></div>');
    });


    if(Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(showMap,error,{
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0});
        /*navigator.geolocation.watchPosition(showMap,error,{
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0});*/
    }
    else {
        $('#pitumap').append('<div data-role="popup" id="popupBasic"><a href="#" data-rel="back" data-role="button" data-theme="b" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a><p>Lo lamentamos pero su navegador no soporta geolocalizacion<p></div>');
    }

});