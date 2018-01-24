import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import spec from './petstore';

moduleForComponent('swagger-ui', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{swagger-ui config=config}}`);
  assert.ok(this.$());
});


test('docExpansion as "none"', function(assert) {
  this.set('config', {
    spec,
    docExpansion: 'none'
  });
  this.render(hbs`{{swagger-ui config=config}}`);

  return wait().then(() => {
    let $opblocks = this.$('.opblock');
    assert.equal($opblocks.length, 0);
  });
});

test('docExpansion as "list"', function(assert) {
  this.set('config', {
    spec,
    docExpansion: 'list'
  });
  this.render(hbs`{{swagger-ui config=config}}`);

  return wait().then(() => {
    let $opblocks = this.$('.opblock');
    let $body = this.$('.opblock-body');
    assert.ok($opblocks.length > 0);
    assert.equal($body.length, 0);
  });
});

test('docExpansion as "full"', function(assert) {
  this.set('config', {
    spec,
    docExpansion: 'full'
  });
  this.render(hbs`{{swagger-ui config=config}}`);

  return wait().then(() => {
    let $opblocks = this.$('.opblock');
    let $body = this.$('.opblock-body');
    assert.ok($opblocks.length > 0);
    assert.ok($body.length > 0);
  });
});

