var getNamedLevelsClass = require('./named-levels-class');
var multilevelCacheTools = require('multilevel-cache-tools');

var memoizedFn = multilevelCacheTools.client.memoize({
  fn: getNamedLevelsClass,
  port: 4848
});

module.exports = memoizedFn;
