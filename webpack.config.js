//webpack是node写出来的
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// let UglifyjsPlugin = require('uglifyjs-webpack-plugin');
let TerserPlugin = require('terser-webpack-plugin');
let webpack = require('webpack');
let VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    devServer: { 
        port: 8080,
        progress: true, 
        contentBase: './dist',
        open: true
    },
    mode: 'development', 
    entry:'./src/main.js', 
    output: {
        filename: 'bundle.js', 
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [ 
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                present: ['default', {
                    discardComments: {
                        removeAll: true,
                    },
                    normalizeUnicode: false
                }]
            },
            file:'main.js',
            canPrint: true
            
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]'
            },
            // {
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$'
            // },

            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             enforce: 'pre' 
            //         }
            //     }
            // },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            "@babel/plugin-transform-runtime",
                            ["@babel/plugin-transform-modules-commonjs", {"strictMode": false}]
                        ]
                    },
                },
                include:path.resolve(__dirname, 'src'),
                exclude:/node_modules/
            },
            {test:/\.css/, use:['style-loader', 'vue-style-loader','css-loader','postcss-loader']},
            {test:/\.less/, use:['style-loader', 'vue-style-loader','css-loader', 'postcss-loader', 'less-loader']},
            {test:/\.scss/, use:['style-loader', 'vue-style-loader','css-loader', 'postcss-loader', 'sass-loader']},
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                  loaders: {
                    scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                    sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                  }
                }
              },
            {test: /\.ttf|woff|woff2|eot|svg$/, use: 'url-loader'}
        ]
    }
}