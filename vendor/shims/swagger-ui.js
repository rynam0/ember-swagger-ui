(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': {
        SwaggerUIBundle: self['SwaggerUIBundle'],
        SwaggerUIStandalonePreset: self['SwaggerUIStandalonePreset']
      },
      __esModule: true,
    };
  }

  define('swagger-ui', [], vendorModule);
})();
