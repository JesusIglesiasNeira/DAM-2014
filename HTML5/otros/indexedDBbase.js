$(document).ready(function(){
    "use strict";

    /////////////////////////////////////////////////////////////////////////////
    //Comprobaciones previas a abrir BD:
    window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
    if ('webkitIndexedDB' in window) {
        window.IDBTransaction = window.webkitIDBTransaction;
        window.IDBKeyRange = window.webkitIDBKeyRange;
    }

    //////////////////////////////////////////////////////////////////////////////////////
    //Abrir BD (si no existe se crea)(las llamadas son asincronas) y Crear almacén:
    var creaBD = function(){
        var db = null, version = '0.1';
        var request = window.indexedDB.open(MiDB);
        request.onsuccess = function (event) {
            db = event.target.result; // onsuccess recive un evento con estas propiedades.
            if (version != db.version) { // Necesario control de versiones:
                var verRequest = db.setVersion(version);  // set the version to 0.1
                verRequest.onsuccess = function (event) {
                    var store = db.createObjectStore('miAlmacen', { // crear almacen Objetos
                        keyPath: 'title',           // clave única xa los objetos del almacen
                        autoIncrement: false        // autoincrementada
                    });
                };
                verRequest.onerror = function () {
                    alert('unable to set the version :' + version);
                };
            }
        };
        request.onerror = function (event) { //En IndexedDB, los errores que se producen escalan hasta el objeto request
            alert('Something failed: ' + event.target.message);
        };
        request.onupgradeneeded = function(event) { // unico lugar que deberiamos poner las consultas que
            var db = event.target.result;   //modifiquen la estructura de la base de datos
            // Create object store
        };
        window.indexedDB.close(MiDB);
    };

    /////////////////////////////////////////////////////////////
    //Añadir objetos al almacen:
    var anadeObj = function(){
        var video = {
            title: "Belly Dance Bruce - Final Strike",
            date: (new Date()).getTime(),
            director: "Bruce Awesome",
            length: 169, // in minutes
            rating: 10,
            cover: "/images/wobble.jpg"
        };
        var myIDBTransaction = window.IDBTransaction || window.webkitIDBTransaction  || { READ_WRITE: 'readwrite' };
        var transaction = db.transaction(['miAlmacen'], myIDBTransaction.READ_WRITE); //Crea una nueva                          //transaccion de lectura/escritura, sobre los almacenes indicados
        var store = transaction.objectStore('miAlmacen'); // Obtiene el almacen de objetos sobre el que queremos realizar las
                                //operaciones
        //1ºopc) var request = store.add(video); //add: anade un nuevo objeto al almacen. Es obligatorio que los nuevos
                                                // datos no existan en el almacen, si no provocaria un ConstraintError
        var request = store.put(video);// put: actualiza el valor del objeto si existe, o lo anade si no existe en el almacen.
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    //Obtener objetos del almacen:
    var obtenObj = function(){
        var myIDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || { READ: 'read' };
        var key = "Belly Dance Bruce - Final Strike";
        var transaction = db.transaction(['miAlmacen'], myIDBTransaction.READ);
        var store = transaction.objectStore('miAlmacen');
        //1ºopc)var request = store.get(key); //Obtiene 1 elemento. Si no existe el obj devuelve null
        var data = [ ];
        var request = store.openCursor();//Es recomendable utilizar el metodo “openCursor()” para que si el objeto no existe, el valor del resultado sea null
        // var singleKeyRange = IDBKeyRange.only("Belly Dance Bruce - Final Strike");
        // var request = store.openCursor(singleKeyRange);  //El  metodo “openCursor” tambien permitira obtener todos los
        request.onsuccess = function (event) {      //objetos de un almacen, en lugar de un unico objeto, pasando
            var cursor = event.target.result;       //como parametro un objeto de tipo IDBKeyRange
            if (cursor) {
                data.push(cursor.value);    // value is the stored object
                cursor.continue();   // get the next object
            } else {//Objects are in data[ ]
            }
        };
    };


//////////////////////////////////////////////////////////////////////////////
   // Eliminar objetos del almacén
    var eliminar = function(){
        var myIDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || { READ_WRITE: 'readwrite' };
        var transaction = db.transaction(['blockbusters'], myIDBTransaction.READ_WRITE);
        var store = transaction.objectStore('blockbusters');
        var request = store.delete(key);
        request = store.clear(); //eliminar todos los objetos de un almacen
    };

});