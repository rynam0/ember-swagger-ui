/* jshint node: true */
'use strict';

module.exports = {
  normalizeEntityName: function() {},

  beforeInstall: function(options) {
    return this.addBowerPackagesToProject([
      { name: 'swagger-ui', target: '~2.2.10' },
      { name: 'jquery-migrate', target: '1.2.1' }
    ]);
  }
};
