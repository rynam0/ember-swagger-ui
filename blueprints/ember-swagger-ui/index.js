/* jshint node: true */
'use strict';

module.exports = {
  normalizeEntityName: function() {},

  beforeInstall: function(options) {
    return this.addBowerPackagesToProject([
      // we want 3.3.1
      { name: 'swagger-ui', target: '~2.2.10' },
      { name: 'jquery-migrate', target: '1.2.1' }
    ]);
  }
};
