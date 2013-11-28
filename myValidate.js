/*
 *  Project: myValidate
 *  Description: Este plugin foi criado com o intuito de simplificar o processo de validação de formulários via jQuery.
 *  Author: Jonas Mello
 *  License: MIT
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
            errorcnpj: "CNPJ Inválido",
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
                    function validarCPF(doc) {
                        'use strict';
                        var i, cpf = doc.replace(/\D/g, ''), pattern = /^(\d{1})\1{10}$/, sum, mod, digit;

                        if (cpf.length !== 11) {
                            return false;
                        }
                        if (pattern.test(cpf)) {
                            return false;
                        }
                        sum = 0;
                        for (i = 0; i < 9; i += 1) {
                            sum += parseInt(cpf.charAt(i), 10) * (10 - i);
                        }
                        mod = sum % 11;
                        digit = (mod > 1) ? (11 - mod) : 0;
                        if (parseInt(cpf.charAt(9), 10) !== digit) {
                            return false;
                        }
                        sum = 0;
                        for (i = 0; i < 10; i += 1) {
                            sum += parseInt(cpf.charAt(i), 10) * (11 - i);
                        }
                        mod = sum % 11;
                        digit = (mod > 1) ? (11 - mod) : 0;
                        if (parseInt(cpf.charAt(10), 10) !== digit) {
                            return false;
                        }
                        return true;
                    }
                    function validarCNPJ(doc) {
                        'use strict';
                        var i, cnpj = doc.replace(/\D/g, ''), pattern = /^(\d{1})\1{13}$/, soma, multiplicador, digitoUm, digitoDois;
                        if (cnpj.length !== 14) {
                            return false;
                        }
                        if (pattern.test(cnpj)) {
                            return false;
                        }
                        soma = 0;
                        for (i = 0; i < 12; i += 1) {
                            /** verifica qual é o multiplicador. Caso o valor do caracter seja entre 0-3, diminui o valor do caracter por 5
                            * caso for entre 4-11, diminui por 13 **/
                            multiplicador = (i <= 3 ? 5 : 13) - i;

                            soma += parseInt(cnpj.charAt(i), 10) * multiplicador;
                        }
                        soma = soma % 11;
                        if (soma === 0  || soma === 1) {
                            digitoUm = 0;
                        } else {
                            digitoUm = 11 - soma;
                        }
                        if (parseInt(digitoUm, 10) === parseInt(cnpj.charAt(12), 10)) {
                            soma = 0;

                            for (i = 0; i < 13; i += 1) {
                                /** verifica qual é o multiplicador. Caso o valor do caracter seja entre 0-4, diminui o valor do caracter por 6
                                 * caso for entre 4-12, diminui por 14 **/
                                multiplicador = (i <= 4 ? 6 : 14) - i;
                                soma += parseInt(cnpj.charAt(i), 10) * multiplicador;
                            }
                            soma = soma % 11;
                            if (soma === 0 || soma === 1) {
                                digitoDois = 0;
                            } else {
                                digitoDois = 11 - soma;
                            }
                            if (digitoDois === parseInt(cnpj.charAt(13))) {
                                return true;
                            }
                        }
                        return false;
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
                                errorcnpj = $form.data('errorcnpj') ? $form.data('errorcnpj') : my.settings.errorcnpj,
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
                                }else if($this.filter('[data-myrules*="cnpj"]').length){
                                    if(!validarCNPJ($this.val())){
                                        noValidate = true;
                                            $(my.settings.notification).html(errorcnpj);
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
