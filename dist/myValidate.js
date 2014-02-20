/*! myValidate - v1.0.1 - 2014-02-20
* https://github.com/jonasmello/myValidate
* Copyright (c) 2014 Jonas Mello; Licensed MIT */
// o ponto-e-vírgula antes de invocar a função é uma prática segura contra scripts
// concatenados e/ou outros plugins que não foram fechados corretamente.
;(function($, window, undefined) {
  'use strict';
  // 'undefined' é usado aqui como a variável global 'undefined', no ECMAScript 3 é
  // mutável (ou seja, pode ser alterada por alguém). 'undefined' não está sendo
  // passado na verdade, assim podemos assegurar que o valor é realmente indefinido.
  // No ES5, 'undefined' não pode mais ser modificado.

  // 'window' e 'document' são passados como variáveis locais ao invés de globais,
  // assim aceleramos (ligeiramente) o processo de resolução e pode ser mais eficiente
  // quando minificado (especialmente quando ambos estão referenciados corretamente).
  //var document = window.document;

  // Collection method.
  $.fn.myValidate = function(options) {
    return this.each(function() {
      $.data(this, 'myValidate', new $.myValidate(this, options));
    });
  };

  // Static method.
  $.myValidate = function(element, options) {
    this.version = '1.3.1';
    this.el = element;
    this.callbackSubmit = false; // Utilizado para bloquear o submit do formulário
    this.options = $.extend({}, $.myValidate.options, options);
    this.$form = null;
    this.noValidate = false;

    this.debug('log', this.options);

    this.init();
  };

  // Static method default options.
  $.myValidate.options = {
      debug: false, // Ativa/desativa o debug do plugin
      error: "Some required fields are empty.", // Mensagem de erro para campo vazio
      errorattach: "It is necessary to attach a file.", // Mensagem de error para arquivo
      errormail: "Please enter a valid email address.", // Mensagem de error para e-mail
      errorcpf: "CPF Inválido", // Mensagem de erro para CPF
      errorcnpj: "CNPJ Inválido", // Mensagem de error para CNPJ
      erroequal: "Campos %s não são iguais", // Mensagem de error para campos iguais
      required: "required", // Parametro que define se o campo é obrigatório
      notification: ".notification", // class para notificação
      errorcolor: "#F00", // cor do erro
      // Função executada antes da validação
      beforeValidate : function() {
      },
      // Função executada quando ha erro
      callError : function($form){
          window.console.log($form);
          $form.find('.notification').slideDown();
      },
      // Função executada quando não ha erro
      callSuccess : function($form){
          this.callbackSubmit = true;
          $form.submit();
      }
  };

  $.myValidate.prototype.validarCPF = function(doc) {
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
  };

  $.myValidate.prototype.validarCNPJ = function(doc) {
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
        if (digitoDois === parseInt(cnpj.charAt(13), 10)) {
            return true;
        }
    }
    return false;
  };

  $.myValidate.prototype.init = function() {
    var self = this;

    $(this.element).submit(function(event) {
      self.$form = $(this);
      if (self.callbackSubmit) {
        event.preventDefault();
        self.noValidate = false;
        self.getErrorMessage();
        self.settings.beforeValidate(self.$form);
        self.getRequireds(this);
      }
    });

  };

  $.myValidate.prototype.getRequireds = function(el) {
    var self = this, $requireds = $(el).find('[data-myrules^="'+this.settings.required+'"]');
    $(el).find('*').removeClass('error');
    $requireds.each(function(){
      var $this = $(this);
      self.notVal($this);
      self.validateEmail($this);
      self.validateCpf($this);
      self.validateCnpj($this);
      self.validateSelect($this);
      self.validateCheckbox($this);
      self.validateEqual($this);
    });
    if (this.noValidate) {
        this.settings.callError(this.$form);
    } else {
        this.settings.callSuccess(this.$form);
    }
  };

  $.myValidate.prototype.notification = function(message) {
    $(this.settings.notification).html(message);
  };

  $.myValidate.prototype.getErrorMessage = function() {
    this.settings.error = this.$form.data('error') || this.settings.error;
    this.settings.errormail = this.$form.data('errormail') || this.settings.errormail;
    this.settings.errorattach = this.$form.data('errorattach') || this.settings.errorattach;
    this.settings.errorcpf = this.$form.data('errorcpf') || this.settings.errorcpf;
    this.settings.errorcnpj = this.$form.data('errorcnpj') || this.settings.errorcnpj;
    this.settings.erroequal = this.$form.data('erroequal') || this.settings.erroequal;
  };

  $.myValidate.prototype.notVal = function(field) {
    if (field.val() === '') {
        this.noValidate = true;
        this.notification(this.settings.error);
        field.addClass('error');
        this.notFile(field);
    }
  };

  $.myValidate.prototype.notFile = function(field) {
    if (field.is('input[type="file"]')) {
      this.notification(this.settings.errorattach);
      this.noValidate = true;
      field.parent().addClass('error')
           .find('.label')
           .addClass('error');
      this.notification(this.settings.errorattach);
    }
  };

  $.myValidate.prototype.validateEmail = function(field) {
    if (field.filter('[data-myrules*="email"]').length) {
      var expressao_regular = /^[\d\w]+([_.-]?[\d\w]+)*@([\d\w_-]{2,}(\.){1})+?[\d\w]{2,4}$/;
      if (!expressao_regular.test(field.val())) {
        this.noValidate = true;
        field.addClass('error');
        this.notification(this.settings.errormail);
      }
    }
  };

  $.myValidate.prototype.validateCpf = function(field) {
    if (field.filter('[data-myrules*="cpf"]').length) {
      if (!this.validarCPF(field.val())) {
        this.noValidate = true;
        field.addClass('error');
        this.notification(this.settings.errorcpf);
      }
    }
  };

  $.myValidate.prototype.validateCnpj = function(field) {
    if (field.filter('[data-myrules*="cnpj"]').length) {
      if (!this.validarCNPJ(field.val())) {
        this.noValidate = true;
        field.addClass('error');
        this.notification(this.settings.errorcnpj);
      }
    }
  };

  $.myValidate.prototype.validateSelect = function(field) {
    if (field.is('select') && field.val() === ('' || 0)) {
      this.noValidate = true;
      this.notification(this.settings.error);
      field.next('.chzn-container')
           .addClass('error');
    }
  };

  $.myValidate.prototype.validateCheckbox = function(field) {
    if (field.is('input[type="checkbox"]') && !field.is('input:checked')) {
      field.parent().addClass('error');
      this.noValidate = true;
      this.notification(this.settings.errormail);
    }
  };

  $.myValidate.prototype.validateEqual = function(field) {
    if (field.filter('[data-myrules*="equal"]').length) {
        var n_pos = field.data('myrules').search("equal"),
            compare = field.data('myrules').slice(n_pos);
        compare = compare.replace('equal[', '');
        compare = compare.replace(']', '');
        if ($('[name="'+compare+'"]').val() !== field.val()) {
            this.noValidate = true;
            this.notification(this.settings.erroequal);
            field.addClass('error');
            $('[name="'+compare+'"]').addClass('error');
        }
    }
  };

}(jQuery, window));
