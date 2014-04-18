
    $( '#page3' ).on( 'pagecreate',function(event){

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











    //Otros Eventos
    /*$("#page1, #page2,#page3").bind( "pagebeforecreate", function( event ) {
        alert("pagebeforecreate");
    });
    $("#page1, #page2,#page3").bind( "pagebeforeload", function( event ) {//No Func
        console.log("antes de cargar");
        alert("antes de cargar");
    });
    $("#page1, #page2,#page3").bind( "pagecontainerload", function( event ) {//No Func
        alert("pagecontainerload");
    });
    $("#page1, #page2,#page3").bind( "pageloadfailed", function( event ) {//No Func
        alert("pageloadfailed");
    });
    $("#page1, #page2,#page3").bind( "pagebeforechange", function( event ) {
        alert("pagebeforechange");
    });
    $("#page1, #page2,#page3").bind( "pagechange", function( event ) {//No Func
        alert("pagechange");
    });
    $("#page1, #page2,#page3").bind( "pagechangefailed", function( event ) {//No Func
        alert("pagechangefailed");
    });
    $("#page1, #page2,#page3").bind( "pagebeforeshow", function( event ) {
        alert("pagebeforeshow");
    });
    $("#page1, #page2,#page3").bind( "pagebeforehide", function( event ) {
            alert("pagebeforehide");
        });
    $("#page1, #page2,#page3").bind( "pagehide", function( event ) {
            alert("pagehide");
        });
    $("#page1, #page2,#page3").bind( "pagecreate", function( event ) {
            alert("pagecreate");
        });
    $("#page1, #page2,#page3").bind( "pageinit", function( event ) {
            alert("pageinit");
        });
    $("#page1, #page2,#page3").bind( "pageremove", function( event ) {
            alert("pageremove");
        });
    $("#page1, #page2,#page3").bind( "updatelayout", function( event ) {
            alert("updatelayout");
        });


    $("#page1, #page2,#page3").bind( "tap", function( event ) {
        alert("tap");
    });
    $("#page1, #page2,#page3").bind( "taphold", function( event ) {
        console.log("taphold");
    });
    $("#page1, #page2,#page3").bind( "swipe", function( event ) {
        console.log("swipe");
    });
    $("#page1, #page2,#page3").bind( "swipeleft", function( event ) {
        console.log("swipeleft");
    });
    $("#page1, #page2,#page3").bind( "swiperight", function( event ) {
        console.log("swiperight");
    });
    $("#page1, #page2,#page3").bind( "vmouseover", function( event ) {
        console.log("vmouseover");
    });
    $("#page1, #page2,#page3").bind( "vmouseout", function( event ) {
        console.log("vmouseout");
    });
    $("#page1, #page2,#page3").bind( "vmousedown", function( event ) {
        console.log("vmousedown");
    });
    $("#page1, #page2,#page3").bind( "vmousemove", function( event ) {
        console.log("vmousemove");
    });
    $("#page1, #page2,#page3").bind( "vmouseup", function( event ) {
        console.log("vmouseup");
    });
    $("#page1, #page2,#page3").bind( "vclick", function( event ) {
        console.log("vclick");
    });
    $("#page1, #page2,#page3").bind( "vmousecancel", function( event ) {
        console.log("vmousecancel");
    });
    $("#page1, #page2,#page3").bind( "orientationchange", function( event ) {
        alert("Ha cambiado la orientacion");
    });
    $("#page1, #page2,#page3").bind( "scrollstart", function( event ) {
        console.log("scrollstart");
    });
    $("#page1, #page2,#page3").bind( "scrollstop", function( event ) {
        console.log("scrollstop");
    });

    $.mobile.changePage("#page3", { transition: "slideup"} );


*/


