$(function(){


    //Ejercicio 3.8.1
    var $divs= $('div.module');
    console.log($divs);
    console.log($divs[0]);
    console.log(" ");


    //Seleccionar el 3º elem de la lista
    var $li = $('#myList li').eq(2);//seleccionando el 3º elemento de la lista
    console.log($li[0]);
    $li = $('#myList').find('li').eq(2);//por busqueda
    console.log($li[0]);
    $li = $('#myList li:nth-child(3)');//por css
    console.log($li[0]);
    $li = $('#myListItem');  //por id(directo, el mejor)
    console.log($li[0]);
    console.log(" ");


    //seleccionar el label mas cercano al imput
    var $inp = $('[name="q"]');
    var $lab =  $inp.closest('form')
                .find('label[for="'+$inp.attr('name')+'"]');
    console.log($lab);
    console.log(" ");


    //Elementos de la pag ocultos
    var $ocultos = $(':hidden');
    console.log($ocultos);
    console.log(" ");

    //imagenes con atributo alt
    var $img = $('img[alt]');
    console.log($img);
    console.log(" ");


    //filas impares del cuerpo de la tabla
    //var $imp = $('tbody tr:odd').css('background-color', 'gray');
    //console.log($imp);
    //console.log(" ");



    //Ejercicio 3.8.2 Recorrer el dom//////////////////////////////////////////////////////////////////////
    //Seleccionar todas las imagenes de la pagina index y mostrar por consola el atributo alt de cada una
    var $img2 = $('img[alt]');
    $img2.each(function(idx,el){
        console.log($(el).attr('alt'));
    });

    /*$img2.each(function(idx,el){
        console.log(el.alt);
    });

    $img2.each(function(idx,el){
        console.log(this.alt);
    });

    for(var i= $img2.length -1; i>=0; i++){
        console.log($img2[i].alt);
    }


    */
    console.log(" ");



    //Seleccionar el elemento input, luego dirigirse hacia el formulario y añadirle una clase al mismo.
    var $formul = $('input').closest('form');
    $formul.each(function(idx,elem){
        $(elem).addClass('miclase');
    });
    console.log($formul);
    console.log(" ");

    //Seleccionar el ítem que posee la clase "current" dentro de la lista #myList y remover dicha clase en el elemento;
    //luego añadir la clase "current" al siguiente ítem de la lista.

    var $curr = $('#myList li.current');
    $curr.removeClass('current');
    $curr.next('#myList li').addClass('current');

    console.log($curr);
    console.log(" ");


    //Seleccionar el elemento select dentro de #specials; luego dirigirse hacia el botón submit.
    var $selec = $('#specials select');
    var $formu = $selec.closest('form');
    var $subm = $formu.find('input[type=submit]');

    console.log($subm);
    console.log(" ");


    //Seleccionar el primer ítem de la lista en el elemento #slideshow;
    //añadirle la clase "current" al mismo y luego añadir la clase "disabled" a los elementos hermanos.
    var $item = $('#slideshow li:first-child');
    $item.addClass('current');
    $item.siblings().addClass('disabled');
    /* $('#slideshow li:first-child').$item.addClass('current').$item.sibilings().addClass('disabled')*/



    //Ejercicio 3.8.2 Manipulación//////////////////////////////////////////////////////////////////////
    //Añadir 5 nuevos ítems al final de la lista desordenada #myList.
    var arr =[];
    for(var i = 0; i<=4; i++){
        arr.push('<li>List item '+(i+8)+'</li>');
    }
    var cadena = arr.join("");
    $(cadena).appendTo($('#myList'));


    //Remover los ítems impares de la lista.
   //$('#myList li:even').remove();


   //Añadir otro elemento h2 y otro párrafo al último div.module.
   $('div.module:last').append('<h2>LorenIpsun</h2>')
                        .append('<p>LorenIpsun</p>');


   //Añadir otra opción al elemento select; darle a la opción añadida el valor "Wednesday".

   //$('select[name=day]').append('<option value="wednesday">Wednesday</option>');

   var opt = new Option('Wednesday','wednesday');
   $('select[name=day]')[0].options.add(opt);

   //Añadir un nuevo div.module a la página después del último;
   //luego añadir una copia de una de las imágenes existentes dentro del nuevo div.
   var $div = $('div.module').last();
   var $nuevo = $('<div/>', {
        'class':'module',
        'id': 'myModule'
   });
   $nuevo.append($img.first().clone()).insertAfter($div);



});