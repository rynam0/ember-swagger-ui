import Ember from 'ember';
import layout from '../templates/components/swagger-ui';
import Swag from 'npm:swagger-ui-dist';

const { Component } = Ember;
const { SwaggerUIBundle } = Swag;

export default Component.extend({
  layout,

  classNames: ['swagger-ui', 'component-swagger-ui'],

  didInsertElement() {
    this._super(...arguments);

    let config = Ember.copy(this.get('config') || { deepLinking: false });
    if (!config.dom_id) {
      config.dom_id = `#${this.get('elementId')}`;
    }

    SwaggerUIBundle(config);
  }
});
