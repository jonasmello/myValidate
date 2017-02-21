# myValidate

Form validation with jQuery

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/jonasmello/myValidate/master/dist/myValidate.min.js
[max]: https://raw.github.com/jonasmello/myValidate/master/dist/myValidate.js
[example]: http://ekg.com.br/myValidate/

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/myValidate.min.js"></script>
<script>
jQuery(function($) {
  var myvalidate = $('.myValidate').myValidate({
    debug: false, // Enable / disable debugging plugin
    instance: true, // Returns an instance of the plugin
    removeData: true, // Remove existing instance (util for looping)
    error: "Some required fields are empty.", // Error message for empty field
    errorattach: "It is necessary to attach a file.", // Error message for file
    errormail: "Please enter a valid email address.", // Error message for email
    errorcpf: "CPF Inválido", // Error message for CPF
    errorcnpj: "CNPJ Inválido", // Error message for CNPJ
    erroequal: "Campos {0} e {1} não são iguais", // Error message for equal fields
    required: "required", // Parameter that defines whether the field is required
    notification: ".notification", // Class for notification
    errorcolor: "#F00", // Error color
    notdisabled: true, // Does not return fields with disabled
    bind: 'keyup change',
    changeBackground: true,
    backgrounds: [
        ['#cc0000', '#FFF'],
        ['#cc3333', '#FFF'],
        ['#cc6666', '#FFF'],
        ['#ff9999', '#FFF'],
        ['#e0941c', '#FFF'],
        ['#e8a53a', '#FFF'],
        ['#eab259', '#FFF'],
        ['#efd09e', '#FFF'],
        ['#ccffcc', '#FFF'],
        ['#66cc66', '#FFF'],
        ['#339933', '#FFF'],
        ['#006600', '#FFF'],
        ['#105610', '#FFF']
    ],
    passwordValidFrom: 60, // 60%
    onValidatePassword: function(percentage) {
      if (this.debug) {
        console.log(percentage);
      }
    },
    onPasswordStrengthChanged: function(passwordStrength, percentage) {
      if (this.debug) {
        console.log(passwordStrength, percentage);
      }
    },
    // Function performed before validation
    beforeValidate: function() {},
    // Function executed when error occurred
    callError: function(event, el, status) {
      if (this.debug) {
        console.log(event, el, status);
      }
      el.find('.notification').slideDown();
    },
    // Function performed when there is no error
    callSuccess: function(event, el, status) {
      if (this.debug) {
        console.log(event, el, status);
      }
    }
  });

  // Reset myValidate to fetch dynamic elements
  myvalidate.reset();
});
</script>
```

## Documentation
_(Coming soon)_

## Examples
```javascript
$(function () {
    $('form').myValidate();
});
```
```html
<form action="" class="myValidate">
  <div class="notification" style="display: none;"></div>
  <label>
    <span class="label-txt">Name:</span>
    <input type="text" name="name" class="txt-field" data-myrules="required">
  </label>
  <label>
    <span class="label-txt">E-mail:</span>
    <input type="text" name="email" class="txt-field" data-myrules="required|email">
  </label>
  <label>
    <span class="label-txt">Doc:</span>
    <input type="text" name="doc" class="txt-field" data-myrules="doc">
  </label>
  <label>
    <span class="label-txt">Password:</span>
    <input type="password" name="password" title="Password" class="txt-field" data-myrules="required">
    <span class="label-txt">Password Confirm:</span>
    <input type="password" name="password_confirmation" title="Password Confirm" class="txt-field" data-myrules="required|equal[password]">
  </label>
  <input type="submit" value="Send">
</form>
```

Online example: [myValidate][example]

## Release History

* **v2.5** - 2017-01-30
   - Add option class to custom error

* **v2.4.1** - 2017-01-30
   - Fix bug ```validatePassword```

* **v2.4.0** - 2017-01-20
   - Add ```validatePassword```
   - Fix bug data-myrules empty

* **v2.3.0** - 2017-01-09
   - Add removeData
   - Add reset $rules
   - Fix bug disabled fields

* **v2.2.4** - 2016-12-29
   - Fix bug select2 remove class error

* **v2.2.3** - 2016-12-29
   - Fix bug ```validateSelect```

* **v2.2.2** - 2016-11-25
   - Fix bug ```this.options.debug```

* **v2.2.1** - 2016-10-31
   - Fix bug select2

* **v2.2.0** - 2015-04-08
   - Add ```validateDoc```
   - Add file .editorconfig
   - Fix bug erroequal

* **v2.1.0** - 2013-11-02
   - Checking information with ```[data-myrules]```
   - Add option ```notdisabled``` returns fields with 'disable'
   - Add ```isRequired``` check fields with 'required'
   - Fix bug ```validateEqual```

* **v2.0.0** - 2013-11-02
   - Changing structure for use grunt and facilitate implementation

* **v1.0.1** - 2013-11-02
   - Fix bug ```validarCPF``` and add ```validarCNPJ```

* **v1.0.0** - 2013-9-29
   - Initial release.
