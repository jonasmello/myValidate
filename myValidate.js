/*
 *  Project: myValidate
 *  Description: Este plugin foi criado com o intuito de simplificar o processo de validação de formulários via jQuery.
 *  Author: Jonas Mello
 *  License:
 */
var callbackSubmit = false;
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {
        // undefined is used here as the undefined global variable in ECMAScript 3 is
        // mutable (ie. it can be changed by someone else). undefined isn't really being
        // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
        // can no longer be modified.
        // window and document are passed through as local variable rather than global
        // as this (slightly) quickens the resolution process and can be more efficiently
        // minified (especially when both are regularly referenced in your plugin).
        // Create the defaults once
        var pluginName = "myValidate",
            defaults = {
            error: "Some required fields are empty.",
            errorattach: "It is necessary to attach a file.",
            errormail: "Please enter a valid email address.",
            errorcpf: "CPF Inválido",
            erroequal: "Campos %s não são iguais",
            required: "required",
            notification: ".notification",
            errorcolor: "#F00",
            beforeValidate : function() {
            },
            callError : function($form){
                console.log($form);
                $form.find('.notification').slideDown();
            },
            callSuccess : function($form){
                callbackSubmit = true;
                $form.submit();
            }
        };
        // The actual plugin constructor
        function Plugin ( element, options ) {
                this.element = element;
                // jQuery has an extend method which merges the contents of two or
                // more objects, storing the result in the first object. The first object
                // is generally empty as we don't want to alter the default options for
                // future instances of the plugin
                this.settings = $.extend( {}, defaults, options );
                this._defaults = defaults;
                this._name = pluginName;
                this.init();
        }
        Plugin.prototype = {
                init: function () {
                        // Place initialization logic here
                        // You already have access to the DOM element and
                        // the options via the instance, e.g. this.element
                        // and this.settings
                        // you can add more functions like the one below and
                        // call them like so: this.yourOtherFunction(this.element, this.settings).
/*########################################################################################################################*/
/*########################################################################################################################*/
/*########################################################################################################################*/
                    function validarCPF(cpf) {
                        var add, i, rev;
                            cpf = cpf.replace(/[^\d]+/g,'');
                            if(cpf === '') { return false; }
                            // Elimina CPFs invalidos conhecidos
                            if (cpf.length !== 11 ||
                                    cpf === "00000000000" ||
                                    cpf === "11111111111" ||
                                    cpf === "22222222222" ||
                                    cpf === "33333333333" ||
                                    cpf === "44444444444" ||
                                    cpf === "55555555555" ||
                                    cpf === "66666666666" ||
                                    cpf === "77777777777" ||
                                    cpf === "88888888888" ||
                                    cpf === "99999999999") {
                                    return false;
                            }
                            // Valida 1o digito
                            add = 0;
                            for (i=0; i < 9; i = i + 1) {
                                    add += parseInt(cpf.charAt(i), 10) * (10 - i);
                            }
                            rev = 11 - (add % 11);
                            if (rev === 10 || rev === 11) {
                                    rev = 0;
                            }
                            if (rev !== parseInt(cpf.charAt(9), 10)) {
                                    return false;
                            }
                            // Valida 2o digito
                            add = 0;
                            for (i = 0; i < 10; i = i + 1) {
                                    add += parseInt(cpf.charAt(i), 10) * (11 - i);
                            }
                            rev = 11 - (add % 11);
                            if (rev === 10 || rev === 11) {
                                    rev = 0;
                            }
                            if (rev !== parseInt(cpf.charAt(10), 10)) {
                                    return false;
                            }
                            return true;
                    }
                    var my = this,
                        noValidate = false;
                    $(this.element).submit(function(event) {
                        var $form = $(this);
                        if (!callbackSubmit){
                            event.preventDefault();
                            noValidate = false;
                            var error = $form.data('error') ? $form.data('error') : my.settings.error,
                                errormail = $form.data('errormail') ? $form.data('errormail') : my.settings.errormail,
                                errorattach = $form.data('errorattach') ? $form.data('errorattach') : my.settings.errorattach,
                                errorcpf = $form.data('errorcpf') ? $form.data('errorcpf') : my.settings.errorcpf,
                                erroequal = $form.data('erroequal') ? $form.data('erroequal') : my.settings.erroequal;
                            my.settings.beforeValidate($form);
                            var $requireds = $(this).find('[data-myrules^="'+my.settings.required+'"]');
                            $(this).find('*').removeClass('error');
                            $requireds.each(function(){
                                var $this = $(this);
                                if($this.val() === ''){
                                    noValidate = true;
                                    $(my.settings.notification).html(error);
                                    $this.addClass('error');
                                    if($this.is('input[type="file"]')){
                                        $this.parent().addClass('error')
                                        .find('.label')
                                        .addClass('error');
                                        noValidate = true;
                                        $(my.settings.notification).html(errorattach);
                                    }
                                }else if($this.filter('[data-myrules*="email"]').length){
                                        var expressao_regular = /^[\d\w]+([_.-]?[\d\w]+)*@([\d\w_-]{2,}(\.){1})+?[\d\w]{2,4}$/;
                                        if(!expressao_regular.test($this.val())){
                                            noValidate = true;
                                                $(my.settings.notification).html(errormail);
                                                $this.addClass('error');
                                        }
                                }else if($this.filter('[data-myrules*="cpf"]').length){
                                    if(!validarCPF($this.val())){
                                        noValidate = true;
                                            $(my.settings.notification).html(errorcpf);
                                            $this.addClass('error');
                                    }
                                }else if($this.is('select')&&$this.val()==(''||0)){
                                    noValidate = true;
                                    $(my.settings.notification).html(error);
                                    $this
                                        .next('.chzn-container')
                                        .addClass('error');
                                }else if($this.is('input[type="checkbox"]') && !$this.is('input:checked')){
                                    $this.parent().addClass('error');
                                    noValidate = true;
                                    $(my.settings.notification).html(errormail);
                                }else if($this.filter('[data-myrules*="equal"]').length) {
                                    var n_pos = $this.data('myrules').search("equal"),
                                        compare = $this.data('myrules').slice(n_pos);
                                    compare = compare.replace('equal[', '');
                                    compare = compare.replace(']', '');
                                    if($('[name="'+compare+'"]').val() != $this.val()) {
                                        noValidate = true;
                                        $(my.settings.notification).html(erroequal);
                                        $this.addClass('error');
                                        $('[name="'+compare+'"]').addClass('error');
                                    }
                                }
                            });
                            if (noValidate){
                                my.settings.callError($form);
                            }else{
                                my.settings.callSuccess($form);
                            }
                        }
                    });
/*########################################################################################################################*/
/*########################################################################################################################*/
/*########################################################################################################################*/
                },
                yourOtherFunction: function () {
                        // some logic
                }
        };
        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[ pluginName ] = function ( options ) {
                return this.each(function() {
                        if ( !$.data( this, "plugin_" + pluginName ) ) {
                                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                        }
                });
        };
})( jQuery, window, document );
