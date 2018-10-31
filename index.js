/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-swagger-ui',

  included(app) {
    this._super.included.apply(this, arguments);

    let options = app.options['ember-swagger-ui'] || {};

    if (options.usePublic) {
      let uglify = app.options['ember-cli-uglify'] = app.options['ember-cli-uglify'] || {};
      uglify.exclude = (uglify.exclude || []).concat('swagger-ui-dist/**');
    } else {
      app.import('node_modules/swagger-ui-dist/swagger-ui.css');
      app.import('node_modules/swagger-ui-dist/swagger-ui-bundle.js');
      app.import('node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js');
    }

    app.import('vendor/shims/swagger-ui.js');

    this._options = options;
  },

  treeForPublic() {
    let tree = this._super.treeForPublic.apply(this, arguments);

    if (!this._options.usePublic) {
      return tree;
    }

    let trees = [];
    if (tree) {
      trees.push(tree);
    }

    const Funnel = require('broccoli-funnel');
    const mergeTrees = require('broccoli-merge-trees');
    const resolve = require('resolve');
    const path = require('path');

    let absolutePath = resolve.sync('swagger-ui-dist', { basedir: this.project.root });

    trees.push(new Funnel(path.dirname(absolutePath), {
      include: [
        'swagger-ui.css*',
        'swagger-ui-bundle.js*',
        'swagger-ui-standalone-preset.js*'
      ],
      destDir: 'swagger-ui-dist',
      annotation: `Funnel ${this.name} treeForPublic`
    }));

    return mergeTrees(trees, { annotation: `Merge ${this.name} treeForPublic` });
  },

  contentFor: function(type, config) {
    if (type === 'head') {
      return '';
    } else if (type === 'head-footer') {
      if (this._options.usePublic) {
        return `<link rel="stylesheet" href="${config.rootURL}swagger-ui-dist/swagger-ui.css">`;
      }
    } else if (type === 'body') {
      // include SVG definitions used by swagger-ui dist index.html
      return `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
          <defs>
            <symbol viewBox="0 0 20 20" id="unlocked">
              <path d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V6h2v-.801C8 3.754 8.797 3 10 3c1.203 0 2 .754 2 2.199V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387C5.672 18.861 6.55 19 7.1 19h5.8c.549 0 1.428-.139 1.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8z"></path>
            </symbol>
            <symbol viewBox="0 0 20 20" id="locked">
              <path d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387C5.672 18.861 6.55 19 7.1 19h5.8c.549 0 1.428-.139 1.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8zM12 8H8V5.199C8 3.754 8.797 3 10 3c1.203 0 2 .754 2 2.199V8z"/>
            </symbol>
            <symbol viewBox="0 0 20 20" id="close">
              <path d="M14.348 14.849c-.469.469-1.229.469-1.697 0L10 11.819l-2.651 3.029c-.469.469-1.229.469-1.697 0-.469-.469-.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-.469-.469-.469-1.228 0-1.697.469-.469 1.228-.469 1.697 0L10 8.183l2.651-3.031c.469-.469 1.228-.469 1.697 0 .469.469.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c.469.469.469 1.229 0 1.698z"/>
            </symbol>
            <symbol viewBox="0 0 20 20" id="large-arrow">
              <path d="M13.25 10L6.109 2.58c-.268-.27-.268-.707 0-.979.268-.27.701-.27.969 0l7.83 7.908c.268.271.268.709 0 .979l-7.83 7.908c-.268.271-.701.27-.969 0-.268-.269-.268-.707 0-.979L13.25 10z"/>
            </symbol>
            <symbol viewBox="0 0 20 20" id="large-arrow-down">
              <path d="M17.418 6.109c.272-.268.709-.268.979 0s.271.701 0 .969l-7.908 7.83c-.27.268-.707.268-.979 0l-7.908-7.83c-.27-.268-.27-.701 0-.969.271-.268.709-.268.979 0L10 13.25l7.418-7.141z"/>
            </symbol>
            <symbol viewBox="0 0 24 24" id="jump-to">
              <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"/>
            </symbol>
            <symbol viewBox="0 0 24 24" id="expand">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
            </symbol>
          </defs>
        </svg>
      `;
    } else if (type === 'body-footer') {
      if (this._options.usePublic) {
        return [
          'swagger-ui-bundle.js',
          'swagger-ui-standalone-preset.js'
        ].map(file => `<script src="${config.rootURL}swagger-ui-dist/${file}"></script>`);
      }
    }
  }
};
