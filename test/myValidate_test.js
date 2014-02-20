(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#myValidate', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('form');
    }
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.myValidate(), this.elems, 'is element this equal.');
  });

  test('is myValidate', function() {
    expect(1);
    ok(1);
    //strictEqual(this.elems.awesome().text(), 'awesome0awesome1awesome2', 'should be awesome');
  });

}(jQuery));
