/* jshint node: true */
'use strict';

module.exports = {
  normalizeEntityName: function() {},

  beforeInstall: function(options) {
    var that = this;
    return that.addBowerPackageToProject('swagger-ui', '~2.1.3').then(function() {
      that.addBowerPackageToProject('underscore', '~1.8.3');
    });

  }
};
