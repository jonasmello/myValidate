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
<form class="myValidate">
<div class="notification" style="display: none;"></div>
  <label>
    <span class="label-txt">Name:</span>
    <input type="text" name="name" class="txt-field" data-myrules="required">
  </label>
  <label>
    <span class="label-txt">E-mail:</span>
    <input type="text" name="email" class="txt-field" data-myrules="required|email">
  </label>
  <input type="submit" value="Send">
</form>
```

Online example: [myValidate][example]

## Release History

* **v1.0.1** - 2013-11-02
   - Fix bug ```validarCPF``` and add ```validarCNPJ```

* **v1.0.0** - 2013-9-29
   - Initial release.
