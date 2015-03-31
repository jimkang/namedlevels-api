var test = require('tape');
var getNamedLevelsClass = require('../named-levels-class');

test('getNamedLevelsClass test', function basicTest(t) {
  t.plan(6);

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
    t.equal(classProfile.hitDie, 10, 'Returns a hit die type.');
    t.equal(classProfile.startingHD, 1, 'Returns the number of starting HD.');
    t.ok(Array.isArray(classProfile.levelNames), 'Return array of level names');
  }
});
