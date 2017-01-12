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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGVkOTlmYjYzNWMwZWQyNzBmNzUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcHAuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmx1ZWJpcmRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcnZlLWZhdmljb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb21wcmVzc2lvblwiIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImRlYnVnXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibG9kYXNoXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb250cm9sbGVycy9hcGkuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmFrZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnRcIiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJQcm9taXNlIiwiZGVidWciLCJyZXF1aXJlIiwiYXBwIiwiSVNfUFJPRCIsIlBPUlQiLCJwcm9jZXNzIiwiZW52Iiwicm91dGVzIiwiZGVmYXVsdCIsImdldCIsImxvY2FscyIsInByZXR0eSIsInNldCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJ1c2UiLCJqc29uIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwic3RhdGljIiwicmVzb2x2ZSIsInJlcSIsInJlcyIsIm5leHQiLCJlcnIiLCJFcnJvciIsInN0YXR1cyIsInJlbmRlciIsIm1lc3NhZ2UiLCJlcnJvciIsInJ1blNlcnZlciIsImxpc3RlbiIsIkJTX1BPUlQiLCJtb2R1bGUiLCJleHBvcnRzIiwiTk9ERV9QT1JUIiwiY29uZmlndXJlUm91dGVzIiwicm91dGVyIiwiUmVuZGVyZXIiLCJ0aXRsZSIsImNvbm5lY3Rpb24iLCJzZW5kIiwiZ2VuZXJhdGVJdGVtIiwibiIsIl8iLCJyYW5nZSIsIm1hcCIsIngiLCJpIiwiZmlsZV9uYW1lIiwibmFtZSIsImZpcnN0TmFtZSIsImZpbGVfdHlwZSIsInNhbXBsZSIsImZpbGVfaW1hZ2UiLCJjaGFubmVsIiwiZHVyYXRpb24iLCJhc3NpZ25lZCIsInVwbG9hZF9kYXRlIiwiZGF0ZSIsInJlY2VudCIsImZvcm1hdCIsInR4X2RhdGUiLCJxdWVyeSIsImRhdGEiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Y0N0Q0EsdUM7QUFDQSx1QztBQUNBLG9DO0FBQ0EsNEM7QUFDQSxzQztBQUNBLDRDO0FBQ0EsMEM7QUFDQSwyQzs7QUFFQSx1QztBQUNBQSxRQUFPQyxPQUFQOzs7QUFHQSxLQUFJQyxRQUFTLG1CQUFBQyxDQUFRLEVBQVIsRUFBaUIsY0FBakIsQ0FBYjtBQUNBLEtBQUlDLE1BQU0sd0JBQVY7OztBQUdBLEtBQU1DLFVBQVcsb0JBQXlCLFlBQTFDO0FBQ0EsS0FBTUMsT0FBUUMsUUFBUUMsR0FBUixDQUFZRixJQUFaLElBQW9CLElBQWxDOztBQUVBLEtBQUlHLFNBQVMsbUJBQUFOLENBQVEsRUFBUixFQUFvQk8sT0FBakM7O0FBRUEsS0FBSU4sSUFBSU8sR0FBSixDQUFRLEtBQVIsTUFBbUIsYUFBdkIsRUFBc0M7QUFDcENQ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TUFBRixDQUFTLENBQUMsUUFBRCxFQUFXLE9BQVgsRUFBb0IsT0FBcEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsQ0FBVCxDQU5KO0FBT04zQixZQUFRa0IsRUFBRVMsTUFBRixDQUFTLENBQUMsU0FBRCxFQUFZLFdBQVosRUFBeUIsVUFBekIsQ0FBVCxDQVBGO0FBUU5LLGlCQUFhLHNCQUFPLGdCQUFNQyxJQUFOLENBQVdDLE1BQVgsRUFBUCxFQUE0QkMsTUFBNUIsQ0FBbUMsVUFBbkMsQ0FSUDtBQVNOQyxhQUFTLHNCQUFPLGdCQUFNSCxJQUFOLENBQVdDLE1BQVgsRUFBUCxFQUE0QkMsTUFBNUIsQ0FBbUMsVUFBbkMsQ0FUSCxFQUFQOztBQVdBLEdBWk0sQ0FBUDtBQWFBOzs7QUFHRHhCLFFBQU81QixHQUFQLENBQVcsUUFBWCxFQUFxQixVQUFDWSxHQUFELEVBQU1DLEdBQU4sRUFBYTtBQUNqQyxNQUFJcUIsSUFBSXRCLElBQUkwQyxLQUFKLENBQVVwQixDQUFWLElBQWUsQ0FBdkI7QUFDQSxNQUFJcUIsT0FBT3RCLGFBQWFDLENBQWIsQ0FBWDs7QUFFQXJCLE1BQUlOLElBQUosQ0FBU2dELElBQVQ7QUFDQSxFQUxELEU7OztBQVFlM0IsTzs7Ozs7OztBQy9CZixtQzs7Ozs7O0FDQUEsb0MiLCJmaWxlIjoic2VydmVyLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDhlZDk5ZmI2MzVjMGVkMjcwZjc1IiwiaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBmYXZpY29uIGZyb20gJ3NlcnZlLWZhdmljb24nXG5pbXBvcnQgbG9nZ2VyIGZyb20gJ21vcmdhbidcbmltcG9ydCBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcidcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJ1xuaW1wb3J0IGNvbXByZXNzaW9uIGZyb20gJ2NvbXByZXNzaW9uJ1xuXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJ1xuZ2xvYmFsLlByb21pc2UgPSBQcm9taXNlO1xuXG5cbnZhciBkZWJ1ZyAgPSByZXF1aXJlKCdkZWJ1ZycpKCd0ZXNzYWN0Om5vZGUnKTtcbnZhciBhcHAgPSBleHByZXNzKCk7XG5cblxuY29uc3QgSVNfUFJPRCA9IChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpO1xuY29uc3QgUE9SVCA9IChwcm9jZXNzLmVudi5QT1JUIHx8IDQyMDApO1xuXG52YXIgcm91dGVzID0gcmVxdWlyZSgnLi9yb3V0ZXMnKS5kZWZhdWx0O1xuXG5pZiAoYXBwLmdldCgnZW52JykgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgYXBwLmxvY2Fscy5wcmV0dHkgPSB0cnVlO1xufVxuYXBwLnNldCgndmlld3MnLCBwYXRoLmpvaW4oX19kaXJuYW1lLCAndmlld3MnKSk7XG5hcHAuc2V0KCd2aWV3IGVuZ2luZScsICdqYWRlJyk7XG5cbmFwcC5zZXQoJ2VudicsIElTX1BST0QgPyAncHJvZHVjdGlvbicgOiAnZGV2ZWxvcG1lbnQnKTtcbmFwcC51c2UobG9nZ2VyKCdkZXYnKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuYXBwLnVzZShjb29raWVQYXJzZXIoKSk7XG5hcHAudXNlKGNvbXByZXNzaW9uKCkpO1xuYXBwLnVzZSgnL3B1YmxpYycsIGV4cHJlc3Muc3RhdGljKFxuICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9wdWJsaWMnKVxuKSk7XG5cbmFwcC51c2UoJy8nLCByb3V0ZXMoKSk7XG4vLyBjYXRjaCA0MDQgYW5kIGZvcndhcmQgdG8gZXJyb3IgaGFuZGxlclxuYXBwLnVzZShmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuICB2YXIgZXJyID0gbmV3IEVycm9yKCdOb3QgRm91bmQnKTtcbiAgZXJyLnN0YXR1cyA9IDQwNDtcbiAgbmV4dChlcnIpO1xufSk7XG5cbi8vIGVycm9yIGhhbmRsZXJzXG5cblxuLy8gZGV2ZWxvcG1lbnQgZXJyb3IgaGFuZGxlclxuLy8gd2lsbCBwcmludCBzdGFja3RyYWNlXG5pZiAoYXBwLmdldCgnZW52JykgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgYXBwLnVzZShmdW5jdGlvbihlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzIHx8IDUwMCk7XG4gICAgcmVzLnJlbmRlcignZXJyb3InLCB7XG4gICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZSxcbiAgICAgIGVycm9yOiBlcnJcbiAgICB9KTtcbiAgfSk7XG59XG5cblxuLy8gcHJvZHVjdGlvbiBlcnJvciBoYW5kbGVyXG4vLyBubyBzdGFja3RyYWNlcyBsZWFrZWQgdG8gdXNlclxuYXBwLnVzZShmdW5jdGlvbihlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG4gIHJlcy5zdGF0dXMoZXJyLnN0YXR1cyB8fCA1MDApO1xuICByZXMucmVuZGVyKCdlcnJvcicsIHtcbiAgICBtZXNzYWdlOiBlcnIubWVzc2FnZSxcbiAgICBlcnJvcjoge31cbiAgfSk7XG59KTtcblxuY29uc3QgcnVuU2VydmVyID0gKGFwcCk9PiB7XG4gIGFwcC5saXN0ZW4oUE9SVCwgKCk9PiB7XG4gICAgZGVidWcoYExpc3RlbmluZyBvbiBodHRwOi8vbG9jYWxob3N0OiR7UE9SVH1gKTsgXG4gICAgaWYgKF9fREVWX18pXG4gICAgICBkZWJ1ZyhgSE1SIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6JHtjb25maWcuQlNfUE9SVH1gKTtcbiAgfSk7ICBcbn1cblxuXG5ydW5TZXJ2ZXIoYXBwKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmVyL2FwcC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJsdWViaXJkXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmx1ZWJpcmRcIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXRoXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VydmUtZmF2aWNvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNlcnZlLWZhdmljb25cIlxuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb3JnYW5cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtb3JnYW5cIlxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29va2llLXBhcnNlclwiXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb21wcmVzc2lvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvbXByZXNzaW9uXCJcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgSVNfUFJPRCA9IChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpO1xuLy8gY29uc3QgSVNfUFJPRCA9IGZhbHNlO1xuXG5jb25zdCBOT0RFX1BPUlQgPSA0MjExO1xuY29uc3QgQlNfUE9SVCAgID0gMzAwMjtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHROT0RFX1BPUlQsXG5cdEJTX1BPUlQsXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZlci9jb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImRlYnVnXCJcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7Um91dGVyfSBmcm9tICdleHByZXNzJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IEFQSUNvbnRyb2xsZXIgZnJvbSAnLi4vY29udHJvbGxlcnMvYXBpJ1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgndGVzc2FjdDpyb3V0ZXInKTtcbnZhciByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuXG5mdW5jdGlvbiBSZW5kZXJlcihyZXEsIHJlcywgbmV4dCl7XG5cdHJlcy5yZW5kZXIoJ2luZGV4Jywge1xuXHRcdHRpdGxlOiAnVGVzc2FjdCcsXG5cdFx0SVNfUFJPRDogIV9fREVWX19cblx0fSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uZmlndXJlUm91dGVzKGNvbm5lY3Rpb24pe1xuXHQvLyBQaW5nIChIZWFsdGggQ2hlY2spXG5cdHJvdXRlci5nZXQoJy9waW5nJywgKHJlcSwgcmVzKT0+IHJlcy5zZW5kKCdwb25nJykpO1xuXHRyb3V0ZXIudXNlKCcvYXBpJywgQVBJQ29udHJvbGxlcik7XG5cdFxuXHQvL05vIFNlcnZlciBSZW5kZXJpbmdcblx0cm91dGVyLmdldCgnKicsXG5cdFx0UmVuZGVyZXJcblx0KTtcblxuXHRcblx0cmV0dXJuIHJvdXRlclxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmVyL3JvdXRlcy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImxvZGFzaFwiXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge1JvdXRlcn0gZnJvbSAnZXhwcmVzcydcbmltcG9ydCBmYWtlciBmcm9tICdmYWtlcidcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuXG52YXIgcm91dGVyID0gbmV3IFJvdXRlcigpO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUl0ZW0obiA9IDEpe1xuXHRyZXR1cm4gXy5yYW5nZShuKS5tYXAoKHgsaSk9PiB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGZpbGVfbmFtZTogZmFrZXIubmFtZS5maXJzdE5hbWUoKSxcblx0XHRcdGZpbGVfdHlwZTogXy5zYW1wbGUoWydNb3ZpZScsICdUViBTaG93JywgJ0RvY3VtZW50YXJ5J10pLFxuXHRcdFx0ZmlsZV9pbWFnZTogJ2h0dHA6Ly9wbGFjZWhvbGQuaXQvNjB4ODAnLFxuXHRcdFx0Y2hhbm5lbDogXy5zYW1wbGUoWydaZWUgVFYnLCAnU2V0IE1heCcsICdaZWUgQ2luZW1hJywgJ1N0YXIgR29sZCddKSxcblx0XHRcdGR1cmF0aW9uOiBfLnNhbXBsZShfLnJhbmdlKDUwMDAsIDgwMDApKSxcblx0XHRcdGFzc2lnbmVkOiBfLnNhbXBsZShbJ0FzaHdpbicsICdBcHVydicsICdSb2hpdCcsIGZhbHNlLCBmYWxzZV0pLFxuXHRcdFx0c3RhdHVzOiBfLnNhbXBsZShbJ09uZ29pbmcnLCAnQ29tcGxldGVkJywgJ05vdCBEb25lJ10pLFxuXHRcdFx0dXBsb2FkX2RhdGU6IG1vbWVudChmYWtlci5kYXRlLnJlY2VudCgpKS5mb3JtYXQoJ0RELU1NLVlZJyksXG5cdFx0XHR0eF9kYXRlOiBtb21lbnQoZmFrZXIuZGF0ZS5yZWNlbnQoKSkuZm9ybWF0KCdERC1NTS1ZWScpXG5cdFx0fVxuXHR9KVxufVxuXG5cbnJvdXRlci5nZXQoJy9pdGVtcycsIChyZXEsIHJlcyk9PiB7XG5cdHZhciBuID0gcmVxLnF1ZXJ5Lm4gfHwgMTtcblx0dmFyIGRhdGEgPSBnZW5lcmF0ZUl0ZW0obik7XG5cblx0cmVzLmpzb24oZGF0YSk7XG59KVxuXG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL2FwaS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZha2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZmFrZXJcIlxuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9tZW50XCJcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=