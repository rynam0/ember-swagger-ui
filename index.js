/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-swagger-ui',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/swagger-ui/dist/fonts/droid-sans-v6-latin-700.eot', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/swagger-ui/dist/fonts/droid-sans-v6-latin-700.svg', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/swagger-ui/dist/fonts/droid-sans-v6-latin-700.ttf', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/swagger-ui/dist/fonts/droid-sans-v6-latin-700.woff', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/swagger-ui/dist/fonts/droid-sans-v6-latin-700.woff2', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/swagger-ui/dist/fonts/droid-sans-v6-latin-regular.eot', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/swagger-ui/dist/fonts/droid-sans-v6-latin-regular.svg', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/swagger-ui/dist/fonts/droid-sans-v6-latin-regular.ttf', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/swagger-ui/dist/fonts/droid-sans-v6-latin-regular.woff', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/swagger-ui/dist/fonts/droid-sans-v6-latin-regular.woff2', { destDir: 'fonts' });

    app.import(app.bowerDirectory + '/swagger-ui/dist/images/explorer_icons.png', { destDir: 'images' });
    app.import(app.bowerDirectory + '/swagger-ui/dist/images/throbber.gif', { destDir: 'images' });

    app.import(app.bowerDirectory + '/swagger-ui/dist/css/typography.css');
    app.import(app.bowerDirectory + '/swagger-ui/dist/css/reset.css');
    app.import(app.bowerDirectory + '/swagger-ui/dist/css/screen.css');

    app.import(app.bowerDirectory + '/swagger-ui/dist/lib/marked.js');
    app.import(app.bowerDirectory + '/swagger-ui/dist/lib/jquery-1.8.0.min.js');
    app.import(app.bowerDirectory + '/swagger-ui/dist/lib/jquery.ba-bbq.min.js');
    app.import(app.bowerDirectory + '/underscore/underscore-min.js', { exports: { 'underscore-min': [ 'default' ] } });
    app.import(app.bowerDirectory + '/swagger-ui/dist/lib/handlebars-2.0.0.js');
    app.import(app.bowerDirectory + '/swagger-ui/dist/lib/backbone-min.js');
    app.import(app.bowerDirectory + '/swagger-ui/dist/lib/highlight.7.3.pack.js', { exports: { 'hljs': ['default']}});
    app.import(app.bowerDirectory + '/swagger-ui/dist/swagger-ui.js');
  }
};
