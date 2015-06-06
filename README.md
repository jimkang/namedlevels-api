namedlevels-api
==================

This API serves randomly generated old-school 1st Edition AD&D-style classes that have named levels. [Here's a client of it.](http://jimkang.com/namedlevels/#/class/server)

Installation
------------

Clone this repo.

Then, create a `config.js` file in the project root that contains your [Wordnik API key](http://developer.wordnik.com/). Example:

    module.exports = {
      wordnikAPIKey: 'mkomniojnnuibiybvuytvutrctrxezewarewetxyfcftvuhbg'
    };

In a parallel directory, install [level-cache-server](https://github.com/jimkang/level-cache-server) and configure it to run on port 4444. (Or pick something different and update `cached-named-levels-class.js` accordingly.)

Usage
-----

    make start

Tests
-----

Run tests with `make test`.

License
-------

MIT.
