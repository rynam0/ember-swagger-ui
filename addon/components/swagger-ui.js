import Ember from 'ember';
import layout from '../templates/components/swagger-ui';

export default Ember.Component.extend({
  layout: layout,

  classNames: ['swagger-section'],

  /* Supported Component properties */
  url: null,
  apiKey: null,
  title: null,

  _swaggerUi: null,

  didInsertElement() {
    this._initSwaggerUi();
  },


  _initSwaggerUi() {
    let that = this;
    let url = this.get('url') || 'http://petstore.swagger.io/v2/swagger.json';

    that._translate();

    let swaggerUi = new SwaggerUi({
      url: url,
      validatorUrl: null,
      dom_id: 'swagger-ui-container',
      docExpansion: 'list',
      apisSorter: 'alpha',
      showRequestHeaders: true,
      supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
      onComplete: function() {
        that._translate();
        // todo: initOAuth
        that._addApiKeyAuthorization();
        that._highlight();
      },
      onFailure: function() {
        console.log('Failed to load SwaggerUi');
      }
    });
    this.set('_swaggerUi', swaggerUi);

    let keyInput = this.$('#input_apiKey');
    keyInput.change(this._addApiKeyAuthorization);
    keyInput.val(this.get('apiKey'));

    swaggerUi.load();
  },

  _translate() {
    if(window.SwaggerTranslator) {
      window.SwaggerTranslator.translate();
    }
  },

  _addApiKeyAuthorization() {
    var key = encodeURIComponent(this.$('#input_apiKey')[0].value);
    if(key && key.trim() !== "") {
      let authKeyHeader = new SwaggerClient.ApiKeyAuthorization("Authorization", "Bearer " + key, "header");
      this.get('_swaggerUi').api.clientAuthorizations.add("Authorization", authKeyHeader);
    }
  },

  _highlight() {
    this.$('pre code').each(function(i, e) {
       hljs.highlightBlock(e);
    });
  }

});
