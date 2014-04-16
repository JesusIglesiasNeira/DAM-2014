var App = App||{};
App.programaIDB = (function(){
    'use strict';
    var version = 1;
    window.indexedDB = window.indexedDB || window.mozIndexedDB ||
                    window.webkitIndexedDB || window.msIndexedDB;

    window.IDBTransaction = window.IDBTransaction ||
                    window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange ||
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
            console.log("DB opened");
            var transaction = db.transaction(["programa"], "readwrite");
            var store = transaction.objectStore("programa");
            var data = {
                "programa": prog,
                "idProg": id
            };
            var request = store.put(data);
            request.onsuccess = function(e) {
                console.log("Sucessful add: "+e);
            };
            request.onerror = function(e) {
                console.log("Error adding: ", e);
            };
        };

    }

    function getProg() {
        var request = indexedDB.open("programa", version);
        request.onerror = onerror;
        request.onsuccess = function(e) {
            var transaction = db.transaction(["programa"]);
            var store = transaction.objectStore("programa");
            var cursorRequest = store.openCursor();
            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;
                if(result) {
                    console.log("Programa obtenido: "+result.value);
                    App.main.obtenjuego(result.value);
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
            add : addProg,
            get : getProg,
            initDB : initDB
        };

})();