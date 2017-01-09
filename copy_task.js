var path = require('path');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
const IS_PROD = (process.env.NODE_ENV === "production");

var DIRS = require('./tools/dirs');


const normalizePaths = (paths)=> paths.map(x => {
	return [
		path.resolve(DIRS.NODE_MODULES, x[0].replace('~/', './')),
		path.resolve(DIRS.BUILD_VENDOR, x[1].replace('@/', './'))
	]
});

var VENDORS = normalizePaths([
	
	// FILES
	['~/react/dist/react.js', '@/react.js'],
	['~/react/dist/react-with-addons.js', '@/react-with-addons.js'],
	['~/react-dom/dist/react-dom.js', '@/react-dom.js'],
	['~/react-router/umd/ReactRouter.js', '@/ReactRouter.js'],
	['~/redux/dist/redux.js', '@/redux.js'],
	['~/react-redux/dist/react-redux.js', '@/react-redux.js'],
	['~/react-router-redux/dist/ReactRouterRedux.js', '@/ReactRouterRedux.js'],
	['~/lodash/lodash.js', '@/lodash.js'],
	['~/animate.css/animate.css', '@/animate.css'],
	['~/font-awesome', '@/font-awesome'],
	['~/pace-js', '@/pace']
	
	// DIRS

]);

// Copy public assets
var ASSETS = VENDORS.concat([
	[DIRS.SRC_PUBLIC, DIRS.BUILD_PUBLIC]
])

function copyItem(paths){
	return fs.copyAsync(paths[0], paths[1])
}

module.exports = function(cb){
	return (
		fs.emptyDirAsync(DIRS.BUILD)
				.tap(()=> console.log('  Cleaned build/ '))
			.then(()=> Promise.mapSeries(ASSETS, copyItem))
				.tap(()=> console.log('  Copied ' + ASSETS.length + ' asset entries.'))
			.catch(console.error.bind(console))
	);
}