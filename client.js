var _ = require('lodash');
var serviceDetails = require('msb/lib/support/serviceDetails');
var loggly = require('loggly');
var client;

exports.log = function(message, cb) {
  exports._getClient().log(message, cb);
};

exports._getClient = function() {
  if (client) return client;

  client = loggly.createClient({
    subdomain: process.env.MSB_LOGGLY_SUBDOMAIN,
    token: process.env.MSB_LOGGLY_TOKEN,
    tags: exports._getTags(),
    json: true
  });

  return client;
};

exports._getTags = function() {
  var baseTags = _.filter((process.env.MSB_LOGGLY_TAGS || '').split());
  if (serviceDetails.name) baseTags.push(serviceDetails.name);
  return _.uniq(baseTags));
};
