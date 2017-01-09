var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

var stylus = require('stylus');
var nib = require('nib');
var axis = require('axis');
var rupture = require('rupture');
var bootstrap = require('bootstrap-styl');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var DIRS = require('./dirs.js');
var IS_PROD = (process.env.NODE_ENV === "production");

var config = {
	target: 'node',
	devtool: IS_PROD ? false : '#inline-source-map',
	debug: !IS_PROD,
	cache: !IS_PROD,
	stats: {
		colors: true,
		chunks: false,
		reasons: true
	},
	externals: [nodeExternals()],
	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false
	},
	entry: {
		main: [ DIRS.SRC_SERVER + '/app.js' ],
	},
	output: {
		path: DIRS.BUILD,
		filename: 'server-bundle.js'
	},
	resolve: {
		modulesDirectories: [ DIRS.SRC_SERVER, DIRS.SRC_CLIENT, 'node_modules'],
		extensions: ['', '.webpack.js', '.web.js', '.js'],
	},
	module: {
		loaders: [
			{
				test: /\.js$/, 
				loader: 'babel', 
				exclude: /node_modules/,
				query: {
					retainLines: true
				}
			},
			{test: /\.json$/, loader: 'json'},
			{
				test: /\.styl$/, 
				loader: [
					'isomorphic-style-loader',
					'css?localIdentName=[name]_[local]_[hash:base64:3]',
					'stylus'
				].join('!')
			},
			{
				test: /\.css$/,
				loader: 'isomorphic-style-loader!css-loader'
			},
            {
                test: /\.html$/,
                loader: 'html-loader?attrs[]=video:src'
            }, {
                test: /\.mp4$/,
                loader: 'url?limit=10000&mimetype=video/mp4'
            },
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader'
			},{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: 'url-loader',
				query: {
				  name: IS_PROD ? '[hash].[ext]' : '[path][name].[ext]?[hash]',
				  limit: 10000,
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			__DEV__: !IS_PROD,
			__SERVER__: true,
			"process.env.NODE_ENV": (IS_PROD ? JSON.stringify("production") : JSON.stringify("development"))
		}),
		new webpack.ProvidePlugin({
			React: 'react',
			_: 'lodash'
		}),
		new webpack.BannerPlugin('require("source-map-support").install();',{
			raw: true, entryOnly: false
		})
	],
	stylus: {
		use: [nib(), axis(), rupture(), bootstrap()],
		import: path.resolve(__dirname, '../src/stylus/index.styl'),
		error: IS_PROD,
		compress: IS_PROD
	}
};

if (IS_PROD){
	// console.log('--- SERVER:PRODUCTION_MODE ---');
	config.plugins = config.plugins.concat([  
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
		new webpack.optimize.AggressiveMergingPlugin()
	]);
}

module.exports = config;