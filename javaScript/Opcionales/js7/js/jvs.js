//Función autoejecutable
//Función autoejecutable
(function(){
    'use strict';

    var detallar = function(arr){
      for (var i = 0; i<= arr.length-1; i++ ){
        console.log( arr[i]+" ");
      }
    };


    function persona (nombre, edad, genero, obtenerDetalles) {
      this.nombre = nombre || '';
      this.edad = edad || 0;
      this.genero = genero || 'femenino';
      this.obtenerDetalles= detallar([this.nombre,this.edad,this.genero]);   //console.log( this.nombre+" "+ this.edad+" "+this.genero);
    }

    function estudiante (nombre, edad, genero, curso, grupo,registrar) {
      this.base= persona;
      this.base(nombre, edad, genero);
      this.curso =  curso || 1;
      this.grupo= grupo || 'A';
      this.registrar= detallar([this.curso,this.grupo,'------------']);
    }

    function profesor (nombre, edad, genero, asignatura, nivel) {
      this.base= persona;
      this.asignatura = asignatura;
      this.base(nombre, edad, genero);
      this.nivel= nivel;
      this.asignar= detallar([this.asignatura,this.nivel],'------------');
    }



  var yo = new persona("Yosu",19,'masculino');
  var yo = new estudiante("Marcos",18,'masculino',3,'C');
  var yo = new profesor("Flora",68,'femenino','mates','Nivel bajo');




})();



