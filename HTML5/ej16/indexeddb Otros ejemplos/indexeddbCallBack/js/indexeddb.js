var tasks = {};
tasks.indexedDB = {};
tasks.indexedDB.db = null;

//Get indexedDB objects
window.indexedDB = window.indexedDB || window.mozIndexedDB ||
            window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction ||
            window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange ||
            window.webkitIDBKeyRange || window.msIDBKeyRange;

//Common error function
tasks.indexedDB.onerror = function(e) {
    console.log(e);
};

//Open database
tasks.indexedDB.open = function(callback) {
    var version = 1;
    //Try open database
    var request = indexedDB.open("database", version);

    //Create database on upgrade
    request.onupgradeneeded = function(e) {
        tasks.indexedDB.db = e.target.result;
        var db = tasks.indexedDB.db;

        e.target.transaction.onerror = tasks.indexedDB.onerror;

        //Delete object store if exists
        if(db.objectStoreNames.contains("taskStore"))
            db.deleteObjectStore("taskStore");

        //Create object store
        var store = db.createObjectStore("taskStore",
                { keyPath: "timestamp" });
    };

    //On open database success
    request.onsuccess = function(e) {
        tasks.indexedDB.db = e.target.result;
        var db = tasks.indexedDB.db;

        //Execute callback on success
        callback();
    };

    //On error opening database
    request.onerror = tasks.indexedDB.onerror;
};

//Get all tasks from database
tasks.indexedDB.getAllTasks = function(callback) {
    var db = tasks.indexedDB.db;

    //Open transaction on database
    var transaction = db.transaction(["taskStore"]);
    var store = transaction.objectStore("taskStore");

    //Open Cursor
    var cursorRequest = store.openCursor();

    var arrayTasks = [];

    //On cursor success add task to array
    cursorRequest.onsuccess = function(e) {
        var result = e.target.result;
        if(!!result == false) return;

        arrayTasks.push(result.value);
        result.continue();
    };

    //On cursor error
    cursorRequest.onerror = tasks.indexedDB.onerror;

    // On transaction complete execute callback
    transaction.oncomplete = function(e) {
        callback(arrayTasks);
    };
};

//Add task to database
tasks.indexedDB.addTask = function(text, callback) {
    var db = tasks.indexedDB.db;

    //Open transaction on database
    var transaction = db.transaction(["taskStore"], "readwrite");
    var store = transaction.objectStore("taskStore");

    //Create object to put in database
    var data = {
        "text": text,
        "timestamp": new Date().getTime()
    };

    //Add or modify object
    var request = store.put(data);

    //On adding success
    request.onsuccess = function(e) {
        console.log("Sucessful add: "+e);
    };

    //On adding error
    request.onerror = tasks.indexedDB.onerror;

    //On transaction complete execute callback
    transaction.oncomplete = function(event) {
        callback();
    };
};

//Delete task from list
tasks.indexedDB.deleteTask = function(id, callback) {
    var db = tasks.indexedDB.db;

    //Open transaction on database
    var transaction = db.transaction(["taskStore"], "readwrite");
    var store = transaction.objectStore("taskStore");

    var request = store.delete(parseInt(id));
    //On deleting success
    request.onsuccess = function(e) {
        console.log("Sucessful delete: "+e);
    };

    //On deleting error
    request.onerror = tasks.indexedDB.onerror;

    //On transaction complete
    transaction.oncomplete = function(event) {
        callback();
    };
};

//Delete all tasks from store
tasks.indexedDB.cleanTasks = function(callback) {
    var db = tasks.indexedDB.db;

    //Open transaction on database
    var transaction = db.transaction(["taskStore"], "readwrite");
    var store = transaction.objectStore("taskStore");

    var request = store.clear();
    //On deleting success
    request.onsuccess = function(e) {
        console.log("Sucessful clean: "+e);
    };

    //On deleting error
    request.onerror = tasks.indexedDB.onerror;

    //On transaction complete
    transaction.oncomplete = function(event) {
        callback();
    };
};

//Show all tasks
function showTasks() {
    //Get all tasks from database, callback is rendering results
    tasks.indexedDB.getAllTasks(function(arrayTasks) {
        var elTasks = document.getElementById("tasks");
        elTasks.innerHTML = "";

        for(var i = 0; i < arrayTasks.length; i++) {
            var task = arrayTasks[i];

            var li = document.createElement("li");
            var a = document.createElement("a");
            var t = document.createTextNode(task.text);

            //On click delete task, callback is show all tasks
            a.addEventListener("click", function() {
                tasks.indexedDB.deleteTask(this.dataset.timestamp, showTasks);
            }, false);

            a.textContent = " -- [Delete task]";
            a.dataset.timestamp = task.timestamp;
            li.appendChild(t);
            li.appendChild(a);
            elTasks.appendChild(li);
        }
    });
}

//On button "Add" click
function addTask() {
    var task = document.getElementById("task");
    //Add new task to database, callback is show all tasks
    tasks.indexedDB.addTask(task.value, showTasks);
    task.value = "";
}

//On button "Clean" click
function cleanTasks() {
    var elTasks = document.getElementById("tasks");
    //Add new task to database, callback is show all tasks
    tasks.indexedDB.cleanTasks(showTasks);
}

//Init IndexedDB
function init() {
    //Open database, callback is show all tasks
    tasks.indexedDB.open(showTasks);
}

//On DOMContentLoaded init indexedDB
window.addEventListener("DOMContentLoaded", init, false);