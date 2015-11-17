import { moduleForComponent, test } from 'ember-qunit';
import { skip } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('swagger-ui', {
  integration: true
});


test('it renders', function(assert) {
  this.render(hbs`{{swagger-ui}}`);
  assert.ok(this.$());
});

test('has a title', function(assert) {
  this.set('logoTitle', 'Cool API');
  this.render(hbs`{{swagger-ui title=logoTitle}}`);
  assert.equal(this.$('#logo').text(), this.get('logoTitle'));
});

test('has a default url', function(assert) {
  this.render(hbs`{{swagger-ui}}`);
  assert.equal(this.$('#input_baseUrl').val(), 'http://petstore.swagger.io/v2/swagger.json');
});

test('accepts a url', function(assert) {
  this.set('apiUrl', 'http://petstore.swagger.io/v2/swagger.json');
  this.render(hbs`{{swagger-ui url=apiUrl}}`);
  assert.equal(this.$('#input_baseUrl').val(), this.get('apiUrl'));
});

skip('docExpansion as list', function(assert) {
  this.set('expansion', 'list');
  this.render(hbs`{{swagger-ui docExpansion=expansion}}`);
  return wait().then(() => {
    let eles = this.$('.endpoints');
    assert.ok(eles.length > 0);
  });
});
