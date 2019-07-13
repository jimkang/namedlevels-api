var test = require('tape');
var getCachedNamedLevelsClass = require('../cached-named-levels-class');

test('getCachedNamedLevelsClass test', function basicTest(t) {
  var runCount = 0;
  var checksPerRun = 7;
  var numberOfTimesToRun = 4;

  t.plan(checksPerRun * numberOfTimesToRun);

  var opts = {
    base: 'office worker'
  };

  getCachedNamedLevelsClass(opts, checkResult);

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

    runCount += 1;

    if (runCount < numberOfTimesToRun) {
      getCachedNamedLevelsClass(opts, checkResult);
    }
  }
});
