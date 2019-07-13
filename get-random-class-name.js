var config = require('./config/config');
var createWordnok = require('wordnok').createWordnok;

var wordnok = createWordnok({
  apiKey: config.wordnikAPIKey
});

function getRandomClassName(done) {
  debugger
  wordnok.getRandomWords(
    {
      customParams: {
        includePartOfSpeech: '',
        limit: 1
      }
    },
    passFirstElement
  );

  function passFirstElement(error, words) {
    debugger
    if (error || words.length < 1) {
      done(error);
    }
    else {
      done(error, words[0]);
    }
  }
}

module.exports = getRandomClassName;
