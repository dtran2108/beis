// -------------------------------------------------------
// CONFIG BY: dtran2108
// mail: dtran2108@gmail.com
// -------------------------------------------------------

const withPlugins = require('next-compose-plugins');
// dynamic import
// https://github.com/vercel/next.js/blob/canary/examples/with-dynamic-import/pages/index.js
/* eslint-disable */

//migration next-translate to 1.0
//https://github.com/vinissimus/next-translate/blob/1.0.0/docs/migration-guide-1.0.0.md
const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './public/assets/antd-custom.less'), 'utf8'));

const nextConfig = {
  env: {
    PORT: 3000,
    // TODO: Change to server url
    API_URL: 'http://45.76.152.153:8080',
    IMAGE_URL: 'http://45.76.152.153:8080'
  },
  // distDir: 'build', //custom webpack if need (please check https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config)
  webpack: (config, options) => {
    // modify the `config` here
    config.module.rules.push({
      loader: require.resolve('file-loader'),
      // Exclude `js` files to keep "css" loader working as it injects
      // its runtime that would otherwise be processed through "file" loader.
      // Also exclude `html` and `json` extensions so they get processed
      // by webpacks internal loaders.
      exclude: [/\.(js|mjs|jsx|ts|tsx|less|css)$/, /\.html$/, /\.json$/],
      options: {
        name: 'static/media/[name].[hash:8].[ext]'
      }
    });
    return config;
  },
  // Webpack 5 is enabled by default
  // You can still use webpack 4 while upgrading to the latest version of Next.js by adding the "webpack5: false" flag
  webpack5: false,
};

module.exports = withPlugins(
  [
    withCSS(
      withLess({
        exportPathMap: function () {
          return {
            '/': { page: '/' }
          };
        },
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVariables // make your antd custom effective
        },
        webpack: (config, options) => {
          if (options.isServer) {
            const antStyles = /antd\/.*?\/style.*?/;
            const origExternals = [...config.externals];
            config.externals = [
              (context, request, callback) => {
                if (request.match(antStyles)) return callback();
                if (typeof origExternals[0] === 'function') {
                  origExternals[0](context, request, callback);
                } else {
                  callback();
                }
              },
              ...(typeof origExternals[0] === 'function' ? [] : origExternals)
            ];

            config.module.rules.unshift({
              test: antStyles,
              use: 'null-loader'
            });
          }
          return config;
        }
      })
    )
  ],
  nextConfig
);
