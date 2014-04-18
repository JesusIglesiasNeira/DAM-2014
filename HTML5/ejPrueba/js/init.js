$(function(){
        //Inicializar la BBDD donde se almacenará el programa
        App.programaIDB.initDB();
        //Obtener el programa
        App.ajax.getprograma();
});
