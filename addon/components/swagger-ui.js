import Ember from 'ember';
import layout from '../templates/components/swagger-ui';
import _ from 'lodash';

export default Ember.Component.extend({
  layout: layout,

  classNames: ['swagger-section'],

  /**
   * Store the original pushState function in order to restore it on willDestroyElement.
   */
  bbqPushState: Ember.$.bbq.pushState,

  handleLoginGlobal: window.handleLogin,

  didInsertElement() {
    this._initSwaggerUi();
  },

  willDestroyElement() {
    // restore the original pushState function
    Ember.$.bbq.pushState = this.get('bbqPushState');
  },

  _initSwaggerUi() {
    this._translate();

    let defaultOptions = {
      url: 'http://petstore.swagger.io/v2/swagger.json',
      docExpansion: 'none',
      dom_id: 'swagger-ui-container',
      supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
      showRequestHeaders: false,
      apisSorter: 'alpha',
      onComplete: (() => {
        this.defaultOnComplete();
      }),
      onFailure: (() => {
        this.defaultOnFailure();
      })
    };

    /* Supported Component properties */
    let propertyOptions = this.getProperties([
      'url',
      'docExpansion',
      'supportedSubmitMethods',
      'showRequestHeaders',
      'onComplete',
      'onFailure'
    ]);
    propertyOptions = _.omitBy(propertyOptions, _.isUndefined);

    // Options that are passed in from one object
    let swaggerOptions = this.getWithDefault('swaggerOptions', {});
    // Properties get highest priority followed by the object-based options and the defaults
    _.defaults(propertyOptions, swaggerOptions, defaultOptions);

    window.swaggerUi = new SwaggerUi(propertyOptions);
    window.swaggerUi.load();
  },

  defaultOnComplete () {
    if (typeof window.initOAuth === "function") {
      window.initOAuth({
        clientId: "your-client-id",
        clientSecret: "your-client-secret",
        realm: "your-realms",
        appName: "your-app-name",
        scopeSeparator: ","
      });
    }

    this._translate();
    this._addApiKeyAuthorization(this);
    this._highlight();

    // we need to no-op a jquery plugin function that routes us to index if not overridden.
    Ember.$.bbq.pushState = function() {};

    // move the generated dialog element to the component's element
    window.handleLogin = (() => {
      this.defaultHandleLogin();
    });

    // add change listener to apiKey input.
    let input = this.$('#input_apiKey');
    if (input) {
      input.change(this._addApiKeyAuthorization(this));
    }
  },

  defaultOnFailure () {
    console.log('Failed to load SwaggerUi');
  },

  defaultHandleLogin () {
    this.$('.api-popup-dialog').remove();
    this.handleLoginGlobal();
    Ember.run.later(() => {
      let dialog = Ember.$('.api-popup-dialog');
      this.$().append(dialog);
      dialog.css('display', 'block');
    }, 500);
  },

  _translate() {
    if (window.SwaggerTranslator) {
      window.SwaggerTranslator.translate();
    }
  },

  _addApiKeyAuthorization(ctx) {
    let authz = ctx.get('authorizations');
    if (authz) {
      if (authz.type === 'query') {
        Ember.$('#input_apiKey').val(authz.value);
      }

      var apiKeyAuth = new SwaggerClient.ApiKeyAuthorization(authz.name, authz.value, authz.type);
      window.swaggerUi.api.clientAuthorizations.add(authz.name, apiKeyAuth);
    }
  },

  /**
   * Highlights code blocks.
   */
  _highlight() {
    let codes = this.$('pre code');
    if (codes) {
      codes.each(function(i, e) {
         hljs.highlightBlock(e);
      });
    }
  }
});
