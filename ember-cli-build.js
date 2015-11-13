/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });



  // app.import(app.bowerDirectory + '/swagger-ui/dist/lib/highlight.7.3.pack.js', { exports: { 'hljs': ['default']}});
  // app.import(app.bowerDirectory + '/swagger-ui/dist/lib/marked.js');
  // app.import(app.bowerDirectory + '/swagger-ui/dist/lib/jquery-1.8.0.min.js');
  // app.import(app.bowerDirectory + '/swagger-ui/dist/lib/jquery.ba-bbq.min.js');
  // app.import(app.bowerDirectory + '/swagger-ui/dist/lib/underscore-min.js', { exports: { 'underscore-min': [ 'default' ] } });
  // app.import(app.bowerDirectory + '/swagger-ui/dist/lib/handlebars-2.0.0.js');
  // app.import(app.bowerDirectory + '/swagger-ui/dist/lib/backbone-min.js');
  // app.import(app.bowerDirectory + '/swagger-ui/dist/swagger-ui.js');

  // app.import(app.bowerDirectory + '/swagger-ui/dist/css/print.css');
  // app.import(app.bowerDirectory + '/swagger-ui/dist/css/reset.css');
  // app.import(app.bowerDirectory + '/swagger-ui/dist/css/screen.css');
  // app.import(app.bowerDirectory + '/swagger-ui/dist/css/style.css');
  // app.import(app.bowerDirectory + '/swagger-ui/dist/css/typography.css');


  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
