var levelnamer = require('levelnamer');
var createProbable = require('probable').createProbable;
var seedrandom = require('seedrandom');
var config = require('./config');
var changeCase = require('change-case');
var canonicalizer = require('canonicalizer');

var hdTypeChances = {
  2: 2,
  3: 3,
  4: 8,
  6: 10,
  8: 10,
  10: 9,
  12: 4,
  20: 1
};

function getNamedLevelsClass(opts, done) {
  var base;

  if (opts) {
    base = opts.base;
  }

  if (!base) {
    throw new Error('Base not given to getNamedLevelsClass.');
  }

  var probable = createProbable({
    random: seedrandom(base)
  });

  totalLevels = 12 + probable.roll(12);

  var hdTypeTable = probable.createRangeTableFromDict(hdTypeChances);

  var names = levelnamer.getNamedLevels(
    {
      word: base,
      totalLevels: totalLevels,
      config: config
    },
    buildProfileWithLevels
  );

  function buildProfileWithLevels(error, levelNames) {
    if (error) {
      done(error);
    }
    else {
      var pluralForm = canonicalizer.getSingularAndPluralForms(base)[1];

      var profile = {
        className: changeCase.titleCase(base),
        pluralOfName: changeCase.titleCase(pluralForm),
        levelNames: levelNames,
        hitDie: parseInt(hdTypeTable.roll(), 10),
        startingHD: probable.roll(7) === 0 ? 2 : 1,
        gainsHDForever: probable.roll(5) === 0
      };
      done(error, profile);
    }
  }
}


module.exports = getNamedLevelsClass;
