const path = require('path');
const { addBeforeLoader, loaderByName } = require('@craco/craco');

module.exports = {
    webpack: {
        alias: {
            'layout': path.resolve(__dirname, './src/layout'),
            'common': path.resolve(__dirname, './src/common'),
            'common/*': path.resolve(__dirname, './src/common/*'),
            "components":  path.resolve(__dirname, './src/components'),
            '@core': path.resolve(__dirname, './src/core'),
        },
        configure: function(webpackConfig) {
            const fragLoader = {
                test: /\.(vert|frag)$/i,
                use: ['raw-loader']
            };

            addBeforeLoader(webpackConfig, loaderByName("file-loader"), fragLoader );

            return webpackConfig;
        }
    },
};
