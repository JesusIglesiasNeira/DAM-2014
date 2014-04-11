$(function () {
    "use strict";

    // Obtener los elementos del DOM

    // Mi color asignado por el servidor
    var myColor = false;
    // Mi nick
    var myName = false;

    var abierto= false;

    // Comprobar la disponibilidad de Web Socket en el navegador
    if (!Modernizr.websockets) {
        console.log("su nav no acepta websocket");
        return false;
    }

    window.WebSocket = window.WebSocket || window.MozWebSocket;


    var socket = new WebSocket ('ws://www.arkaitzgarro.com:1337');
    socket.onerror= function(e){
        console.log(e);
    };
    var enviar = function(){
        if (!myName){//enviar nick
            myName = $('input')[0].value;
            if(myName && myName.length>0){
                socket.send(myName);
                console.log("abierto");
                 $("#status").text(myName);
            }
        }
        else{//enviar mensaje
             var msg = $('input')[0].value;
            if(msg && msg.length>0){
                socket.send(msg);
            }
        }
    };
    socket.onopen= function(e){
            abierto= true;
            $("input").attr("disabled",false);
        };

    socket.onmessage= function(e){
        var data = e.data;
        var mensaje = JSON.parse(data);
        if (mensaje.type == "color"){
            myColor= mensaje.data;
        }
        else if (mensaje.type == "history"){
            for (var i in mensaje.data){
                var dat = mensaje.data[i].time;
                addMessage(mensaje.data[i].author, mensaje.data[i].text, mensaje.data[i].color,new Date(dat));
            }
        }
        else if (mensaje.type == "message"){
            addMessage(mensaje.data.author, mensaje.data.text, mensaje.data.color, new Date(mensaje.data.time));
        }
    };

    socket.onclose= function(e){console.log("cerrado");abierto=false;};

     $('#enviar').on('click', enviar);

    // Abrir la conexion con ws://www.arkaitzgarro.com:1337
    // 1. Al abrir la conexión, solicitar el nick.
    // 2. Controlar posibles errores del servidor.
    // 3. Escucar los mensajes del servidor, y mostrarlos en el elemento "content"
    // 4. La estructura del objeto enviado por el servidor es la siguiente:
    //      {
    //          // Contiene el tipo de mensaje recibido
    //          type : @string in ['color', 'history', 'message'],
    //          // Contiene los datos según el tipo de mensaje recibido
    //          data: @Object {author, text, color, time}
    //      }
    // 5. Enviar un mensaje al pulsar enter. El mensaje enviado es únicamente la cadena de caracteres.

    /**
     * Añadir el mensaje a la ventana de chat
     */
    function addMessage(author, message, color, dt) {
        content.prepend('<p><span style="color:' + color + '">' + author + '</span> @ ' +
             + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
             + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
             + ': ' + message + '</p>');
    }
});