var App = App||{};
App.programaIDB = (function(){
    'use strict';
    var version = 1;
    if(!('indexedDB' in window)) {
         window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.oIndexedDB || window.msIndexedDB;
     }


    /*window.indexedDB = window.indexedDB || window.mozIndexedDB ||
                    window.webkitIndexedDB || window.msIndexedDB;*/

    window.IDBTransaction = window.IDBTransaction || window.mozIDBTransaction ||
                    window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange ||  window.mozIDBKeyRange ||
                    window.webkitIDBKeyRange || window.msIDBKeyRange;

    var db = null;

    function onerror(e) {
        console.log(e);
    }

    function openProg () {
        var request = indexedDB.open("programa", version);
        request.onupgradeneeded = function(e) {
            db = e.target.result;
            var store = db.createObjectStore("programa",
                        { keyPath: "idProg" });
        };
        request.onerror = onerror;
        request.onsuccess = function(e) {
            console.log("DB opened");
        };
    }

    function addProg (prog, id) {
        var request = indexedDB.open("programa", version);
        request.onerror = onerror;
        request.onsuccess = function(e) {
            db = e.target.result;
            var transaction = db.transaction(["programa"], "readwrite");
            var store = transaction.objectStore("programa");
            var data = {
                "programa": prog,
                "idProg": id
            };
            var request = store.put(data);
            request.onsuccess = function(e) {
                console.log("Sucessful add program: "+id);
            };
            request.onerror = function(e) {
                console.log("Error adding: ", e);
            };
        };

    }

    function getProg(todo) {
        var request = indexedDB.open("programa", version);
        request.onerror = onerror;
        request.onsuccess = function(e) {
            var transaction = db.transaction(["programa"]);
            var store = transaction.objectStore("programa");
            var cursorRequest = store.openCursor();
            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;
                if(result) {
                    if(todo === "sigJuego"){
                        console.log("Programa obtenido: "+result.value);
                        App.main.sigJuego(result.value);
                    }
                    else if(todo === "sigJugador"){
                        console.log("Programa obtenido: "+result.value);
                        App.main.sigJugador(result.value);
                    }
                }
            };
            cursorRequest.onerror = onerror;
        };
    }

    function initDB() {
        openProg();
    }

    //window.addEventListener("DOMContentLoaded", initDB, false);


     return{
            addProg : addProg,
            getProg : getProg,
            initDB : initDB
        };

})();