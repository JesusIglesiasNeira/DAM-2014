﻿(function(){
    "use strict";


    /////////////////////////////////////////////////////////////////////////////
    //Comprobaciones previas a abrir BD:
    window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
    if ('webkitIndexedDB' in window) {
        window.IDBTransaction = window.webkitIDBTransaction;
        window.IDBKeyRange = window.webkitIDBKeyRange;
    }

    var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    //Abrir la BBDD e insertar un almacen con 2 objetos
    var creaBD = function(){
        var request = indexedDB.open("BDTareas",1);
        var task=[
            {index:"1", date:"2010-10-08", completed:false, description:"Recoger la basura"},
            {index:"2", date:"2010-10-12", completed:true, description:"Limpiar el POLVO"}];

        request.onerror = function(e){
            alert('Something failed: ' + event.target.message);
        };
        request.onupgradeneeded = function(event) {
            console.log("UPDATING") ;
            var db = event.target.result;
            var objectStore = db.createObjectStore("almacenTareas",{keyPath:"index"});
            objectStore.createIndex("completed","completed",{unique:false});
            //objectStore.createIndex("completed","index",{unique:true});

            for(var i in task){
                objectStore.add(task[i]);
            }
        };
        request.onsuccess = function(e) {
            console.log("life is good:" + e) ;
        };
    };


    /////////////////////////////////////////////////////////////
    //Añadir objetos al almacen:
    var addupdatetask = function(){
        var request = indexedDB.open("BDTareas",1);
        var task=[
            {index:$('#index').val(), date:$('#date').val(), completed:$('#completed')[0].checked,
            description:$('#description').val()}];
        request.onerror = function(e){
            alert('Something failed: ' + event.target.message);
        };
        request.onupgradeneeded = function(event) {
            alert('onUpdateneeded not implemented on addupdatetask');

        };
        request.onsuccess = function(e) {
            var db = event.target.result;
            var trans = db.transaction(['almacenTareas'], "readwrite");
            var store = trans.objectStore("almacenTareas");
            var request = store.put(task[0]);

        };
    };




    //////////////////////////////////////////////////////////////////////////////
   // Eliminar todos los objetos del almacén
    var deleteAllTask = function(){
        var request = indexedDB.open("BDTareas",1);
        var key= $('#indexrem').val();
        request.onerror = function(e){
            alert('Something failed: ' + event.target.message);
        };
        request.onupgradeneeded = function(event) {
            alert('onUpdateneeded not implemented on deleteTask');

        };
        request.onsuccess = function(e) {
            var db = event.target.result;
            var trans = db.transaction(['almacenTareas'], "readwrite");
            var store = trans.objectStore("almacenTareas");
            request = store.clear(); //eliminar todos los objetos de un almacen
        };
    };
    //////////////////////////////////////////////////////////////////////////////
   // Eliminar objeto del almacén
    var deleteTask = function(){
        var request = indexedDB.open("BDTareas",1);
        var key= $('#indexrem').val();
        request.onerror = function(e){
            alert('Something failed: ' + event.target.message);
        };
        request.onupgradeneeded = function(event) {
            alert('onUpdateneeded not implemented on deleteTask');

        };
        request.onsuccess = function(e) {
            var db = event.target.result;
            var trans = db.transaction(['almacenTareas'], "readwrite");
            var store = trans.objectStore("almacenTareas");
            var request = store.delete(key);
        };
    };
    //////////////////////////////////////////////////////////////////////////////
   // Eliminar BD
    var deleteDB = function(){
        var request = indexedDB.deleteDatabase("BDTareas");
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    //Obtener objetos del almacen:
    var getTask = function(){
        var $ul = $('#task');
        $ul.empty();
        var data = [];
        var request = indexedDB.open("BDTareas",1);
        var key= $('#completedget')[0].checked;
        key = key.toString();
        request.onerror = function(e){
            alert('Something failed: ' + event.target.message);
        };
        request.onupgradeneeded = function(event) {
            alert('onUpdateneeded not implemented on deleteTask');
        };
        request.onsuccess = function(e) {
            var db = event.target.result;
            var trans = db.transaction(['almacenTareas'], "readwrite");
            //var store = trans.objectStore("almacenTareas").index('completed');
            var store = trans.objectStore("almacenTareas");
            //var keyRange = IDBKeyRange.only(key);
            //var req = store.openCursor(keyRange);
            var req = store.openCursor();
            req.onsuccess = function (event) {      //objetos de un almacen, en lugar de un unico objeto, pasando
                var cursor = event.target.result;       //como parametro un objeto de tipo IDBKeyRange
                if (cursor) {
                    data.push(cursor.value);    // value is the stored object
                    if (cursor.value.completed.toString() === key){
                        $ul.append('<li>'+
                                    " Completed: "+cursor.value.completed+
                                    " Date: "+cursor.value.date+
                                    " Description: "+cursor.value.desription+
                                    " Index: "+cursor.value.index+
                                    '</li>');
                    }
                    cursor.continue();   // get the next object
                }
            };
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
