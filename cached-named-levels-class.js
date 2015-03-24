var getNamedLevelsClass = require('./named-levels-class');
var multilevelCacheTools = require('multilevel-cache-tools');

var memoizedFn = multilevelCacheTools.client.memoize({
  fn: getNamedLevelsClass,
  port: 4444
});

module.exports = memoizedFn;
