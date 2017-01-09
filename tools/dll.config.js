var path = require('path');
var webpack = require('webpack');

var DIRS = require('./dirs');

const IS_PROD = (process.env.NODE_ENV === "production")

module.exports = {
	entry: {
		vendor: [ DIRS.SRC_CLIENT + '/vendors.js' ]
	},
	output: {
		path: DIRS.BUILD_DLL,
		filename: "dll.[name].js",
		library: "[name]"
	},
	module: {
		loaders: [
			{test: /\.json$/, loader: 'json', exclude: /node_modules/},
			{test: /\.js$/, 
				loader: 'babel', 
				exclude: /node_modules/,
				include: [ DIRS.SRC_CLIENT ],
				query: {
					cacheDirectory: true,
					env: { 
						development: {
							presets: ['react-hmre']
						}
					} 
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			__DEV__: !IS_PROD,
			__SERVER__: false,
			"process.env.NODE_ENV": (IS_PROD ? JSON.stringify("production") : JSON.stringify("development"))
		}),
		new webpack.DllPlugin({
			path: DIRS.BUILD_DLL + "/[name]-manifest.json",
			name: "[name]",
			context: DIRS.SRC_CLIENT
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		...(
			IS_PROD
				? [
					new webpack.optimize.DedupePlugin(),
					new webpack.optimize.UglifyJsPlugin({
						compress: {warnings: false},
						comments: false
					}),
				]: []
			)
	],
	resolve: {
		root: DIRS.SRC_CLIENT,
		modulesDirectories: ["node_modules"]
	}
}