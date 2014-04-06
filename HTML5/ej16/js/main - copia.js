(function(){
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
        var db = null , version = '0.1';
        var request = window.indexedDB.open('BDTareas',version);
        request.onsuccess = function (event) {
            db = event.target.result; // onsuccess recive un evento con estas propiedades.
            if (version != db.version) { // Necesario control de versiones:
                /*var verRequest = db.setVersion(version);  // set the version to 0.1 YA NO EXISTE
                verRequest.onsuccess = function (event) {
                    var store = db.createObjectStore('almacenTareas', { // crear almacen Objetos
                        keyPath: 'index',           // clave única xa los objetos del almacen
                        autoIncrement: true        // autoincrementada
                    });
                };
                verRequest.onerror = function () {
                    alert('unable to set the version :' + version);
                };*/
            }
        };
        request.onerror = function (event) { //En IndexedDB, los errores que se producen escalan hasta el objeto request
            alert('Something failed: ' + event.target.message);
        };
        request.onupgradeneeded = function(event) { // unico lugar que deberiamos poner las consultas que
            var db = event.target.result;   //modifiquen la estructura de la base de datos
            var store = db.createObjectStore('almacenTareas', { // crear almacen Objetos
                        keyPath: 'index',           // clave única xa los objetos del almacen
                        autoIncrement: true        // autoincrementada
                    });
        };
        window.indexedDB.close('BDTareas');
    };

    var deleteDB = function(){
        var request = window.indexedDB.deleteDatabase('BDTareas');
    };


    /////////////////////////////////////////////////////////////
    //Añadir objetos al almacen:
    var addupdatetask = function(){
        var request = window.indexedDB.open('BDTareas');
        request.onsuccess = function (event) {
            db = event.target.result;
            var task = {
                'index': $('#index').val(),
                'date': $('#date').val(),
                'completed': $('#completed').checked(),
                'description': $('#description').val(),
            };
            var myIDBTransaction = window.IDBTransaction || window.webkitIDBTransaction  || { READ_WRITE: 'readwrite' };
            var transaction = db.transaction(['almacenTareas'], myIDBTransaction.READ_WRITE); //Crea una nueva transaccion de lectura/escritura, sobre los almacenes indicados
            var store = transaction.objectStore('almacenTareas'); // Obtiene el almacen de objetos sobre el que queremos realizar las operaciones
            //var request = store.add(video); //add: anade un nuevo objeto al almacen. Es obligatorio que los nuevos datos no existan en el almacen, si no provocaria un ConstraintError
            var request = store.put(task);// put: actualiza el valor del objeto si existe, o lo anade si no existe en el almacen.
        };
         request.onerror = function (event) { //En IndexedDB, los errores que se producen escalan hasta el objeto request
            alert('Something failed: ' + event.target.message);
        };
         request.onupgradeneeded = function (event) { //En IndexedDB, los errores que se producen escalan hasta el objeto request
            alert('Something failed: ' + event.target.message);
        };
    };

    //////////////////////////////////////////////////////////////////////////////
   // Eliminar todos los objetos del almacén
    var deleteAllTask = function(){
        var myIDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || { READ_WRITE: 'readwrite' };
        var transaction = db.transaction(['blockbusters'], myIDBTransaction.READ_WRITE);
        var store = transaction.objectStore('blockbusters');
        request = store.clear(); //eliminar todos los objetos de un almacen
    };
    //////////////////////////////////////////////////////////////////////////////
   // Eliminar objeto del almacén
    var deleteTask = function(){
        var myIDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || { READ_WRITE: 'readwrite' };
        var transaction = db.transaction(['blockbusters'], myIDBTransaction.READ_WRITE);
        var store = transaction.objectStore('blockbusters');
        var request = store.delete($('#indexrem').val());
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    //Obtener objetos del almacen:
    var getTask = function(){
        var myIDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || { READ: 'read' };
        var key = "Belly Dance Bruce - Final Strike";
        var transaction = db.transaction(['almacenTareas'], myIDBTransaction.READ);
        var store = transaction.objectStore('almacenTareas');
        var data = [ ];
        var request = store.openCursor();
        request.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                data.push(cursor.value);    // value is the stored object
                cursor.continue();   // get the next object
            }
        };
    };





    $(document).on('click','#borra',deleteAllTask);
    $(document).on('click','#addtask',addupdatetask);
    $(document).on('click','#deletetask',deleteTask);
    $(document).on('click','#updatetask',addupdatetask);
    $(document).on('click','#getTask',getTask);
    $(document).on('click','#create',creaBD);
    $(document).on('click','#delete',deleteDB);

})();


/*
Crear un objeto que encapsule una base de datos IndexedDB, que nos permita acceder
a una base de datos para añadir, modificar, eliminar y obtener registros. Dicha base de
datos va a almacenar una sencilla lista de tareas pendientes. Los requisitos son:
✔ Disponer de un almacén de tareas pendientes. Sus propiedades son: un
identificador único que actúa como índice, el texto descriptivo, una propiedad que
nos indique si la tarea está completada o no y la fecha/hora de creación
✔ Crear un método addTask que dado un objeto que corresponde con una tarea, lo
almacene en la base de datos
✔ Crear un método removeTask que dado un identificador de una tarea, lo elimine de
la base de datos. Éste método debe devolver la eliminada.
✔ Crear un método updateTask que dado un identificador de una tarea, actualice los
datos correspondientes a la tarea en la base de datos
✔ Crear un método getTasks que dado un parámetro booleano completado,
nos devuelva las tareas que se encuentran completadas o no
*/
