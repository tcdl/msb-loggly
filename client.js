var _ = require('lodash');
var msbConfig = require('msb/lib/config');
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
  var baseTags = (process.env.MSB_LOGGLY_TAGS || '').split();
  var serviceName = _.get(msbConfig, 'serviceDetails.name');

  baseTags.push(serviceName);
  return _.uniq(baseTags);
};
