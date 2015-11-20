import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import spec from './petstore';

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

  let $logo = this.$('#logo');
  assert.equal($logo.text(), 'Cool API');
});

test('has a default url', function(assert) {
  this.render(hbs`{{swagger-ui}}`);

  let $baseUrl = this.$('#input_baseUrl');
  assert.equal($baseUrl.val(), 'http://petstore.swagger.io/v2/swagger.json');
});

test('accepts a url', function(assert) {
  let url = 'http://petstore.swagger.io/v2/swagger.json';
  this.set('apiUrl', url);
  this.render(hbs`{{swagger-ui url=apiUrl}}`);

  let $baseUrl = this.$('#input_baseUrl');
  assert.equal($baseUrl.val(), url);
});

test('docExpansion as "none"', function(assert) {
  this.set('swag', spec);
  this.set('expansion', 'none');
  this.render(hbs`{{swagger-ui docExpansion=expansion spec=swag}}`);

  return wait().then(() => {
    let $endpoints = this.$('.endpoints');
    let $content = this.$('.content');
    assert.equal($endpoints.css('display'), 'none');
    assert.equal($content.css('display'), 'none');
  });
});

test('docExpansion as "list"', function(assert) {
  this.set('swag', spec);
  this.set('expansion', 'list');
  this.render(hbs`{{swagger-ui docExpansion=expansion spec=swag}}`);

  return wait().then(() => {
    let $endpoints = this.$('.endpoints');
    let $content = this.$('.content');
    assert.ok($endpoints.length > 0);
    //assert.notEqual($endpoints.css('display'), 'none');
    assert.equal($content.css('display'), 'none');
  });
});

test('docExpansion as "full"', function(assert) {
  this.set('swag', spec);
  this.set('expansion', 'full');
  this.render(hbs`{{swagger-ui docExpansion=expansion spec=swag}}`);
  return wait().then(() => {
    let $content = this.$('.content');
    assert.ok($content.length > 0);
    assert.notEqual($content.css('display'), 'none');
  });
});

test('supportedSubmitMethods GET only', function(assert) {
  this.set('swag', spec);
  this.set('expansion', 'full');
  this.set('submitMethods', ['get']);
  this.render(hbs`{{swagger-ui docExpansion=expansion supportedSubmitMethods=submitMethods spec=swag}}`);
  return wait().then(() => {
    let $gets = this.$('.get .sandbox_header');
    let $posts = this.$('.post .sandbox_header');
    let $puts = this.$('.put .sandbox_header');
    let $deletes = this.$('.delete .sandbox_header');
    assert.ok($gets.length > 0);
    assert.equal($posts.length, 0);
    assert.equal($puts.length, 0);
    assert.equal($deletes.length, 0);
  });
});

test('supportedSubmitMethods (all)', function(assert) {
  this.set('swag', spec);
  this.set('expansion', 'full');
  this.set('submitMethods', ['get', 'post', 'put', 'delete', 'patch']);
  this.render(hbs`{{swagger-ui docExpansion=expansion supportedSubmitMethods=submitMethods spec=swag}}`);
  return wait().then(() => {
    let $gets = this.$('.get .sandbox_header');
    let $posts = this.$('.post .sandbox_header');
    let $puts = this.$('.put .sandbox_header');
    let $deletes = this.$('.delete .sandbox_header');
    assert.ok($gets.length > 0);
    assert.ok($posts.length > 0);
    assert.ok($puts.length > 0);
    assert.ok($deletes.length > 0);
  });
});
