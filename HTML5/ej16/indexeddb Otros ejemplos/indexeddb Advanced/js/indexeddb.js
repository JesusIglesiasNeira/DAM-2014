var tasks = {};

window.indexedDB = window.indexedDB || window.mozIndexedDB ||
                window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction ||
                window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange ||
                window.webkitIDBKeyRange || window.msIDBKeyRange;

tasks.indexedDB = {};
tasks.indexedDB.db = null;

tasks.indexedDB.onerror = function(e) {
    console.log(e);
};

tasks.indexedDB.open = function() {
    var version = 1;
    var request = indexedDB.open("todo-list", version);

    request.onupgradeneeded = function(e) {
        tasks.indexedDB.db = e.target.result;
        var db = tasks.indexedDB.db;
        if(db.objectStoreNames.contains("todo-list"))
                db.deleteObjectStore("todo-list");

        var store = db.createObjectStore("todo-list",
                    { keyPath: "timeStamp" });
    };

    request.onerror = tasks.indexedDB.onerror;

    request.onsuccess = function(e) {
        tasks.indexedDB.db = e.target.result;
        var db = tasks.indexedDB.db;

        tasks.indexedDB.getAllTodoItems();
    };
};

tasks.indexedDB.addTodo = function(todoText) {
    var db = tasks.indexedDB.db;

    var transaction = db.transaction(["todo-list"], "readwrite");
    var store = transaction.objectStore("todo-list");

    var data = {
        "text": todoText,
        "timeStamp": new Date().getTime()
    };

    var request = store.put(data);

    request.onsuccess = function(e) {
        console.log("Sucessful add: "+e);
    };

    request.onerror = function(e) {
        console.log("Error adding: ", e);
    };

    store.transaction.oncomplete = function(event) {
        tasks.indexedDB.getAllTodoItems();
    };
};

tasks.indexedDB.deleteTodo = function(id) {
    var db = tasks.indexedDB.db;

    var transaction = db.transaction(["todo-list"], "readwrite");
    var store = transaction.objectStore("todo-list");

    var request = store.delete(id);

    request.onsuccess = function(e) {
        console.log("Sucessful delete: "+e);
    };

    request.onerror = function(e) {
        console.log("Error deleting: ", e);
    };

    store.transaction.oncomplete = function(event) {
        tasks.indexedDB.getAllTodoItems();
    };
};

tasks.indexedDB.getAllTodoItems = function() {
    var todos = document.getElementById("todoItems");
    todos.innerHTML = "";

    var db = tasks.indexedDB.db;

    var transaction = db.transaction(["todo-list"]);
    var store = transaction.objectStore("todo-list");

    var cursorRequest = store.openCursor();

    cursorRequest.onsuccess = function(e) {
        var result = e.target.result;
        if(!!result == false) return;

        renderTodo(result.value);
        result.continue();
    };

    cursorRequest.onerror = tasks.indexedDB.onerror;
};

function renderTodo(row) {
    var todos = document.getElementById("todoItems");
    var li = document.createElement("li");
    var a = document.createElement("a");
    var t = document.createTextNode(row.text);

    a.addEventListener("click", function() {
        tasks.indexedDB.deleteTodo(row.timeStamp);
    }, false);

    a.textContent = " [Delete]";
    li.appendChild(t);
    li.appendChild(a);
    todos.appendChild(li);
}

function addTodo() {
    var todo = document.getElementById("todo");
    tasks.indexedDB.addTodo(todo.value);
    todo.value = "";
}

function init() {
    tasks.indexedDB.open();
}

window.addEventListener("DOMContentLoaded", init, false);
