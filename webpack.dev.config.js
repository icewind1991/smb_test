const path = require('path');
const assetsPath = path.resolve(__dirname, 'build');

module.exports = {
	mode: 'development',
	devtool: 'eval',
	entry: {
		'main': [
			'./js/index.tsx'
		]
	},
	devServer: {
		hotOnly: true,
		contentBase: './build'
	},
	output: {
		path: assetsPath,
		filename: '[name].js',
		chunkFilename: '[name]-[chunkhash].js',
		publicPath: '/build/'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 10240
				}
			},
			{
				test: /\.tsx?$/,
				use: [
					'ts-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader'
				]
			}
		]
	}
};
