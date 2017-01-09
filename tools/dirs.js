var path = require('path');

var ROOT = path.resolve(__dirname, '../');

module.exports = {
	ROOT: ROOT,
	SRC: ROOT + '/src',
	SRC_CLIENT: ROOT + '/src/client',
	SRC_SERVER: ROOT + '/src/server',
	SRC_PUBLIC: ROOT + '/src/public',

	
	BUILD: ROOT + '/build',
	BUILD_PUBLIC: ROOT + '/build/public',
	BUILD_VENDOR: ROOT + '/build/public/vendor',
	BUILD_DLL: ROOT + '/build/public/dll',

	NODE_MODULES: ROOT + '/node_modules',
}