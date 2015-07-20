'use strict';
var msb = require('msb');
var formatter = require('./formatter');

if (process.env.MSB_LOGGLY_SUBDOMAIN && process.env.MSB_LOGGLY_TOKEN) {
  var client = require('./client');

  msb.plugins.http2busMiddleware = function(route) {
    return function(req, res, next) {
      var startedAt = new Date();

      function afterResponse() {
        client.log(formatter.http(startedAt, req, res));
      }

      res.once('close', afterResponse);
      res.once('finish', afterResponse);

      next();
    };
  };

  process.once('uncaughtException', function(err) {
    var formattedErr = formatter.exception(err);

    client.log(formattedErr, function(err) {
      if (err) throw err;

      process.exit(1);
    });
  });
} else {
  process.once('uncaughtException', function(err) {
    throw err;
  });
}

module.exports = msb;
