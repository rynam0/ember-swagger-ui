/* global $:false */

import Ember from 'ember';
import layout from '../templates/components/swagger-ui';

export default Ember.Component.extend({
  layout: layout,

  classNames: ['swagger-section'],

  /**
   * Store the original pushState function in order to restore it on willDestroyElement.
   */
  bbqPushState: $.bbq.pushState,

  handleLoginGlobal: window.handleLogin,

  /* Supported Component properties */
  title: null,
  url: null,
  apiKey: null,
  docExpansion: 'none',
  showRequestHeaders: false,
  supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],


  didInsertElement() {
    this._initSwaggerUi();
  },

  willDestroyElement() {
    // restore the original pushState function
    $.bbq.pushState = this.get('bbqPushState');
  },


  _initSwaggerUi() {
    let that = this;
    let url = this.get('url') || 'http://petstore.swagger.io/v2/swagger.json';

    that._translate();

    window.swaggerUi = new SwaggerUi({
      url: url,
      validatorUrl: null,
      dom_id: 'swagger-ui-container',
      docExpansion: that.get('docExpansion'),
      apisSorter: 'alpha',
      showRequestHeaders: that.get('showRequestHeaders'),
      supportedSubmitMethods: that.get('supportedSubmitMethods'),
      onComplete: function() {

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
        that._addApiKeyAuthorization();
        that._highlight();

        // we need to no-op a jquery plugin function that routes us to index if not overridden.
        $.bbq.pushState = function() { };

        // and remove href links that will also attempt to route us out of our known ember routes
        let anchors = that.$('a');
        if (anchors) {
          anchors.removeAttr('href');
        }

        // move the generated dialog element to the component's element
        window.handleLogin = function() {
          that.$('.api-popup-dialog').remove();
          that.handleLoginGlobal();
          Ember.run.later(function() {
            let dialog = $('.api-popup-dialog');
            that.$().append(dialog);
            dialog.css('display', 'block');
          }, 500);
        };

      },
      onFailure: function() {
        console.log('Failed to load SwaggerUi');
      }
    });

    let keyInput = this.$('#input_apiKey');
    keyInput.change(this._addApiKeyAuthorization);
    keyInput.val(this.get('apiKey'));

    window.swaggerUi.load();
  },

  _translate() {
    if(window.SwaggerTranslator) {
      window.SwaggerTranslator.translate();
    }
  },

  _addApiKeyAuthorization() {
    let input = this.$('#input_apiKey');
    if (input) {
      let key = encodeURIComponent(input[0].value);
      if(key && key.trim() !== "") {
        // todo: support clientAuthorizations configuration
        var apiKeyAuth = new SwaggerClient.ApiKeyAuthorization("api_key", key, "query");
        window.swaggerUi.api.clientAuthorizations.add("api_key", apiKeyAuth);
      }
    }
  },

  _highlight() {
    let codes = this.$('pre code');
    if (codes) {
      codes.each(function(i, e) {
         hljs.highlightBlock(e);
      });
    }
  }

});
