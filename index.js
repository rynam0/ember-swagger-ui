/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-swagger-ui',

  included: function(app) {
    this._super.included(app);
    app.import('node_modules/swagger-ui-dist/swagger-ui.css');
  }
};
