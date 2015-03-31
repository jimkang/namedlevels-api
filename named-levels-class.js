var levelnamer = require('levelnamer');
var createProbable = require('probable').createProbable;
var seedrandom = require('seedrandom');
var config = require('./config');
var changeCase = require('change-case');
var canonicalizer = require('canonicalizer');

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
        hitDie: probable.pickFromArray([2, 3, 4, 6, 8, 10, 12]),
        startingHD: probable.roll(7) === 0 ? 2 : 1
      };
      done(error, profile);
    }
  }
}


module.exports = getNamedLevelsClass;
