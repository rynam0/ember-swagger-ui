import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller) {
    controller.set('authz', { name: 'api_key', value: 'my-api-key', type: 'query'} );
  }

});
