import Ember from 'ember';
import layout from '../templates/components/swagger-ui';

export default Ember.Component.extend({
  layout: layout,

  classNames: ['swagger-section'],

  /**
   * Store the original pushState function in order to restore it on willDestroyElement.
   */
  bbqPushState: Ember.$.bbq.pushState,

  handleLoginGlobal: window.handleLogin,

  /* Supported Component properties */
  title: null,
  url: null,
  spec: null,
  docExpansion: 'none',
  showRequestHeaders: false,
  supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
  authorizations: null,
  onComplete: null,
  onFailure: null,

  didInsertElement() {
    this._initSwaggerUi();
  },

  willDestroyElement() {
    // restore the original pushState function
    Ember.$.bbq.pushState = this.get('bbqPushState');
  },


  _initSwaggerUi() {
    let that = this;
    let url = this.get('url') || 'http://petstore.swagger.io/v2/swagger.json';

    that._translate();

    window.swaggerUi = new SwaggerUi({
      url: url,
      spec: that.get('spec'),
      validatorUrl: null,
      dom_id: 'swagger-ui-container',
      docExpansion: that.get('docExpansion'),
      apisSorter: 'alpha',
      showRequestHeaders: that.get('showRequestHeaders'),
      supportedSubmitMethods: that.get('supportedSubmitMethods'),
      onComplete: this.get("onComplete") || function() {

        if(typeof window.initOAuth === "function") {
          window.initOAuth({
            clientId: "your-client-id",
            clientSecret: "your-client-secret",
            realm: "your-realms",
            appName: "your-app-name",
            scopeSeparator: ","
          });
        }

        that._translate();
        that._addApiKeyAuthorization(that);
        that._highlight();

        // we need to no-op a jquery plugin function that routes us to index if not overridden.
        Ember.$.bbq.pushState = function() { };

        // move the generated dialog element to the component's element
        window.handleLogin = function() {
          that.$('.api-popup-dialog').remove();
          that.handleLoginGlobal();
          Ember.run.later(function() {
            let dialog = Ember.$('.api-popup-dialog');
            that.$().append(dialog);
            dialog.css('display', 'block');
          }, 500);
        };

        // add change listener to apiKey input.
        let input = that.$('#input_apiKey');
        if (input) {
          input.change(that._addApiKeyAuthorization(that));
        }
      },
      onFailure: this.get("onFailure") || function() {
        console.log('Failed to load SwaggerUi');
      }
    });

    window.swaggerUi.load();
  },


  _translate() {
    if(window.SwaggerTranslator) {
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
