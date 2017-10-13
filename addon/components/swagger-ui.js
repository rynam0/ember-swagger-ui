import Ember from 'ember';
import layout from '../templates/components/swagger-ui';

import Swag from 'npm:swagger-ui-dist';

const {
  Component
} = Ember;

const {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset
} = Swag;

export default Component.extend({
  layout,

  classNames: ['swagger-ui', 'component-swagger-ui'],

  didInsertElement() {
    this._super(...arguments);

    SwaggerUIBundle({
      url: "http://petstore.swagger.io/v2/swagger.json",
      dom_id: `#${this.get('elementId')}`,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout"
    });
  }
});
