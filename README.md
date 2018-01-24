# ember-swagger-ui

[![Build Status](https://travis-ci.org/rynam0/ember-swagger-ui.svg?branch=master)](https://travis-ci.org/rynam0/ember-swagger-ui)
[![npm version](https://badge.fury.io/js/ember-swagger-ui.svg)](http://badge.fury.io/js/ember-swagger-ui)
[![Ember Observer Score](http://emberobserver.com/badges/ember-swagger-ui.svg)](http://emberobserver.com/addons/ember-swagger-ui)

An [ember-cli](http://www.ember-cli.com) addon for quickly and easily adding [swagger-ui](https://github.com/swagger-api/swagger-ui) components to your ember application.

![Screenshot](screenshot.png?raw=true "Screenshot")


## Installation
```
$ ember install ember-swagger-ui
```


## ember-swagger-ui >= 1.0.0

### About 

As of version 1.0.0, the addon is based on swagger-ui 3.x. Some notable differences from previous versions include: 

- A simplified component API
- No Bower dependencies

### Configuration

Configuring a component is done by passing a config object to the component's `config` attribute.
The object takes any and all supported [swagger-ui 3.x configuration](https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md)

    // controllers/application.js
    
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

### Usage

    {{!-- application.hbs --}}
    {{swagger-ui config=swaggerConfig}}


## ember-swagger-ui < 1.0.0 (Pre-releases)

### About

Releases preceeding 1.0.0 are based on swagger-ui 2.x and are considered pre-releases.

Many of the swagger-ui configuration properties are available as attributes on the component.
The currently supported options are documented below.  For more details on each of these options, please refer to the [swagger-ui docs](https://github.com/swagger-api/swagger-ui):

#### url
The component's default url is "http://petstore.swagger.io/v2/swagger.json".
The following would load the API docs of the default [petstore example](http://petstore.swagger.io/):

```{{swagger-ui}}}```

To load your API docs, simply supply the URL of your swagger.json as the "url" attribute value:

```{{swagger-ui url="http://petstore.swagger.io/v2/swagger.json"}}```

#### spec
As noted in the swagger-ui docs, you could alternately supply a JSON object that is a valid Swagger definition:

```{{swagger-ui spec=mySpec}}```

#### docExpansion

```{{swagger-ui docExpansion="list"}}```

#### supportedSubmitMethods

```{{swagger-ui supportedSubmitMethods=anArrayOfHttpMethods}}```

#### showRequestHeaders

```{{swagger-ui showRequestHeaders=true}}```

#### authorizations
Authorizations are configured in the same manner they would be if pulling in the entire swagger-ui distribution.
See below for an example of query parameter apiKey configuration.

### A Full Example
```
{{#swagger-ui showRequestHeaders=true docExpansion="list" supportedSubmitMethods=submitMethods authorizations=authz}}
    <div id='header'>
        <div class="swagger-ui-wrap">
            <a id="logo" href="http://swagger.io">swagger</a>
            <form id='api_selector'>
                <div class='input'><input placeholder="http://example.com/api" id="input_baseUrl" name="baseUrl" type="text"/></div>
                <div class='input'><input placeholder="api_key" id="input_apiKey" name="apiKey" type="text"/></div>
                <div class='input'><a id="explore" href="#" data-sw-translate>Explore</a></div>
            </form>
        </div>
    </div>
{{/swagger-ui}}
```

```
// my-route.js
// set up component attribute values on your controller
setupController(controller) {
  controller.set('submitMethods', ['get', 'post'] );
  controller.set('authz', { name: 'api_key', value: 'myQueryParamApiKey', type: 'query'} );
}
```

### Block syntax

The component supports block syntax to aid in customizing any content necessary to interact with your API documentation.
Following is a contrived example of adding basic auth via a form:

```
{{#swagger-ui}}
  <div>
      <form {{action "submit" on="submit"}}>
          {{input value=user placeholder="Username"}}
          {{input value=pw placeholder="Password" type="password"}}
          {{input type="submit" value="Submit"}}
      </form>
  </div>
{{/swagger-ui}}

// my-route.js
// setup action to handle the form submission and addition of the swagger authorization
actions: {
  submit() {
    let { user, pw } = this.controllerFor('application').getProperties('user', 'pw');
    let creds = window.btoa(user + ':' + pw);
    let basicAuth = new window.SwaggerClient.ApiKeyAuthorization("Authorization", "Basic " + creds, "header");
    window.swaggerUi.api.clientAuthorizations.add("Authorization", basicAuth);
    window.swaggerUi.load();
  }
}
```


## Contributing

### Installation

* `git clone <repository-url>` this repository
* `cd ember-swagger-ui`
* `npm install`
* `bower install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
