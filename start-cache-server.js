var multilevelCacheTools = require('multilevel-cache-tools');

var port = 4848;

multilevelCacheTools.server.create(
  {
    dbPath: 'data/namedlevels-cache.db',
    port: port
  },
  reportStarted
);

function reportStarted(error) {
  if (error) {
    console.log('Error while trying to start cache server:', error, error.stack);
  }
  else {
    console.log('namedlevels cache started at port:', port);
  }
}
