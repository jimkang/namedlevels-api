namedlevels-api
==================

This API serves up randomly generated old-school 1st Edition AD&D-style classes that have named levels.

Installation
------------

Clone this repo.

Then, create a `config.js` file in the project root that contains your [Wordnik API key](http://developer.wordnik.com/). Example:

    module.exports = {
      wordnikAPIKey: 'mkomniojnnuibiybvuytvutrctrxezewarewetxyfcftvuhbg'
    };

Usage
-----

    make run

Tests
-----

Run tests with `make test` and `make test-integration`.

License
-------

MIT.
