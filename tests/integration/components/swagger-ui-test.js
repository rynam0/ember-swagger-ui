import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import spec from './petstore';
import { isPresent } from '@ember/utils';

module('swagger-ui', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{swagger-ui config=config}}`);
    let element = this.element.querySelector('.component-swagger-ui')
    assert.ok(isPresent(element));
  });


  test('docExpansion as "none"', async function(assert) {
    this.set('config', {
      spec,
      docExpansion: 'none'
    });
    await render(hbs`{{swagger-ui config=config}}`);

    return settled().then(() => {
      let $opblocks = this.element.querySelectorAll('.opblock');
      assert.equal($opblocks.length, 0);
    });
  });

  test('docExpansion as "list"', async function(assert) {
    this.set('config', {
      spec,
      docExpansion: 'list'
    });
    await render(hbs`{{swagger-ui config=config}}`);

    return settled().then(() => {
      let $opblocks = this.element.querySelectorAll('.opblock');
      let $body = this.element.querySelectorAll('.opblock-body');
      assert.ok($opblocks.length > 0);
      assert.equal($body.length, 0);
    });
  });

  test('docExpansion as "full"', async function(assert) {
    this.set('config', {
      spec,
      docExpansion: 'full'
    });
    await render(hbs`{{swagger-ui config=config}}`);

    return settled().then(() => {
      let $opblocks = this.element.querySelectorAll('.opblock');
      let $body = this.element.querySelectorAll('.opblock-body');
      assert.ok($opblocks.length > 0);
      assert.ok($body.length > 0);
    });
  });
});

