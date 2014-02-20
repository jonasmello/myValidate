# myValidate

Form validation with jQuery

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/jonasmello/myValidate/master/dist/myValidate.min.js
[max]: https://raw.github.com/jonasmello/myValidate/master/dist/myValidate.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/myValidate.min.js"></script>
<script>
jQuery(function($) {
  $('form').myValidate();
});
</script>
```

## Documentation
_(Coming soon)_

## Examples
```
$(function () {
    $('form').myValidate();
});
```

## Release History

* **v1.0.1** - 2013-11-02
   - Fix bug ```validarCPF``` and add ```validarCNPJ``

* **v1.0.0** - 2013-9-29
   - Initial release.
