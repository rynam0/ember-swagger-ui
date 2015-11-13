'use strict';

module.exports = function(environment/* environment, appConfig */) {
  var ENV = {
    contentSecurityPolicy: {
        'default-src': "'none'",
        'script-src': "'self'",
        'font-src': "'self'",
        'connect-src': "'self' localhost:49152",
        'img-src': "'self'",
        'style-src': "'self' 'unsafe-inline'",
        'media-src': "'self'"
      }
  };
};
