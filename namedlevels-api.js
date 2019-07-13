#!/usr/bin/env node

var restify = require('restify');
var getNamedLevelsClass = require('./named-levels-class');
var getRandomClassName = require('./get-random-class-name');

function respond(req, res, next) {
  if (req.params.name) {
    respondWithClassForName(null, req.params.name);
  }
  else {
    getRandomClassName(respondWithClassForName);
  }

  function respondWithClassForName(error, name) {
    if (error || !name) {
      var message = 'Could not get name parameter.';
      if (error) {
        message = error.message;
      }
      next(new restify.InternalServerError(message));
      return;
    }

    var opts = {
      base: name
    };

    getNamedLevelsClass(opts, renderResult);
  }

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
server.use(restify.CORS());

server.get('/class/:name', respond);
server.head('/class/:name', respondHead);

server.listen(8080, function reportServerUp() {
  console.log('%s listening at %s', server.name, server.url);
});
