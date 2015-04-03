var levelnamer = require('levelnamer');
var createProbable = require('probable').createProbable;
var seedrandom = require('seedrandom');
var config = require('./config');
var canonicalizer = require('canonicalizer');
var toTitleCase = require('titlecase');

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

var bonusStartingHDRollsForHdTypes = {
  2: 9,
  3: 9,
  4: 6,
  6: 8,
  8: 7,
  10: 12,
  12: 20,
  20: 30
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
      var hitDie = parseInt(hdTypeTable.roll(), 10);
      var startingHD = 1;
      var dieForBonusStartingHD = bonusStartingHDRollsForHdTypes[hitDie];
      if (probable.roll(dieForBonusStartingHD) === 0) {
        startingHD = probable.roll(4) === 0 ? 3 : 2;
      }

      var profile = {
        className: toTitleCase(base),
        pluralOfName: toTitleCase(pluralForm),
        levelNames: levelNames,
        hitDie: hitDie,
        startingHD: startingHD,
        gainsHDForever: probable.roll(5) === 0
      };
      done(error, profile);
    }
  }
}


module.exports = getNamedLevelsClass;
