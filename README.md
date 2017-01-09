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
  $('.myValidate').myValidate();
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
