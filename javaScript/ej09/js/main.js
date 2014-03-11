    window.$= Element.prototype.$ =function(selector){
        var that = (this instanceof Element) ? this : document;
        var elems = that.querySelectorAll(selector);
        return(elems.length === 1) ? elems[0] : elems;
    };



var anade = (function(){


    //Validación de fechas
    "use strict";
    var fecha = /([0][1-9]|[1-2][0-9]|30|31)\/([0][1-9]|[1][0-2])\/\d{4}/;

    console.log("Naci en Donosti el 30/05/2007"+ fecha.test("Naci en Donosti el 30/05/2007"));
    console.log("Naci en Donosti el 05/04/2007"+ fecha.test("Naci en Donosti el 05/04/2007"));
    console.log("Naci en Donosti el 30/30/2007"+ fecha.test("Naci en Donosti el 30/30/2007"));
    console.log("Naci en Donosti el 32/05/07"+ fecha.test("Naci en Donosti el 32/05/07"));
    console.log("Naci en Donosti el 30/05/2007"+ fecha.test("Naci en Donosti el 30/05/2007"));
        //obtener del texto
    console.log("Naci en Donosti el 30/05/2007".match(fecha));


    //validación de e-mail
    var email = /^(\w+)((\.|_|-)(\w+))*@(\w+)(\.\w{2,})+$/;
    console.log("marine@gmail.com  "+ email.test("marine@gmail.com"));
    console.log(".marine@gmail.com  "+ email.test(".marine@gmail.com"));
    console.log("mar785ne@gmail.com  "+ email.test("mar785ne@gmail.com"));
    console.log("marine@gm3il.com  "+ email.test("marine@gm3il.com"));
    console.log("marine@gmail.com.es  "+ email.test("marine@gmail.com.es"));
    console.log("mar..ine@gmail.com.es  "+ email.test("mari..ne@gmail.com.es"));
    console.log("mar.ine@gmail.com.es  "+ email.test("mari.ne@gmail.com.es"));

    //Eliminar etiquetas javascript
    var tags =/<\s*script[\s\S]*?>,*?<\/[\s\S]*?script[\s\S]*?>/ig;


})();




