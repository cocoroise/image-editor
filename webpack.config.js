const webpack = require('webpack');
const SafeUmdPlugin = require('safe-umd-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.argv.indexOf('-p') > -1;

module.exports = {
    entry: './src/index.js',
    output: {
        library: ['tui', 'ImageEditor'],
        libraryTarget: 'umd',
        path: 'dist',
        publicPath: 'dist',
        filename: `bundle.js`
    },
    externals: {
        'tui-code-snippet': {
            commonjs: 'tui-code-snippet',
            commonjs2: 'tui-code-snippet',
            amd: 'tui-code-snippet',
            root: ['tui', 'util']
        },
        'tui-color-picker': {
            commonjs: 'tui-color-picker',
            commonjs2: 'tui-color-picker',
            amd: 'tui-color-picker',
            root: ['tui', 'colorPicker']
        },
        fabric: {
            commonjs: ['fabric', 'fabric'],
            commonjs2: ['fabric', 'fabric'],
            amd: 'fabric',
            root: 'fabric'
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {url: false}
                    }
                ]
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract(
                    'css-loader?sourceMap!stylus-loader?paths=src/css/'
                )
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(`bundle.css`),
        new SafeUmdPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'cheap-module-source-map',
    devServer: {
        hot: true,
        historyApiFallback: false,
        progress: true,
        inline: true,
        host: 'localhost',
        disableHostCheck: true
    },
    eslint: {
        failOnError: isProduction
    }
};
