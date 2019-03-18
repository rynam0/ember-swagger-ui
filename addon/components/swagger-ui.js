import Component from '@ember/component';
import Swag from 'swagger-ui';

const {
  SwaggerUIBundle
} = Swag;

export default Component.extend({
  classNames: ['swagger-ui', 'component-swagger-ui'],

  didInsertElement() {
    this._super(...arguments);

    let config = this.get('config') || { deepLinking: false };
    let merged = Object.assign({}, config);
    if (!merged.dom_id) {
      merged.dom_id = `#${this.get('elementId')}`;
    }

    SwaggerUIBundle(merged);
  }
});
