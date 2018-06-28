const path = require('path');

module.exports = [{
    name : 'app',
    entry: './src/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/dist/')
    },
    devtool : 'eval-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        sourceMap : true,
                        plugins: () => [
                            require('autoprefixer')(),
                            require('cssnano')()
                        ]
                    }
                }
            ]
        }]
    }
}, {
    name : 'sw',
    entry: './src/js/sw.js',
    output: {
        filename: 'sw.js',
        path: path.resolve(__dirname, 'public/')
    }
}];
