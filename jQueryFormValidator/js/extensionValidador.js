(function($){
    $.fn.extensionValidador= function(){


    ///////////////////////////////////////////////////////
    var validaRequired = function(entrada){
        var exp = /^((\w+)(\s*)(\w+))+$/;
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

    var validaChecked = function(entrada){
        return entrada.checked;
    };
    //////////////////////////////////////////////////////////


        return this.filter('form').each(function(){
            var $this = $(this);
            var $inputs = $this.find('input');

            var $required = $this.find('[data-validator = required]');
            console.log($this);
            $(document).on('blur', '[data-validator = "required"]',validaRequired);
            $(document).on('blur', '[data-validator = email]',validaEmail);
            $(document).on('blur', '[data-validator = password]',validaPassword);
            $(document).on('blur', '[data-validator = min]',validaArea);
            $(document).on('blur', '[data-validator = password]',validaChecked);






        });

    };
})(jQuery);



$('form').extensionValidador();

