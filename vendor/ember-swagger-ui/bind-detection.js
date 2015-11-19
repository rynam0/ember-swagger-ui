if (!Function.prototype.bind) {
  throw new Error('ember-swagger-ui requires `Function.prototype.bind`, ' +
    'but the browser being used does not include it.  ' +
    'Please either update your browser or install the ember-cli-es5-shim addon.');
}
