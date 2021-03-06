var test = require('tape');
var getNamedLevelsClass = require('../named-levels-class');

test('getNamedLevelsClass test', function basicTest(t) {
  t.plan(7);

  var opts = {
    base: 'office worker'
  };

  getNamedLevelsClass(opts, checkResult);

  function checkResult(error, classProfile) {
    t.ok(!error, 'Completes without error.');
    if (error) {
      console.log('error:', error);
    }
    t.equal(classProfile.className, 'Office Worker', 'Returns a className.');
    t.equal(classProfile.pluralOfName, 'Office Workers', 'Returns plural.');
    t.equal(classProfile.hitDie, 4, 'Returns a hit die type.');
    t.equal(classProfile.startingHD, 1, 'Returns the number of starting HD.');
    t.ok(Array.isArray(classProfile.levelNames), 'Return array of level names');
    t.equal(
      classProfile.gainsHDForever,
      false,
      'Returns whether HD go on forever.'
    );
  }
});

test('Preserve periods', function periods(t) {
  t.plan(2);

  var opts = {
    base: 'Dr. Wily'
  };

  getNamedLevelsClass(opts, checkResult);

  function checkResult(error, classProfile) {
    t.ok(!error, 'Completes without error.');
    if (error) {
      console.log('error:', error);
    }
    t.equal(classProfile.className, 'Dr. Wily', 'Returns a className.');
  }
});

test('Singularize className', function singularClassName(t) {
  t.plan(2);

  var opts = {
    base: 'credits'
  };

  getNamedLevelsClass(opts, checkResult);

  function checkResult(error, classProfile) {
    t.ok(!error, 'Completes without error.');
    if (error) {
      console.log('error:', error);
    }
    t.equal(classProfile.className, 'Credit', 'Returns a singular className.');
  }
});
