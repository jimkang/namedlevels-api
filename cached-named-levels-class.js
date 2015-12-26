var getNamedLevelsClass = require('./named-levels-class');
var level = require('level');
var callNextTick = require('call-next-tick');

var db = level(
  __dirname + '/data/named-levels-classes.db',
  {
    keyEncoding: 'json',
    valueEncoding: 'json'
  }
);

function cachedGetNamedLevelsClass(opts, done) {
  db.get(opts, checkGet);

  function checkGet(error, profile) {
    if (error && error.type === 'NotFoundError') {
      getNamedLevelsClass(opts, saveResult);
    }
    else if (error) {
      done(error);
    }
    else {
      done(error, profile);
    }
  }

  function saveResult(error, profile) {
    if (error) {
      done(error);
    }
    else {
      db.put(opts, profile, passProfile);
    }

    function passProfile(error) {
      if (error) {
        done(error);
      }
      else {
        done(error, profile);
      }
    }
  }
}

module.exports = cachedGetNamedLevelsClass;
