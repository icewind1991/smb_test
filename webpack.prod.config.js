// Webpack config for creating the production bundle.

const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const assetsPath = path.join(__dirname, 'build');

module.exports = {
	devtool: 'source-map',
	mode: 'production',
	entry: [
		'./js/index.tsx'
	],
	output: {
		path: assetsPath,
		filename: '[name].js',
		chunkFilename: '[name]-[chunkhash].js',
		publicPath: '/dist/'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				loader: 'url-loader',
				options: {limit: 10240}
			},
			{
				test: /\.tsx?$/,
				use: ['ts-loader']
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						'css-loader',
						'postcss-loader'
					]
				})
			}
		]
	},
	plugins: [
		new CleanPlugin(),
		new ExtractTextPlugin("[name].css"),
		new webpack.DefinePlugin({
			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: false,
			__DEVTOOLS__: false
		}),

		// ignore dev config
		new webpack.IgnorePlugin(/\.\/dev/, /\/config$/)
	]
};
