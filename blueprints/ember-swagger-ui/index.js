/* jshint node: true */
'use strict';

module.exports = {
  normalizeEntityName: function() {},

  beforeInstall: function(/*options*/) {
    return this.addPackageToProject('swagger-ui-dist', '^4.5.0');
  }
};
