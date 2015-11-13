import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('swagger-ui', 'Integration | Component | swagger ui', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{swagger-ui}}`);

  assert.ok(this.$());
});
