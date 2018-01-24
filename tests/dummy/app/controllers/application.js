import Controller from '@ember/controller';
import Swag from 'npm:swagger-ui-dist';

const {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset
} = Swag;

export default Controller.extend({
  swaggerConfig: {
    url: 'http://petstore.swagger.io/v2/swagger.json',
    deepLinking: false,
    presets: [
      SwaggerUIStandalonePreset,
      SwaggerUIBundle.presets.apis,
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
    docExpansion: 'none',
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
    defaultModelsExpandDepth: -1,
    defaultModelExpandDepth: 1,
    validatorUrl: 'https://online.swagger.io/validator'
  }
});
