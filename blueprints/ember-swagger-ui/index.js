/* jshint node: true */
'use strict';

module.exports = {
  normalizeEntityName: function() {},

  beforeInstall: function(options) {
    return this.addAddonToProject({
      name: 'ember-browserify',
      target: '^1.2.0'
    }).then(() => {
      return this.addPackageToProject('swagger-ui-dist', '^3.9.2');
    });
  }
};
