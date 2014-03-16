//Función autoejecutable
var mensaje=(function(){
    'use strict';

    var valores = [true, 5, false, "hola", "adios", 2];

    var textos = [];
    var booleanos = [];
    var nums = [];
    var mayor= "";

    //Determinar y agrupar tipo de objeto
    for (var i = 0; i<= valores.length-1; i++){
        if (typeof(valores[i])=='string'){
           textos.push(valores[i]);
           if (valores[i].length > mayor.length){
            mayor = valores[i];
           }
        }
        else if (typeof(valores[i])=='boolean'){
           booleanos.push(valores[i]);
        }
        else{
             nums.push(valores[i]);
        }

    }
    //Determinar cual de los dos elementos de texto es mayor
    console.log("Elementos de texto: "+textos);
    console.log("El elemento de mayor tamaño es: "+mayor);
    console.log('\n');
    //Utilizando exclusivamente los dos valores booleanos del array, determinar los
    //operadores necesarios para obtener un resultado true y otro resultado false
    console.log("Elementos de booleanos: "+booleanos);
    var resultadobooleano = booleanos[0] && booleanos[1];
    console.log("Opreción AND: "+ resultadobooleano);
    resultadobooleano = booleanos[0] || booleanos[1];
    console.log("Opreción OR: "+ resultadobooleano);
    console.log('\n');
    //Determinar el resultado de las cinco operaciones matemáticas realizadas con los dos elementos numéricos
    console.log("Elementos numericos: "+nums);
    var resultadonums = nums[0]+nums[1];
    console.log("Resultado de la suma: "+resultadonums);
    resultadonums = nums[0]-nums[1];
    console.log("Resultado de la resta: "+resultadonums);
    resultadonums = nums[0]*nums[1];
    console.log("Resultado de la multiplicacion: "+resultadonums);
    resultadonums = nums[0]/nums[1];
    console.log("Resultado de la division: "+resultadonums);
    resultadonums = nums[0]%nums[1];
    console.log("Resultado del mod: "+resultadonums);
    console.log('\n');





    return mensaje;
})();