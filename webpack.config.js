const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ["@babel/polyfill", './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/bundle.js'
    },
    devServer: {
        contentBase: './dist',
        port: 8080,
        writeToDisk: false
    },
    plugins: [

        // Home Page
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/pages/index.html'
        }),

        // Contact Page
        new HtmlWebpackPlugin({
            filename: 'contact/index.html',
            template: './src/pages/contact.html'
        }),

        // Services Page
        new HtmlWebpackPlugin({
            filename: 'services/index.html',
            template: './src/pages/services.html'
        }),

        // Pricing Page
        new HtmlWebpackPlugin({
            filename: 'pricing/index.html',
            template: './src/pages/pricing.html'
        }),

        // About Page
        new HtmlWebpackPlugin({
            filename: 'about/index.html',
            template: './src/pages/about.html'
        }),
        new MiniCssExtractPlugin({
            filename: "assets/css/bundle.css"
        })
    ],
    module: {
        rules: [
            // JS Test Rules
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },

            // HTML Test Rules
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },

            // SCSS/SASS/SCSS Test Rules
            {
                test: /\.(sa|sc|c)ss$/,
          
                // Set loaders to transform files.
                // Loaders are applying from right to left(!)
                // The first loader will be applied after others
                use: [
                    {
                        // After all CSS loaders we use plugin to do his work.
                        // It gets all transformed CSS and extracts it into separate
                        // single bundled file
                        loader: MiniCssExtractPlugin.loader
                    }, 
                    {
                        // This loader resolves url() and @imports inside CSS
                        loader: "css-loader",
                    },
                    {
                        // Then we apply postCSS fixes like autoprefixer and minifying
                        loader: "postcss-loader"
                    },
                    {
                        // First we transform SASS to standard CSS
                        loader: "sass-loader",
                        options: {
                            implementation: require("node-sass")
                        }
                    }
                ]
            },

            // Image Test Rules
            {
                // Now we apply rule for images
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        // Using file-loader for these files
                        loader: "file-loader",
          
                        // In options we can set different things like format
                        // and directory to save
                        options: {
                            outputPath: 'assets/img'
                        }
                    }
                ]
            }
        ]
    }
};