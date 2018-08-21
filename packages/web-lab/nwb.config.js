const path = require('path');

module.exports = {
    type: 'web-app',
    webpack: {
        extra: {
            module: {
                rules: [
                    {
                        test: /\.modernizrrc.js$/,
                        use: ['modernizr-loader'],
                    },
                    {
                        test: /\.modernizrrc(\.json)?$/,
                        use: ['modernizr-loader', 'json-loader'],
                        type: 'javascript/auto', // disable Webpack 4 native JSON loader
                    },
                ],
            },
            resolve: {
                alias: {
                    modernizr$: path.resolve(__dirname, '../../.modernizrrc.json'),
                },
            },
        },
    },
};
