require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var _bluebird = __webpack_require__(2);var _bluebird2 = _interopRequireDefault(_bluebird);
	var _express = __webpack_require__(3);var _express2 = _interopRequireDefault(_express);
	var _path = __webpack_require__(4);var _path2 = _interopRequireDefault(_path);
	var _serveFavicon = __webpack_require__(5);var _serveFavicon2 = _interopRequireDefault(_serveFavicon);
	var _morgan = __webpack_require__(6);var _morgan2 = _interopRequireDefault(_morgan);
	var _cookieParser = __webpack_require__(7);var _cookieParser2 = _interopRequireDefault(_cookieParser);
	var _bodyParser = __webpack_require__(8);var _bodyParser2 = _interopRequireDefault(_bodyParser);
	var _compression = __webpack_require__(9);var _compression2 = _interopRequireDefault(_compression);
	
	var _config = __webpack_require__(10);var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
	global.Promise = _bluebird2.default;
	
	
	var debug = __webpack_require__(11)('tessact:node');
	var app = (0, _express2.default)();
	
	
	var IS_PROD = ("development") === "production";
	var PORT = process.env.PORT || 4200;
	
	var routes = __webpack_require__(12).default;
	
	if (app.get('env') === 'development') {
	  app.locals.pretty = true;
	}
	app.set('views', _path2.default.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	
	app.set('env', IS_PROD ? 'production' : 'development');
	app.use((0, _morgan2.default)('dev'));
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use((0, _cookieParser2.default)());
	app.use((0, _compression2.default)());
	app.use('/public', _express2.default.static(
	_path2.default.resolve(__dirname, './public')));
	
	
	app.use('/', routes());
	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});
	
	// error handlers
	
	
	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	  app.use(function (err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err });
	
	  });
	}
	
	
	// production error handler
	// no stacktraces leaked to user
	app.use(function (err, req, res, next) {
	  res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: {} });
	
	});
	
	var runServer = function runServer(app) {
	  app.listen(PORT, function () {
	    debug('Listening on http://localhost:' + PORT);
	    if (true)
	    debug('HMR on http://localhost:' + _config2.default.BS_PORT);
	  });
	};
	
	
	runServer(app);
	
	module.exports = app;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports, "__esModule", { value: true });var IS_PROD = ("development") === "production";
	// const IS_PROD = false;
	
	var NODE_PORT = 4211;
	var BS_PORT = 3002;exports.default =
	
	{
		NODE_PORT: NODE_PORT,
		BS_PORT: BS_PORT };

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =
	
	
	
	
	
	
	
	
	
	
	
	
	
	configureRoutes;var _express = __webpack_require__(3);var _lodash = __webpack_require__(13);var _lodash2 = _interopRequireDefault(_lodash);var _api = __webpack_require__(14);var _api2 = _interopRequireDefault(_api);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var debug = __webpack_require__(11)('tessact:router');var router = (0, _express.Router)();function Renderer(req, res, next) {res.render('index', { title: 'Tessact', IS_PROD: !(true) });}function configureRoutes(connection) {
		// Ping (Health Check)
		router.get('/ping', function (req, res) {return res.send('pong');});
		router.use('/api', _api2.default);
	
		//No Server Rendering
		router.get('*',
		Renderer);
	
	
	
		return router;
	
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _express = __webpack_require__(3);
	var _faker = __webpack_require__(15);var _faker2 = _interopRequireDefault(_faker);
	var _moment = __webpack_require__(16);var _moment2 = _interopRequireDefault(_moment);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
	
	var router = new _express.Router();
	
	function generateItem() {var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
		return _.range(n).map(function (x, i) {
	
			return {
				file_name: _faker2.default.name.firstName(),
				file_type: _.sample(['Movie', 'TV Show', 'Documentary']),
				file_image: 'http://placehold.it/60x80',
				channel: _.sample(['Zee TV', 'Set Max', 'Zee Cinema', 'Star Gold']),
				duration: _.sample(_.range(5000, 8000)),
				assigned: _.sample(['Ashwin', 'Apurv', 'Rohit', false, false]),
				status: _.sample(['Ongoing', 'Completed', 'Not Done']),
				upload_date: (0, _moment2.default)(_faker2.default.date.recent()).format('DD-MM-YY'),
				tx_date: (0, _moment2.default)(_faker2.default.date.recent()).format('DD-MM-YY') };
	
		});
	}
	
	
	router.get('/items', function (req, res) {
		var n = req.query.n || 1;
		var data = generateItem(n);
	
		res.json(data);
	});exports.default =
	
	
	router;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("faker");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjU4ZjdhZDRlYzJmN2RmNTc3YmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcHAuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmx1ZWJpcmRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcnZlLWZhdmljb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb21wcmVzc2lvblwiIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImRlYnVnXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibG9kYXNoXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb250cm9sbGVycy9hcGkuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmFrZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnRcIiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJQcm9taXNlIiwiZGVidWciLCJyZXF1aXJlIiwiYXBwIiwiSVNfUFJPRCIsIlBPUlQiLCJwcm9jZXNzIiwiZW52Iiwicm91dGVzIiwiZGVmYXVsdCIsImdldCIsImxvY2FscyIsInByZXR0eSIsInNldCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJ1c2UiLCJqc29uIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwic3RhdGljIiwicmVzb2x2ZSIsInJlcSIsInJlcyIsIm5leHQiLCJlcnIiLCJFcnJvciIsInN0YXR1cyIsInJlbmRlciIsIm1lc3NhZ2UiLCJlcnJvciIsInJ1blNlcnZlciIsImxpc3RlbiIsIkJTX1BPUlQiLCJtb2R1bGUiLCJleHBvcnRzIiwiTk9ERV9QT1JUIiwiY29uZmlndXJlUm91dGVzIiwicm91dGVyIiwiUmVuZGVyZXIiLCJ0aXRsZSIsImNvbm5lY3Rpb24iLCJzZW5kIiwiZ2VuZXJhdGVJdGVtIiwibiIsIl8iLCJyYW5nZSIsIm1hcCIsIngiLCJpIiwiZmlsZV9uYW1lIiwibmFtZSIsImZpcnN0TmFtZSIsImZpbGVfdHlwZSIsInNhbXBsZSIsImZpbGVfaW1hZ2UiLCJjaGFubmVsIiwiZHVyYXRpb24iLCJhc3NpZ25lZCIsInVwbG9hZF9kYXRlIiwiZGF0ZSIsInJlY2VudCIsImZvcm1hdCIsInR4X2RhdGUiLCJxdWVyeSIsImRhdGEiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Y0N0Q0EsdUM7QUFDQSx1QztBQUNBLG9DO0FBQ0EsNEM7QUFDQSxzQztBQUNBLDRDO0FBQ0EsMEM7QUFDQSwyQzs7QUFFQSx1QztBQUNBQSxRQUFPQyxPQUFQOzs7QUFHQSxLQUFJQyxRQUFTLG1CQUFBQyxDQUFRLEVBQVIsRUFBaUIsY0FBakIsQ0FBYjtBQUNBLEtBQUlDLE1BQU0sd0JBQVY7OztBQUdBLEtBQU1DLFVBQVcsb0JBQXlCLFlBQTFDO0FBQ0EsS0FBTUMsT0FBUUMsUUFBUUMsR0FBUixDQUFZRixJQUFaLElBQW9CLElBQWxDOztBQUVBLEtBQUlHLFNBQVMsbUJBQUFOLENBQVEsRUFBUixFQUFvQk8sT0FBakM7O0FBRUEsS0FBSU4sSUFBSU8sR0FBSixDQUFRLEtBQVIsTUFBbUIsYUFBdkIsRUFBc0M7QUFDcENQLE9BQUlRLE1BQUosQ0FBV0MsTUFBWCxHQUFvQixJQUFwQjtBQUNEO0FBQ0RULEtBQUlVLEdBQUosQ0FBUSxPQUFSLEVBQWlCLGVBQUtDLElBQUwsQ0FBVUMsU0FBVixFQUFxQixPQUFyQixDQUFqQjtBQUNBWixLQUFJVSxHQUFKLENBQVEsYUFBUixFQUF1QixNQUF2Qjs7QUFFQVYsS0FBSVUsR0FBSixDQUFRLEtBQVIsRUFBZVQsVUFBVSxZQUFWLEdBQXlCLGFBQXhDO0FBQ0FELEtBQUlhLEdBQUosQ0FBUSxzQkFBTyxLQUFQLENBQVI7QUFDQWIsS0FBSWEsR0FBSixDQUFRLHFCQUFXQyxJQUFYLEVBQVI7QUFDQWQsS0FBSWEsR0FBSixDQUFRLHFCQUFXRSxVQUFYLENBQXNCLEVBQUVDLFVBQVUsSUFBWixFQUF0QixDQUFSO0FBQ0FoQixLQUFJYSxHQUFKLENBQVEsNkJBQVI7QUFDQWIsS0FBSWEsR0FBSixDQUFRLDRCQUFSO0FBQ0FiLEtBQUlhLEdBQUosQ0FBUSxTQUFSLEVBQW1CLGtCQUFRSSxNQUFSO0FBQ2pCLGdCQUFLQyxPQUFMLENBQWFOLFNBQWIsRUFBd0IsVUFBeEIsQ0FEaUIsQ0FBbkI7OztBQUlBWixLQUFJYSxHQUFKLENBQVEsR0FBUixFQUFhUixRQUFiO0FBQ0E7QUFDQUwsS0FBSWEsR0FBSixDQUFRLFVBQVNNLEdBQVQsRUFBY0MsR0FBZCxFQUFtQkMsSUFBbkIsRUFBeUI7QUFDL0IsT0FBSUMsTUFBTSxJQUFJQyxLQUFKLENBQVUsV0FBVixDQUFWO0FBQ0FELE9BQUlFLE1BQUosR0FBYSxHQUFiO0FBQ0FILFFBQUtDLEdBQUw7QUFDRCxFQUpEOztBQU1BOzs7QUFHQTtBQUNBO0FBQ0EsS0FBSXRCLElBQUlPLEdBQUosQ0FBUSxLQUFSLE1BQW1CLGFBQXZCLEVBQXNDO0FBQ3BDUCxPQUFJYSxHQUFKLENBQVEsVUFBU1MsR0FBVCxFQUFjSCxHQUFkLEVBQW1CQyxHQUFuQixFQUF3QkMsSUFBeEIsRUFBOEI7QUFDcENELFNBQUlJLE1BQUosQ0FBV0YsSUFBSUUsTUFBSixJQUFjLEdBQXpCO0FBQ0FKLFNBQUlLLE1BQUosQ0FBVyxPQUFYLEVBQW9CO0FBQ2xCQyxnQkFBU0osSUFBSUksT0FESztBQUVsQkMsY0FBT0wsR0FGVyxFQUFwQjs7QUFJRCxJQU5EO0FBT0Q7OztBQUdEO0FBQ0E7QUFDQXRCLEtBQUlhLEdBQUosQ0FBUSxVQUFTUyxHQUFULEVBQWNILEdBQWQsRUFBbUJDLEdBQW5CLEVBQXdCQyxJQUF4QixFQUE4QjtBQUNwQ0QsT0FBSUksTUFBSixDQUFXRixJQUFJRSxNQUFKLElBQWMsR0FBekI7QUFDQUosT0FBSUssTUFBSixDQUFXLE9BQVgsRUFBb0I7QUFDbEJDLGNBQVNKLElBQUlJLE9BREs7QUFFbEJDLFlBQU8sRUFGVyxFQUFwQjs7QUFJRCxFQU5EOztBQVFBLEtBQU1DLFlBQVksU0FBWkEsU0FBWSxDQUFDNUIsR0FBRCxFQUFRO0FBQ3hCQSxPQUFJNkIsTUFBSixDQUFXM0IsSUFBWCxFQUFpQixZQUFLO0FBQ3BCSiw4Q0FBdUNJLElBQXZDO0FBQ0EsU0FBSSxJQUFKO0FBQ0VKLHdDQUFpQyxpQkFBT2dDLE9BQXhDO0FBQ0gsSUFKRDtBQUtELEVBTkQ7OztBQVNBRixXQUFVNUIsR0FBVjs7QUFFQStCLFFBQU9DLE9BQVAsR0FBaUJoQyxHQUFqQixDOzs7Ozs7QUNuRkEsc0M7Ozs7OztBQ0FBLHFDOzs7Ozs7QUNBQSxrQzs7Ozs7O0FDQUEsMkM7Ozs7OztBQ0FBLG9DOzs7Ozs7QUNBQSwyQzs7Ozs7O0FDQUEseUM7Ozs7OztBQ0FBLHlDOzs7Ozs7NEVDQUEsSUFBTUMsVUFBVyxvQkFBeUIsWUFBMUM7QUFDQTs7QUFFQSxLQUFNZ0MsWUFBWSxJQUFsQjtBQUNBLEtBQU1ILFVBQVksSUFBbEIsQzs7QUFFZTtBQUNkRyxzQkFEYztBQUVkSCxrQkFGYyxFOzs7Ozs7QUNOZixtQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNjd0JJLGdCLENBZHhCLHNDQUNBLHNDLCtDQUNBLG1DLHNJQUNBLElBQUlwQyxRQUFRLG1CQUFBQyxDQUFRLEVBQVIsRUFBaUIsZ0JBQWpCLENBQVosQ0FDQSxJQUFJb0MsU0FBUyxzQkFBYixDQUdBLFNBQVNDLFFBQVQsQ0FBa0JqQixHQUFsQixFQUF1QkMsR0FBdkIsRUFBNEJDLElBQTVCLEVBQWlDLENBQ2hDRCxJQUFJSyxNQUFKLENBQVcsT0FBWCxFQUFvQixFQUNuQlksT0FBTyxTQURZLEVBRW5CcEMsU0FBUyxDQUFDLE1BRlMsRUFBcEIsRUFJQSxDQUVjLFNBQVNpQyxlQUFULENBQXlCSSxVQUF6QixFQUFvQztBQUNsRDtBQUNBSCxTQUFPNUIsR0FBUCxDQUFXLE9BQVgsRUFBb0IsVUFBQ1ksR0FBRCxFQUFNQyxHQUFOLFVBQWFBLElBQUltQixJQUFKLENBQVMsTUFBVCxDQUFiLEVBQXBCO0FBQ0FKLFNBQU90QixHQUFQLENBQVcsTUFBWDs7QUFFQTtBQUNBc0IsU0FBTzVCLEdBQVAsQ0FBVyxHQUFYO0FBQ0M2QixVQUREOzs7O0FBS0EsU0FBT0QsTUFBUDs7QUFFQSxFOzs7Ozs7QUMzQkQsb0M7Ozs7OztxSENBQTtBQUNBLHNDO0FBQ0EsdUM7O0FBRUEsS0FBSUEsU0FBUyxxQkFBYjs7QUFFQSxVQUFTSyxZQUFULEdBQTRCLEtBQU5DLENBQU0sdUVBQUYsQ0FBRTtBQUMzQixTQUFPQyxFQUFFQyxLQUFGLENBQVFGLENBQVIsRUFBV0csR0FBWCxDQUFlLFVBQUNDLENBQUQsRUFBR0MsQ0FBSCxFQUFROztBQUU3QixVQUFPO0FBQ05DLGVBQVcsZ0JBQU1DLElBQU4sQ0FBV0MsU0FBWCxFQURMO0FBRU5DLGVBQVdSLEVBQUVTLE1BQUYsQ0FBUyxDQUFDLE9BQUQsRUFBVSxTQUFWLEVBQXFCLGFBQXJCLENBQVQsQ0FGTDtBQUdOQyxnQkFBWSwyQkFITjtBQUlOQyxhQUFTWCxFQUFFUyxNQUFGLENBQVMsQ0FBQyxRQUFELEVBQVcsU0FBWCxFQUFzQixZQUF0QixFQUFvQyxXQUFwQyxDQUFULENBSkg7QUFLTkcsY0FBVVosRUFBRVMsTUFBRixDQUFTVCxFQUFFQyxLQUFGLENBQVEsSUFBUixFQUFjLElBQWQsQ0FBVCxDQUxKO0FBTU5ZLGNBQVViLEVBQUVTLE1BQUYsQ0FBUyxDQUFDLFFBQUQsRUFBVyxPQUFYLEVBQW9CLE9BQXBCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLENBQVQsQ0FOSjtBQU9OM0IsWUFBUWtCLEVBQUVTLE1BQUYsQ0FBUyxDQUFDLFNBQUQsRUFBWSxXQUFaLEVBQXlCLFVBQXpCLENBQVQsQ0FQRjtBQVFOSyxpQkFBYSxzQkFBTyxnQkFBTUMsSUFBTixDQUFXQyxNQUFYLEVBQVAsRUFBNEJDLE1BQTVCLENBQW1DLFVBQW5DLENBUlA7QUFTTkMsYUFBUyxzQkFBTyxnQkFBTUgsSUFBTixDQUFXQyxNQUFYLEVBQVAsRUFBNEJDLE1BQTVCLENBQW1DLFVBQW5DLENBVEgsRUFBUDs7QUFXQSxHQWJNLENBQVA7QUFjQTs7O0FBR0R4QixRQUFPNUIsR0FBUCxDQUFXLFFBQVgsRUFBcUIsVUFBQ1ksR0FBRCxFQUFNQyxHQUFOLEVBQWE7QUFDakMsTUFBSXFCLElBQUl0QixJQUFJMEMsS0FBSixDQUFVcEIsQ0FBVixJQUFlLENBQXZCO0FBQ0EsTUFBSXFCLE9BQU90QixhQUFhQyxDQUFiLENBQVg7O0FBRUFyQixNQUFJTixJQUFKLENBQVNnRCxJQUFUO0FBQ0EsRUFMRCxFOzs7QUFRZTNCLE87Ozs7Ozs7QUNoQ2YsbUM7Ozs7OztBQ0FBLG9DIiwiZmlsZSI6InNlcnZlci1idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmNThmN2FkNGVjMmY3ZGY1NzdiZiIsImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJ1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZmF2aWNvbiBmcm9tICdzZXJ2ZS1mYXZpY29uJ1xuaW1wb3J0IGxvZ2dlciBmcm9tICdtb3JnYW4nXG5pbXBvcnQgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInXG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcidcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tICdjb21wcmVzc2lvbidcblxuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZydcbmdsb2JhbC5Qcm9taXNlID0gUHJvbWlzZTtcblxuXG52YXIgZGVidWcgID0gcmVxdWlyZSgnZGVidWcnKSgndGVzc2FjdDpub2RlJyk7XG52YXIgYXBwID0gZXhwcmVzcygpO1xuXG5cbmNvbnN0IElTX1BST0QgPSAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKTtcbmNvbnN0IFBPUlQgPSAocHJvY2Vzcy5lbnYuUE9SVCB8fCA0MjAwKTtcblxudmFyIHJvdXRlcyA9IHJlcXVpcmUoJy4vcm91dGVzJykuZGVmYXVsdDtcblxuaWYgKGFwcC5nZXQoJ2VudicpID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gIGFwcC5sb2NhbHMucHJldHR5ID0gdHJ1ZTtcbn1cbmFwcC5zZXQoJ3ZpZXdzJywgcGF0aC5qb2luKF9fZGlybmFtZSwgJ3ZpZXdzJykpO1xuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnamFkZScpO1xuXG5hcHAuc2V0KCdlbnYnLCBJU19QUk9EID8gJ3Byb2R1Y3Rpb24nIDogJ2RldmVsb3BtZW50Jyk7XG5hcHAudXNlKGxvZ2dlcignZGV2JykpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcbmFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuYXBwLnVzZShjb21wcmVzc2lvbigpKTtcbmFwcC51c2UoJy9wdWJsaWMnLCBleHByZXNzLnN0YXRpYyhcbiAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vcHVibGljJylcbikpO1xuXG5hcHAudXNlKCcvJywgcm91dGVzKCkpO1xuLy8gY2F0Y2ggNDA0IGFuZCBmb3J3YXJkIHRvIGVycm9yIGhhbmRsZXJcbmFwcC51c2UoZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgdmFyIGVyciA9IG5ldyBFcnJvcignTm90IEZvdW5kJyk7XG4gIGVyci5zdGF0dXMgPSA0MDQ7XG4gIG5leHQoZXJyKTtcbn0pO1xuXG4vLyBlcnJvciBoYW5kbGVyc1xuXG5cbi8vIGRldmVsb3BtZW50IGVycm9yIGhhbmRsZXJcbi8vIHdpbGwgcHJpbnQgc3RhY2t0cmFjZVxuaWYgKGFwcC5nZXQoJ2VudicpID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gIGFwcC51c2UoZnVuY3Rpb24oZXJyLCByZXEsIHJlcywgbmV4dCkge1xuICAgIHJlcy5zdGF0dXMoZXJyLnN0YXR1cyB8fCA1MDApO1xuICAgIHJlcy5yZW5kZXIoJ2Vycm9yJywge1xuICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2UsXG4gICAgICBlcnJvcjogZXJyXG4gICAgfSk7XG4gIH0pO1xufVxuXG5cbi8vIHByb2R1Y3Rpb24gZXJyb3IgaGFuZGxlclxuLy8gbm8gc3RhY2t0cmFjZXMgbGVha2VkIHRvIHVzZXJcbmFwcC51c2UoZnVuY3Rpb24oZXJyLCByZXEsIHJlcywgbmV4dCkge1xuICByZXMuc3RhdHVzKGVyci5zdGF0dXMgfHwgNTAwKTtcbiAgcmVzLnJlbmRlcignZXJyb3InLCB7XG4gICAgbWVzc2FnZTogZXJyLm1lc3NhZ2UsXG4gICAgZXJyb3I6IHt9XG4gIH0pO1xufSk7XG5cbmNvbnN0IHJ1blNlcnZlciA9IChhcHApPT4ge1xuICBhcHAubGlzdGVuKFBPUlQsICgpPT4ge1xuICAgIGRlYnVnKGBMaXN0ZW5pbmcgb24gaHR0cDovL2xvY2FsaG9zdDoke1BPUlR9YCk7IFxuICAgIGlmIChfX0RFVl9fKVxuICAgICAgZGVidWcoYEhNUiBvbiBodHRwOi8vbG9jYWxob3N0OiR7Y29uZmlnLkJTX1BPUlR9YCk7XG4gIH0pOyAgXG59XG5cblxucnVuU2VydmVyKGFwcCk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZlci9hcHAuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJibHVlYmlyZFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJsdWViaXJkXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3NcIlxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcnZlLWZhdmljb25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzZXJ2ZS1mYXZpY29uXCJcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9yZ2FuXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9yZ2FuXCJcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJvZHktcGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29tcHJlc3Npb25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb21wcmVzc2lvblwiXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IElTX1BST0QgPSAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKTtcbi8vIGNvbnN0IElTX1BST0QgPSBmYWxzZTtcblxuY29uc3QgTk9ERV9QT1JUID0gNDIxMTtcbmNvbnN0IEJTX1BPUlQgICA9IDMwMDI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0Tk9ERV9QT1JULFxuXHRCU19QT1JULFxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2ZXIvY29uZmlnLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZGVidWdcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJkZWJ1Z1wiXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge1JvdXRlcn0gZnJvbSAnZXhwcmVzcydcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBBUElDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL2FwaSdcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3Rlc3NhY3Q6cm91dGVyJyk7XG52YXIgcm91dGVyID0gUm91dGVyKCk7XG5cblxuZnVuY3Rpb24gUmVuZGVyZXIocmVxLCByZXMsIG5leHQpe1xuXHRyZXMucmVuZGVyKCdpbmRleCcsIHtcblx0XHR0aXRsZTogJ1Rlc3NhY3QnLFxuXHRcdElTX1BST0Q6ICFfX0RFVl9fXG5cdH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZ3VyZVJvdXRlcyhjb25uZWN0aW9uKXtcblx0Ly8gUGluZyAoSGVhbHRoIENoZWNrKVxuXHRyb3V0ZXIuZ2V0KCcvcGluZycsIChyZXEsIHJlcyk9PiByZXMuc2VuZCgncG9uZycpKTtcblx0cm91dGVyLnVzZSgnL2FwaScsIEFQSUNvbnRyb2xsZXIpO1xuXHRcblx0Ly9ObyBTZXJ2ZXIgUmVuZGVyaW5nXG5cdHJvdXRlci5nZXQoJyonLFxuXHRcdFJlbmRlcmVyXG5cdCk7XG5cblx0XG5cdHJldHVybiByb3V0ZXJcblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZlci9yb3V0ZXMvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJsb2Rhc2hcIlxuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgZmFrZXIgZnJvbSAnZmFrZXInXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCdcblxudmFyIHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVJdGVtKG4gPSAxKXtcblx0cmV0dXJuIF8ucmFuZ2UobikubWFwKCh4LGkpPT4ge1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGZpbGVfbmFtZTogZmFrZXIubmFtZS5maXJzdE5hbWUoKSxcblx0XHRcdGZpbGVfdHlwZTogXy5zYW1wbGUoWydNb3ZpZScsICdUViBTaG93JywgJ0RvY3VtZW50YXJ5J10pLFxuXHRcdFx0ZmlsZV9pbWFnZTogJ2h0dHA6Ly9wbGFjZWhvbGQuaXQvNjB4ODAnLFxuXHRcdFx0Y2hhbm5lbDogXy5zYW1wbGUoWydaZWUgVFYnLCAnU2V0IE1heCcsICdaZWUgQ2luZW1hJywgJ1N0YXIgR29sZCddKSxcblx0XHRcdGR1cmF0aW9uOiBfLnNhbXBsZShfLnJhbmdlKDUwMDAsIDgwMDApKSxcblx0XHRcdGFzc2lnbmVkOiBfLnNhbXBsZShbJ0FzaHdpbicsICdBcHVydicsICdSb2hpdCcsIGZhbHNlLCBmYWxzZV0pLFxuXHRcdFx0c3RhdHVzOiBfLnNhbXBsZShbJ09uZ29pbmcnLCAnQ29tcGxldGVkJywgJ05vdCBEb25lJ10pLFxuXHRcdFx0dXBsb2FkX2RhdGU6IG1vbWVudChmYWtlci5kYXRlLnJlY2VudCgpKS5mb3JtYXQoJ0RELU1NLVlZJyksXG5cdFx0XHR0eF9kYXRlOiBtb21lbnQoZmFrZXIuZGF0ZS5yZWNlbnQoKSkuZm9ybWF0KCdERC1NTS1ZWScpXG5cdFx0fVxuXHR9KVxufVxuXG5cbnJvdXRlci5nZXQoJy9pdGVtcycsIChyZXEsIHJlcyk9PiB7XG5cdHZhciBuID0gcmVxLnF1ZXJ5Lm4gfHwgMTtcblx0dmFyIGRhdGEgPSBnZW5lcmF0ZUl0ZW0obik7XG5cblx0cmVzLmpzb24oZGF0YSk7XG59KVxuXG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL2FwaS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZha2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZmFrZXJcIlxuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9tZW50XCJcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=