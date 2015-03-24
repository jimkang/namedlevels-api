var restify = require('restify');
var getNamedLevelsClass = require('./cached-named-levels-class');

function respond(req, res, next) {
  if (!req.params.name) {
    next(new restify.BadRequestError('Missing name parameter.'));
    return;
  }

  var opts = {
    base: req.params.name
  };

  getNamedLevelsClass(opts, renderResult);

  function renderResult(error, classProfile) {
    if (error) {
      next(error);
    }
    else {
      res.json(classProfile);
      next();
    }
  }
}

function respondHead(req, res, next) {
  res.writeHead(
    200, 
    {
      'content-type': 'application/json'
    }
  );
  res.end();
  next();
}

var server = restify.createServer();
server.get('/class/:name', respond);
server.head('/class/:name', respondHead);

server.listen(8080, function reportServerUp() {
  console.log('%s listening at %s', server.name, server.url);
});
