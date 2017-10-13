/* jshint node: true */
'use strict';

module.exports = {
  normalizeEntityName: function() {},

  beforeInstall: function(options) {
    return this.addAddonsToProject({
      packages: [
        { name: 'ember-browserify', target: '^1.2.0' },
        { name: 'swagger-ui-dist', target: '^3.3.1' }
      ]
    });
  }
};
