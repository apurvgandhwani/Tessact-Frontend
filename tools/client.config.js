var path = require('path');
var webpack = require('webpack');

var DIRS = require('./dirs.js');

var stylus = require('stylus');
var nib = require('nib');
var axis = require('axis');

var rupture = require('rupture');
var bootstrap = require('bootstrap-styl');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var IS_PROD = process.env.NODE_ENV === "production";
var config = {
	devtool: IS_PROD ? false : 'eval',
	debug: !IS_PROD,
	cache: true,
	root: DIRS.ROOT,
	watchOptions: {
		ignored: /node_modules/
	},
	entry: {
		main: [ DIRS.SRC_CLIENT + '/index.js' ]
	},
	output: {
		path: DIRS.BUILD_PUBLIC,
		publicPath: '/public/',
		filename: '[name]-bundle.js'
	},
	resolve: {
		modulesDirectories: [ DIRS.SRC_CLIENT, 'node_modules'],
		extensions: ['', '.webpack.js', '.web.js', '.js', '.styl', '.css'],
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
			},
			{
				test: /\.styl$/,
				loader: [
					'isomorphic-style-loader',
					'css?sourceMap&localIdentName=[name]_[local]_[hash:base64:3]',
					'stylus?sourceMap'
				].join('!')
			},
            {
                test: /\.html$/,
                loader: 'html-loader?attrs[]=video:src'
            }, {
                test: /\.mp4$/,
                loader: 'url?limit=10000&mimetype=video/mp4'
            },

            {
                test: /\.css$/,
                loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'

            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader"},
            {
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
			__SERVER__: false,
			"process.env.NODE_ENV": (IS_PROD ? JSON.stringify("production") : JSON.stringify("development"))
		}),
		new webpack.ProvidePlugin({
			React: 'react',
			$: 'jquery',
			jQuery: 'jquery',
			_: 'lodash'
		}),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
	],
	stylus: {
		use: [nib(), axis(), rupture(), bootstrap()],
		import: path.resolve(__dirname, '../src/stylus/index.styl'),
		error: IS_PROD,
		compress: IS_PROD,
		'include css': true
	}
};

if (IS_PROD){
	// console.log('--- CLIENT:PRODUCTION_MODE ---');
	config.entry.vendors = [
		'react', 'react-dom', 'react-router',
		'lodash', 'core-js', 'moment', 'jquery', 'bluebird',
		'redux', 'react-redux', 'react-router-redux',
		'history'
	];

	config.plugins = config.plugins.concat([
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			filename: 'vendors-bundle.js'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {warnings: false},
			comments: false
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
	]);
} else {
	config.entry.main.unshift('webpack-hot-middleware/client')
	config.plugins = config.plugins.concat([
		new webpack.DllReferencePlugin({
			context: DIRS.SRC_CLIENT,
			manifest: require(DIRS.BUILD_PUBLIC + '/dll/vendor-manifest.json')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]);
}


module.exports = config;