    window.$= Element.prototype.$ =function(selector){
        var that = (this instanceof Element) ? this : document;
        var elems = that.querySelectorAll(selector);
        return(elems.length === 1) ? elems[0] : elems;
    };



var validador = (function(){

    var validaRequired = function(entrada){
        var exp = /^((\w+)(\s*)(\w+))*$/;
        return exp.test(entrada);
    };
    var validaEmail = function(entrada){
        var email = /^(\w+)((\.|_|-)(\w+))*@(\w+)(\.\w{2,})+$/;
        return email.test(entrada);
    };

    var validaPassword = function(entrada){
        var pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        return pwd.test(entrada);
    };

    var validaArea = function(entrada){
        return entrada.length <= 50;
    };

    return {
        required : validaRequired,
        email : validaEmail,
        password : validaPassword,
        min : validaArea
    };




})();


