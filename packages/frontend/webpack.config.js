const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.min.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            },
            {
                test: /\.(png|jpe?g|gif|woff2|woff)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            onlyLocals: true,
                        },
                    },
                ],

            },

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
