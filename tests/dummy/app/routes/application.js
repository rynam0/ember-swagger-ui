import Route from '@ember/routing/route';

export default Route.extend({

  setupController(controller) {
    controller.set('authz', { name: 'api_key', value: 'my-api-key', type: 'query'} );
  }

});
