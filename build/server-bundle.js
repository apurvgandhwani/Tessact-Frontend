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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';var _bluebird = __webpack_require__(2);var _bluebird2 = _interopRequireDefault(_bluebird);
	var _express = __webpack_require__(3);var _express2 = _interopRequireDefault(_express);
	var _path = __webpack_require__(4);var _path2 = _interopRequireDefault(_path);
	var _serveFavicon = __webpack_require__(5);var _serveFavicon2 = _interopRequireDefault(_serveFavicon);
	var _morgan = __webpack_require__(6);var _morgan2 = _interopRequireDefault(_morgan);
	var _cookieParser = __webpack_require__(7);var _cookieParser2 = _interopRequireDefault(_cookieParser);
	var _bodyParser = __webpack_require__(8);var _bodyParser2 = _interopRequireDefault(_bodyParser);
	var _compression = __webpack_require__(9);var _compression2 = _interopRequireDefault(_compression);
	var _config = __webpack_require__(10);var _config2 = _interopRequireDefault(_config);
	
	
	var _expressSession = __webpack_require__(11);var _expressSession2 = _interopRequireDefault(_expressSession);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}global.Promise = _bluebird2.default;
	
	var debug = __webpack_require__(12)('tessact:node');
	var app = (0, _express2.default)();
	
	var MySQLStore = __webpack_require__(13)(_expressSession2.default);
	
	var IS_PROD = ("development") === "production";
	var PORT = process.env.PORT || 4200;
	
	var routes = __webpack_require__(14).default;
	
	var DB_CONFIG = _config2.default.DB[IS_PROD ? 'production' : 'development'];
	
	if (app.get('env') === 'development') {
	    app.locals.pretty = true;
	}
	app.set('views', _path2.default.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	
	app.set('env', IS_PROD ? 'production' : 'development');
	app.use((0, _morgan2.default)('dev'));
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use(
	(0, _cookieParser2.default)(_config2.default.SESSION_SECRET));
	
	app.use((0, _compression2.default)());
	app.use(
	'/public',
	_express2.default.static(_path2.default.resolve(__dirname, './public')));
	
	
	app.use(
	(0, _expressSession2.default)({
	    resave: true,
	    saveUninitialized: true,
	    secret: _config2.default.SESSION_SECRET,
	    session: new MySQLStore(DB_CONFIG) }));
	
	
	
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("bluebird");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("serve-favicon");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("morgan");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("cookie-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("compression");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";var IS_PROD = ("development") === "production";
	// const IS_PROD = false;
	
	var NODE_PORT = 4211;
	var BS_PORT = 3002;
	
	module.exports = {
	    NODE_PORT: NODE_PORT,
	    BS_PORT: BS_PORT,
	
	    SESSION_SECRET:
	    't355@c7_S3cr37',
	
	    LOGIN_URL: "https://www.backend.trigger.tessact.com/auth/login/",
	
	    DB: {
	        production: {
	            host: 'localhost',
	            port: 3306,
	            user: 'root',
	            password: '',
	            database: 'tessact_db' },
	
	        development: {
	            host: 'localhost',
	            port: 3306,
	            user: 'root',
	            password: '',
	            database: 'tessact_db' } } };

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = require("express-session");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("debug");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = require("express-mysql-session");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =
	
	
	
	
	
	
	
	
	
	
	
	
	
	configureRoutes;var _express = __webpack_require__(3);var _lodash = __webpack_require__(15);var _lodash2 = _interopRequireDefault(_lodash);var _api = __webpack_require__(16);var _api2 = _interopRequireDefault(_api);var _auth = __webpack_require__(19);var AuthController = _interopRequireWildcard(_auth);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var debug = __webpack_require__(12)('tessact:router');var router = (0, _express.Router)();function Renderer(req, res, next) {res.render('index', { title: 'Tessact', IS_PROD: !(true) });}function configureRoutes(connection) {
	    // Ping (Health Check)
	    router.get('/ping', function (req, res) {return res.send('pong');});
	    router.use('/api', _api2.default);
	
	    router.post('/login', AuthController.LogIn);
	    router.get('/logout', AuthController.LogOut);
	
	    //No Server Rendering
	    router.get('*',
	    Renderer);
	
	
	    return router;
	
	}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = require("lodash");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _express = __webpack_require__(3);
	var _faker = __webpack_require__(17);var _faker2 = _interopRequireDefault(_faker);
	var _moment = __webpack_require__(18);var _moment2 = _interopRequireDefault(_moment);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
	
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = require("faker");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = require("moment");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.
	
	
	
	
	
	
	
	
	LogIn = LogIn;exports.
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	LogOut = LogOut;var _lodash = __webpack_require__(15);var _lodash2 = _interopRequireDefault(_lodash);var _superagent = __webpack_require__(20);var _superagent2 = _interopRequireDefault(_superagent);var _querystring = __webpack_require__(21);var _querystring2 = _interopRequireDefault(_querystring);var _url = __webpack_require__(22);var _url2 = _interopRequireDefault(_url);var _config = __webpack_require__(10);var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var debug = __webpack_require__(12)('tessact:controller:auth');function LogIn(req, res, next) {if (!!_lodash2.default.get(req, 'session.user.authToken')) {debug('Already logged in.');}var username = req.body.username || false;var password = req.body.password || false;if (!username) {var err = new Error('Username is invalid');debug(err);return res.status(403).json({ status: 'error', message: err.message });}if (!password) {var _err = new Error('Password is invalid');debug(_err);return res.status(403).json({ status: 'error', message: _err.message });}debug('Logging In... ' + username + ', ' + password);_superagent2.default.post(_config2.default.LOGIN_URL).send({ username: username, password: password }).then(function (resp) {debug('Response: ', resp.body);if (resp.body.auth_token) {req.session.username = username;req.session.authToken = resp.body.authToken;return res.json({ status: 'ok', user: { username: username } });}return Promise.reject(new Error(resp.body.non_field_errors[0]));}).catch(function (err) {return res.status(403).json({ status: 'error', message: err.message });});}function LogOut(req, res, next) {
		req.session.destroy();
		req.session = null;
		res.redirect('/');
	}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = require("superagent");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = require("querystring");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	module.exports = require("url");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTQ0MTQ5ZjlkODkxMjY0MzRmN2QiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcHAuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmx1ZWJpcmRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcnZlLWZhdmljb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb21wcmVzc2lvblwiIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRlYnVnXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1teXNxbC1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibG9kYXNoXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb250cm9sbGVycy9hcGkuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmFrZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL2F1dGguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3VwZXJhZ2VudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInF1ZXJ5c3RyaW5nXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXJsXCIiXSwibmFtZXMiOlsiZ2xvYmFsIiwiUHJvbWlzZSIsImRlYnVnIiwicmVxdWlyZSIsImFwcCIsIk15U1FMU3RvcmUiLCJJU19QUk9EIiwiUE9SVCIsInByb2Nlc3MiLCJlbnYiLCJyb3V0ZXMiLCJkZWZhdWx0IiwiREJfQ09ORklHIiwiREIiLCJnZXQiLCJsb2NhbHMiLCJwcmV0dHkiLCJzZXQiLCJqb2luIiwiX19kaXJuYW1lIiwidXNlIiwianNvbiIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsIlNFU1NJT05fU0VDUkVUIiwic3RhdGljIiwicmVzb2x2ZSIsInJlc2F2ZSIsInNhdmVVbmluaXRpYWxpemVkIiwic2VjcmV0Iiwic2Vzc2lvbiIsInJlcSIsInJlcyIsIm5leHQiLCJlcnIiLCJFcnJvciIsInN0YXR1cyIsInJlbmRlciIsIm1lc3NhZ2UiLCJlcnJvciIsInJ1blNlcnZlciIsImxpc3RlbiIsIkJTX1BPUlQiLCJtb2R1bGUiLCJleHBvcnRzIiwiTk9ERV9QT1JUIiwiTE9HSU5fVVJMIiwicHJvZHVjdGlvbiIsImhvc3QiLCJwb3J0IiwidXNlciIsInBhc3N3b3JkIiwiZGF0YWJhc2UiLCJkZXZlbG9wbWVudCIsImNvbmZpZ3VyZVJvdXRlcyIsIkF1dGhDb250cm9sbGVyIiwicm91dGVyIiwiUmVuZGVyZXIiLCJ0aXRsZSIsImNvbm5lY3Rpb24iLCJzZW5kIiwicG9zdCIsIkxvZ0luIiwiTG9nT3V0IiwiZ2VuZXJhdGVJdGVtIiwibiIsIl8iLCJyYW5nZSIsIm1hcCIsIngiLCJpIiwiZmlsZV9uYW1lIiwibmFtZSIsImZpcnN0TmFtZSIsImZpbGVfdHlwZSIsInNhbXBsZSIsImZpbGVfaW1hZ2UiLCJjaGFubmVsIiwiZHVyYXRpb24iLCJhc3NpZ25lZCIsInVwbG9hZF9kYXRlIiwiZGF0ZSIsInJlY2VudCIsImZvcm1hdCIsInR4X2RhdGUiLCJxdWVyeSIsImRhdGEiLCJ1c2VybmFtZSIsImJvZHkiLCJ0aGVuIiwicmVzcCIsImF1dGhfdG9rZW4iLCJhdXRoVG9rZW4iLCJyZWplY3QiLCJub25fZmllbGRfZXJyb3JzIiwiY2F0Y2giLCJkZXN0cm95IiwicmVkaXJlY3QiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Y0N0Q0EsdUM7QUFDQSx1QztBQUNBLG9DO0FBQ0EsNEM7QUFDQSxzQztBQUNBLDRDO0FBQ0EsMEM7QUFDQSwyQztBQUNBLHVDOzs7QUFHQSwrQyw0SkFGQUEsT0FBT0MsT0FBUDs7QUFJQSxLQUFJQyxRQUFTLG1CQUFBQyxDQUFRLEVBQVIsRUFBaUIsY0FBakIsQ0FBYjtBQUNBLEtBQUlDLE1BQU0sd0JBQVY7O0FBRUEsS0FBSUMsYUFBYSxtQkFBQUYsQ0FBUSxFQUFSLDJCQUFqQjs7QUFFQSxLQUFNRyxVQUFXLG9CQUF5QixZQUExQztBQUNBLEtBQU1DLE9BQVFDLFFBQVFDLEdBQVIsQ0FBWUYsSUFBWixJQUFvQixJQUFsQzs7QUFFQSxLQUFJRyxTQUFTLG1CQUFBUCxDQUFRLEVBQVIsRUFBb0JRLE9BQWpDOztBQUVBLEtBQU1DLFlBQVksaUJBQU9DLEVBQVAsQ0FBVVAsVUFBVSxZQUFWLEdBQXdCLGFBQWxDLENBQWxCOztBQUVBLEtBQUlGLElBQUlVLEdBQUosQ0FBUSxLQUFSLE1BQW1CLGFBQXZCLEVBQXNDO0FBQ2xDVixTQUFJVyxNQUFKLENBQVdDLE1BQVgsR0FBb0IsSUFBcEI7QUFDSDtBQUNEWixLQUFJYSxHQUFKLENBQVEsT0FBUixFQUFpQixlQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsT0FBckIsQ0FBakI7QUFDQWYsS0FBSWEsR0FBSixDQUFRLGFBQVIsRUFBdUIsTUFBdkI7O0FBRUFiLEtBQUlhLEdBQUosQ0FBUSxLQUFSLEVBQWVYLFVBQVUsWUFBVixHQUF5QixhQUF4QztBQUNBRixLQUFJZ0IsR0FBSixDQUFRLHNCQUFPLEtBQVAsQ0FBUjtBQUNBaEIsS0FBSWdCLEdBQUosQ0FBUSxxQkFBV0MsSUFBWCxFQUFSO0FBQ0FqQixLQUFJZ0IsR0FBSixDQUFRLHFCQUFXRSxVQUFYLENBQXNCLEVBQUVDLFVBQVUsSUFBWixFQUF0QixDQUFSO0FBQ0FuQixLQUFJZ0IsR0FBSjtBQUNJLDZCQUFhLGlCQUFPSSxjQUFwQixDQURKOztBQUdBcEIsS0FBSWdCLEdBQUosQ0FBUSw0QkFBUjtBQUNBaEIsS0FBSWdCLEdBQUo7QUFDSSxVQURKO0FBRUksbUJBQVFLLE1BQVIsQ0FBZ0IsZUFBS0MsT0FBTCxDQUFhUCxTQUFiLEVBQXdCLFVBQXhCLENBQWhCLENBRko7OztBQUtBZixLQUFJZ0IsR0FBSjtBQUNJLCtCQUFRO0FBQ0pPLGFBQVEsSUFESjtBQUVKQyx3QkFBbUIsSUFGZjtBQUdKQyxhQUFRLGlCQUFPTCxjQUhYO0FBSUpNLGNBQVMsSUFBSXpCLFVBQUosQ0FBZU8sU0FBZixDQUpMLEVBQVIsQ0FESjs7OztBQVNBUixLQUFJZ0IsR0FBSixDQUFRLEdBQVIsRUFBYVYsUUFBYjtBQUNBO0FBQ0FOLEtBQUlnQixHQUFKLENBQVEsVUFBU1csR0FBVCxFQUFjQyxHQUFkLEVBQW1CQyxJQUFuQixFQUF5QjtBQUM3QixTQUFJQyxNQUFNLElBQUlDLEtBQUosQ0FBVSxXQUFWLENBQVY7QUFDQUQsU0FBSUUsTUFBSixHQUFhLEdBQWI7QUFDQUgsVUFBS0MsR0FBTDtBQUNILEVBSkQ7O0FBTUE7OztBQUdBO0FBQ0E7QUFDQSxLQUFJOUIsSUFBSVUsR0FBSixDQUFRLEtBQVIsTUFBbUIsYUFBdkIsRUFBc0M7QUFDbENWLFNBQUlnQixHQUFKLENBQVEsVUFBU2MsR0FBVCxFQUFjSCxHQUFkLEVBQW1CQyxHQUFuQixFQUF3QkMsSUFBeEIsRUFBOEI7QUFDbENELGFBQUlJLE1BQUosQ0FBV0YsSUFBSUUsTUFBSixJQUFjLEdBQXpCO0FBQ0FKLGFBQUlLLE1BQUosQ0FBVyxPQUFYLEVBQW9CO0FBQ2hCQyxzQkFBU0osSUFBSUksT0FERztBQUVoQkMsb0JBQU9MLEdBRlMsRUFBcEI7O0FBSUgsTUFORDtBQU9IOzs7QUFHRDtBQUNBO0FBQ0E5QixLQUFJZ0IsR0FBSixDQUFRLFVBQVNjLEdBQVQsRUFBY0gsR0FBZCxFQUFtQkMsR0FBbkIsRUFBd0JDLElBQXhCLEVBQThCO0FBQ2xDRCxTQUFJSSxNQUFKLENBQVdGLElBQUlFLE1BQUosSUFBYyxHQUF6QjtBQUNBSixTQUFJSyxNQUFKLENBQVcsT0FBWCxFQUFvQjtBQUNoQkMsa0JBQVNKLElBQUlJLE9BREc7QUFFaEJDLGdCQUFPLEVBRlMsRUFBcEI7O0FBSUgsRUFORDs7QUFRQSxLQUFNQyxZQUFZLFNBQVpBLFNBQVksQ0FBQ3BDLEdBQUQsRUFBUTtBQUN0QkEsU0FBSXFDLE1BQUosQ0FBV2xDLElBQVgsRUFBaUIsWUFBSztBQUNsQkwsa0RBQXVDSyxJQUF2QztBQUNBLGFBQUksSUFBSjtBQUNJTCw0Q0FBaUMsaUJBQU93QyxPQUF4QztBQUNQLE1BSkQ7QUFLSCxFQU5EOzs7QUFTQUYsV0FBVXBDLEdBQVY7O0FBRUF1QyxRQUFPQyxPQUFQLEdBQWlCeEMsR0FBakIsQzs7Ozs7O0FDbEdBLHNDOzs7Ozs7QUNBQSxxQzs7Ozs7O0FDQUEsa0M7Ozs7OztBQ0FBLDJDOzs7Ozs7QUNBQSxvQzs7Ozs7O0FDQUEsMkM7Ozs7OztBQ0FBLHlDOzs7Ozs7QUNBQSx5Qzs7Ozs7O2NDQUEsSUFBTUUsVUFBVyxvQkFBeUIsWUFBMUM7QUFDQTs7QUFFQSxLQUFNdUMsWUFBWSxJQUFsQjtBQUNBLEtBQU1ILFVBQVksSUFBbEI7O0FBRUFDLFFBQU9DLE9BQVAsR0FBaUI7QUFDYkMseUJBRGE7QUFFYkgscUJBRmE7O0FBSWJsQjtBQUNJLHFCQUxTOztBQU9ic0IsZ0JBQVcscURBUEU7O0FBU2JqQyxTQUFJO0FBQ0FrQyxxQkFBWTtBQUNSQyxtQkFBTSxXQURFO0FBRVJDLG1CQUFNLElBRkU7QUFHUkMsbUJBQU0sTUFIRTtBQUlSQyx1QkFBVSxFQUpGO0FBS1JDLHVCQUFVLFlBTEYsRUFEWjs7QUFRQUMsc0JBQWE7QUFDVEwsbUJBQU0sV0FERztBQUVUQyxtQkFBTSxJQUZHO0FBR1RDLG1CQUFNLE1BSEc7QUFJVEMsdUJBQVUsRUFKRDtBQUtUQyx1QkFBVSxZQUxELEVBUmIsRUFUUyxFQUFqQixDOzs7Ozs7QUNOQSw2Qzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2N3QkUsZ0IsQ0FkeEIsc0NBQ0Esc0MsK0NBQ0EsbUMseUNBQ0Esb0MsSUFBWUMsYywrWEFDWixJQUFJckQsUUFBUSxtQkFBQUMsQ0FBUSxFQUFSLEVBQWlCLGdCQUFqQixDQUFaLENBQ0EsSUFBSXFELFNBQVMsc0JBQWIsQ0FFQSxTQUFTQyxRQUFULENBQWtCMUIsR0FBbEIsRUFBdUJDLEdBQXZCLEVBQTRCQyxJQUE1QixFQUFpQyxDQUNoQ0QsSUFBSUssTUFBSixDQUFXLE9BQVgsRUFBb0IsRUFDbkJxQixPQUFPLFNBRFksRUFFbkJwRCxTQUFTLENBQUMsTUFGUyxFQUFwQixFQUlBLENBRWMsU0FBU2dELGVBQVQsQ0FBeUJLLFVBQXpCLEVBQW9DO0FBQy9DO0FBQ0FILFlBQU8xQyxHQUFQLENBQVcsT0FBWCxFQUFvQixVQUFDaUIsR0FBRCxFQUFNQyxHQUFOLFVBQWFBLElBQUk0QixJQUFKLENBQVMsTUFBVCxDQUFiLEVBQXBCO0FBQ0FKLFlBQU9wQyxHQUFQLENBQVcsTUFBWDs7QUFFQW9DLFlBQU9LLElBQVAsQ0FBWSxRQUFaLEVBQXNCTixlQUFlTyxLQUFyQztBQUNBTixZQUFPMUMsR0FBUCxDQUFXLFNBQVgsRUFBc0J5QyxlQUFlUSxNQUFyQzs7QUFFQTtBQUNBUCxZQUFPMUMsR0FBUCxDQUFXLEdBQVg7QUFDSTJDLGFBREo7OztBQUlBLFlBQU9ELE1BQVA7O0FBRUgsRTs7Ozs7O0FDN0JELG9DOzs7Ozs7cUhDQUE7QUFDQSxzQztBQUNBLHVDOztBQUVBLEtBQUlBLFNBQVMscUJBQWI7O0FBRUEsVUFBU1EsWUFBVCxHQUE0QixLQUFOQyxDQUFNLHVFQUFGLENBQUU7QUFDM0IsVUFBT0MsRUFBRUMsS0FBRixDQUFRRixDQUFSLEVBQVdHLEdBQVgsQ0FBZSxVQUFDQyxDQUFELEVBQUdDLENBQUgsRUFBUTtBQUM3QixZQUFPO0FBQ0dDLGtCQUFXLGdCQUFNQyxJQUFOLENBQVdDLFNBQVgsRUFEZDtBQUVHQyxrQkFBV1IsRUFBRVMsTUFBRixDQUFTLENBQUMsT0FBRCxFQUFVLFNBQVYsRUFBcUIsYUFBckIsQ0FBVCxDQUZkO0FBR0dDLG1CQUFZLDJCQUhmO0FBSUdDLGdCQUFTWCxFQUFFUyxNQUFGLENBQVMsQ0FBQyxRQUFELEVBQVcsU0FBWCxFQUFzQixZQUF0QixFQUFvQyxXQUFwQyxDQUFULENBSlo7QUFLR0csaUJBQVVaLEVBQUVTLE1BQUYsQ0FBU1QsRUFBRUMsS0FBRixDQUFRLElBQVIsRUFBYyxJQUFkLENBQVQsQ0FMYjtBQU1HWSxpQkFBVWIsRUFBRVMsTUFBRixDQUFTLENBQUMsUUFBRCxFQUFXLE9BQVgsRUFBb0IsT0FBcEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsQ0FBVCxDQU5iO0FBT0d2QyxlQUFROEIsRUFBRVMsTUFBRixDQUFTLENBQUMsU0FBRCxFQUFZLFdBQVosRUFBeUIsVUFBekIsQ0FBVCxDQVBYO0FBUUdLLG9CQUFhLHNCQUFPLGdCQUFNQyxJQUFOLENBQVdDLE1BQVgsRUFBUCxFQUE0QkMsTUFBNUIsQ0FBbUMsVUFBbkMsQ0FSaEI7QUFTR0MsZ0JBQVMsc0JBQU8sZ0JBQU1ILElBQU4sQ0FBV0MsTUFBWCxFQUFQLEVBQTRCQyxNQUE1QixDQUFtQyxVQUFuQyxDQVRaLEVBQVA7O0FBV0EsSUFaTSxDQUFQO0FBYUE7OztBQUdEM0IsUUFBTzFDLEdBQVAsQ0FBVyxRQUFYLEVBQXFCLFVBQUNpQixHQUFELEVBQU1DLEdBQU4sRUFBYTtBQUNqQyxPQUFJaUMsSUFBSWxDLElBQUlzRCxLQUFKLENBQVVwQixDQUFWLElBQWUsQ0FBdkI7QUFDQSxPQUFJcUIsT0FBT3RCLGFBQWFDLENBQWIsQ0FBWDs7QUFFQWpDLE9BQUlYLElBQUosQ0FBU2lFLElBQVQ7QUFDQSxFQUxELEU7OztBQVFlOUIsTzs7Ozs7OztBQy9CZixtQzs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7Ozs7OztBQ1NnQk0sTSxHQUFBQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdEQUMsTyxHQUFBQSxNLENBakVoQixzQywrQ0FDQSwwQyx1REFDQSwyQyx5REFDQSxtQyx5Q0FFQSxzQyw0SUFFQSxJQUFNN0QsUUFBUSxtQkFBQUMsQ0FBUSxFQUFSLEVBQWlCLHlCQUFqQixDQUFkLENBRU8sU0FBUzJELEtBQVQsQ0FBZS9CLEdBQWYsRUFBb0JDLEdBQXBCLEVBQXlCQyxJQUF6QixFQUE4QixDQUNwQyxJQUFLLENBQUMsQ0FBQyxpQkFBRW5CLEdBQUYsQ0FBTWlCLEdBQU4sRUFBVyx3QkFBWCxDQUFQLEVBQTZDLENBQzVDN0IsTUFBTSxvQkFBTixFQUNBLENBQ0QsSUFBTXFGLFdBQVd4RCxJQUFJeUQsSUFBSixDQUFTRCxRQUFULElBQXFCLEtBQXRDLENBQ0EsSUFBTXBDLFdBQVdwQixJQUFJeUQsSUFBSixDQUFTckMsUUFBVCxJQUFxQixLQUF0QyxDQUVBLElBQUksQ0FBQ29DLFFBQUwsRUFBYyxDQUNiLElBQUlyRCxNQUFNLElBQUlDLEtBQUosQ0FBVSxxQkFBVixDQUFWLENBQ0FqQyxNQUFNZ0MsR0FBTixFQUNBLE9BQU9GLElBQUlJLE1BQUosQ0FBVyxHQUFYLEVBQWdCZixJQUFoQixDQUFxQixFQUMzQmUsUUFBUSxPQURtQixFQUUzQkUsU0FBU0osSUFBSUksT0FGYyxFQUFyQixDQUFQLENBSUEsQ0FFRCxJQUFJLENBQUNhLFFBQUwsRUFBYyxDQUNiLElBQUlqQixPQUFNLElBQUlDLEtBQUosQ0FBVSxxQkFBVixDQUFWLENBQ0FqQyxNQUFNZ0MsSUFBTixFQUNBLE9BQU9GLElBQUlJLE1BQUosQ0FBVyxHQUFYLEVBQWdCZixJQUFoQixDQUFxQixFQUMzQmUsUUFBUSxPQURtQixFQUUzQkUsU0FBU0osS0FBSUksT0FGYyxFQUFyQixDQUFQLENBSUEsQ0FFRHBDLHlCQUF1QnFGLFFBQXZCLFVBQW9DcEMsUUFBcEMsRUFFQSxxQkFBUVUsSUFBUixDQUFhLGlCQUFPZixTQUFwQixFQUNFYyxJQURGLENBQ08sRUFBQzJCLGtCQUFELEVBQVdwQyxrQkFBWCxFQURQLEVBRUVzQyxJQUZGLENBRU8sZ0JBQU8sQ0FDWnZGLE1BQU0sWUFBTixFQUFvQndGLEtBQUtGLElBQXpCLEVBQ0EsSUFBSUUsS0FBS0YsSUFBTCxDQUFVRyxVQUFkLEVBQXlCLENBQ3hCNUQsSUFBSUQsT0FBSixDQUFZeUQsUUFBWixHQUF1QkEsUUFBdkIsQ0FDQXhELElBQUlELE9BQUosQ0FBWThELFNBQVosR0FBd0JGLEtBQUtGLElBQUwsQ0FBVUksU0FBbEMsQ0FDQSxPQUFPNUQsSUFBSVgsSUFBSixDQUFTLEVBQ2ZlLFFBQVEsSUFETyxFQUVmYyxNQUFNLEVBQ0xxQyxrQkFESyxFQUZTLEVBQVQsQ0FBUCxDQU1BLENBRUQsT0FBT3RGLFFBQVE0RixNQUFSLENBQ04sSUFBSTFELEtBQUosQ0FBV3VELEtBQUtGLElBQUwsQ0FBVU0sZ0JBQVYsQ0FBMkIsQ0FBM0IsQ0FBWCxDQURNLENBQVAsQ0FJQSxDQW5CRixFQW1CSUMsS0FuQkosQ0FtQlUsZUFBTSxDQUNkLE9BQU8vRCxJQUFJSSxNQUFKLENBQVcsR0FBWCxFQUFnQmYsSUFBaEIsQ0FBcUIsRUFDM0JlLFFBQVEsT0FEbUIsRUFFM0JFLFNBQVNKLElBQUlJLE9BRmMsRUFBckIsQ0FBUCxDQUlBLENBeEJGLEVBMEJBLENBR00sU0FBU3lCLE1BQVQsQ0FBZ0JoQyxHQUFoQixFQUFxQkMsR0FBckIsRUFBMEJDLElBQTFCLEVBQStCO0FBQ3JDRixNQUFJRCxPQUFKLENBQVlrRSxPQUFaO0FBQ0FqRSxNQUFJRCxPQUFKLEdBQWMsSUFBZDtBQUNBRSxNQUFJaUUsUUFBSixDQUFhLEdBQWI7QUFDQSxFOzs7Ozs7QUNyRUQsd0M7Ozs7OztBQ0FBLHlDOzs7Ozs7QUNBQSxpQyIsImZpbGUiOiJzZXJ2ZXItYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTQ0MTQ5ZjlkODkxMjY0MzRmN2QiLCJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCdcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGZhdmljb24gZnJvbSAnc2VydmUtZmF2aWNvbidcbmltcG9ydCBsb2dnZXIgZnJvbSAnbW9yZ2FuJ1xuaW1wb3J0IGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJ1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInXG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSAnY29tcHJlc3Npb24nXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJ1xuZ2xvYmFsLlByb21pc2UgPSBQcm9taXNlO1xuXG5pbXBvcnQgc2Vzc2lvbiBmcm9tICdleHByZXNzLXNlc3Npb24nXG5cbnZhciBkZWJ1ZyAgPSByZXF1aXJlKCdkZWJ1ZycpKCd0ZXNzYWN0Om5vZGUnKTtcbnZhciBhcHAgPSBleHByZXNzKCk7XG5cbnZhciBNeVNRTFN0b3JlID0gcmVxdWlyZSgnZXhwcmVzcy1teXNxbC1zZXNzaW9uJykoc2Vzc2lvbik7XG5cbmNvbnN0IElTX1BST0QgPSAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKTtcbmNvbnN0IFBPUlQgPSAocHJvY2Vzcy5lbnYuUE9SVCB8fCA0MjAwKTtcblxudmFyIHJvdXRlcyA9IHJlcXVpcmUoJy4vcm91dGVzJykuZGVmYXVsdDtcblxuY29uc3QgREJfQ09ORklHID0gY29uZmlnLkRCW0lTX1BST0QgPyAncHJvZHVjdGlvbic6ICdkZXZlbG9wbWVudCddXG5cbmlmIChhcHAuZ2V0KCdlbnYnKSA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgIGFwcC5sb2NhbHMucHJldHR5ID0gdHJ1ZTtcbn1cbmFwcC5zZXQoJ3ZpZXdzJywgcGF0aC5qb2luKF9fZGlybmFtZSwgJ3ZpZXdzJykpO1xuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnamFkZScpO1xuXG5hcHAuc2V0KCdlbnYnLCBJU19QUk9EID8gJ3Byb2R1Y3Rpb24nIDogJ2RldmVsb3BtZW50Jyk7XG5hcHAudXNlKGxvZ2dlcignZGV2JykpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcbmFwcC51c2UoXG4gICAgY29va2llUGFyc2VyKGNvbmZpZy5TRVNTSU9OX1NFQ1JFVClcbik7XG5hcHAudXNlKGNvbXByZXNzaW9uKCkpO1xuYXBwLnVzZShcbiAgICAnL3B1YmxpYycsXG4gICAgZXhwcmVzcy5zdGF0aWMoIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3B1YmxpYycpKVxuKTtcblxuYXBwLnVzZShcbiAgICBzZXNzaW9uKHtcbiAgICAgICAgcmVzYXZlOiB0cnVlLFxuICAgICAgICBzYXZlVW5pbml0aWFsaXplZDogdHJ1ZSxcbiAgICAgICAgc2VjcmV0OiBjb25maWcuU0VTU0lPTl9TRUNSRVQsXG4gICAgICAgIHNlc3Npb246IG5ldyBNeVNRTFN0b3JlKERCX0NPTkZJRylcbiAgICB9KVxuKVxuXG5hcHAudXNlKCcvJywgcm91dGVzKCkpO1xuLy8gY2F0Y2ggNDA0IGFuZCBmb3J3YXJkIHRvIGVycm9yIGhhbmRsZXJcbmFwcC51c2UoZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdOb3QgRm91bmQnKTtcbiAgICBlcnIuc3RhdHVzID0gNDA0O1xuICAgIG5leHQoZXJyKTtcbn0pO1xuXG4vLyBlcnJvciBoYW5kbGVyc1xuXG5cbi8vIGRldmVsb3BtZW50IGVycm9yIGhhbmRsZXJcbi8vIHdpbGwgcHJpbnQgc3RhY2t0cmFjZVxuaWYgKGFwcC5nZXQoJ2VudicpID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgYXBwLnVzZShmdW5jdGlvbihlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHJlcy5zdGF0dXMoZXJyLnN0YXR1cyB8fCA1MDApO1xuICAgICAgICByZXMucmVuZGVyKCdlcnJvcicsIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlLFxuICAgICAgICAgICAgZXJyb3I6IGVyclxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuXG4vLyBwcm9kdWN0aW9uIGVycm9yIGhhbmRsZXJcbi8vIG5vIHN0YWNrdHJhY2VzIGxlYWtlZCB0byB1c2VyXG5hcHAudXNlKGZ1bmN0aW9uKGVyciwgcmVxLCByZXMsIG5leHQpIHtcbiAgICByZXMuc3RhdHVzKGVyci5zdGF0dXMgfHwgNTAwKTtcbiAgICByZXMucmVuZGVyKCdlcnJvcicsIHtcbiAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2UsXG4gICAgICAgIGVycm9yOiB7fVxuICAgIH0pO1xufSk7XG5cbmNvbnN0IHJ1blNlcnZlciA9IChhcHApPT4ge1xuICAgIGFwcC5saXN0ZW4oUE9SVCwgKCk9PiB7XG4gICAgICAgIGRlYnVnKGBMaXN0ZW5pbmcgb24gaHR0cDovL2xvY2FsaG9zdDoke1BPUlR9YCk7XG4gICAgICAgIGlmIChfX0RFVl9fKVxuICAgICAgICAgICAgZGVidWcoYEhNUiBvbiBodHRwOi8vbG9jYWxob3N0OiR7Y29uZmlnLkJTX1BPUlR9YCk7XG4gICAgfSk7XG59XG5cblxucnVuU2VydmVyKGFwcCk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZlci9hcHAuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJibHVlYmlyZFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJsdWViaXJkXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3NcIlxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcnZlLWZhdmljb25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzZXJ2ZS1mYXZpY29uXCJcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9yZ2FuXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9yZ2FuXCJcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJvZHktcGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29tcHJlc3Npb25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb21wcmVzc2lvblwiXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IElTX1BST0QgPSAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKTtcbi8vIGNvbnN0IElTX1BST0QgPSBmYWxzZTtcblxuY29uc3QgTk9ERV9QT1JUID0gNDIxMTtcbmNvbnN0IEJTX1BPUlQgICA9IDMwMDI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIE5PREVfUE9SVCxcbiAgICBCU19QT1JULFxuXG4gICAgU0VTU0lPTl9TRUNSRVQ6XG4gICAgICAgICd0MzU1QGM3X1MzY3IzNycsXG5cbiAgICBMT0dJTl9VUkw6IFwiaHR0cHM6Ly93d3cuYmFja2VuZC50cmlnZ2VyLnRlc3NhY3QuY29tL2F1dGgvbG9naW4vXCIsXG5cbiAgICBEQjoge1xuICAgICAgICBwcm9kdWN0aW9uOiB7XG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6IDMzMDYsXG4gICAgICAgICAgICB1c2VyOiAncm9vdCcsXG4gICAgICAgICAgICBwYXNzd29yZDogJycsXG4gICAgICAgICAgICBkYXRhYmFzZTogJ3Rlc3NhY3RfZGInXG4gICAgICAgIH0sXG4gICAgICAgIGRldmVsb3BtZW50OiB7XG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6IDMzMDYsXG4gICAgICAgICAgICB1c2VyOiAncm9vdCcsXG4gICAgICAgICAgICBwYXNzd29yZDogJycsXG4gICAgICAgICAgICBkYXRhYmFzZTogJ3Rlc3NhY3RfZGInXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmVyL2NvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImRlYnVnXCJcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3MtbXlzcWwtc2Vzc2lvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3MtbXlzcWwtc2Vzc2lvblwiXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge1JvdXRlcn0gZnJvbSAnZXhwcmVzcydcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBBUElDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL2FwaSdcbmltcG9ydCAqIGFzIEF1dGhDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL2F1dGgnXG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCd0ZXNzYWN0OnJvdXRlcicpO1xudmFyIHJvdXRlciA9IFJvdXRlcigpO1xuXG5mdW5jdGlvbiBSZW5kZXJlcihyZXEsIHJlcywgbmV4dCl7XG5cdHJlcy5yZW5kZXIoJ2luZGV4Jywge1xuXHRcdHRpdGxlOiAnVGVzc2FjdCcsXG5cdFx0SVNfUFJPRDogIV9fREVWX19cblx0fSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uZmlndXJlUm91dGVzKGNvbm5lY3Rpb24pe1xuICAgIC8vIFBpbmcgKEhlYWx0aCBDaGVjaylcbiAgICByb3V0ZXIuZ2V0KCcvcGluZycsIChyZXEsIHJlcyk9PiByZXMuc2VuZCgncG9uZycpKTtcbiAgICByb3V0ZXIudXNlKCcvYXBpJywgQVBJQ29udHJvbGxlcik7XG5cbiAgICByb3V0ZXIucG9zdCgnL2xvZ2luJywgQXV0aENvbnRyb2xsZXIuTG9nSW4pO1xuICAgIHJvdXRlci5nZXQoJy9sb2dvdXQnLCBBdXRoQ29udHJvbGxlci5Mb2dPdXQpO1xuXG4gICAgLy9ObyBTZXJ2ZXIgUmVuZGVyaW5nXG4gICAgcm91dGVyLmdldCgnKicsXG4gICAgICAgIFJlbmRlcmVyXG4gICAgKTtcblxuICAgIHJldHVybiByb3V0ZXJcblxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmVyL3JvdXRlcy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImxvZGFzaFwiXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge1JvdXRlcn0gZnJvbSAnZXhwcmVzcydcbmltcG9ydCBmYWtlciBmcm9tICdmYWtlcidcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuXG52YXIgcm91dGVyID0gbmV3IFJvdXRlcigpO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUl0ZW0obiA9IDEpe1xuXHRyZXR1cm4gXy5yYW5nZShuKS5tYXAoKHgsaSk9PiB7XG5cdFx0cmV0dXJuIHtcbiAgICAgICAgICAgIGZpbGVfbmFtZTogZmFrZXIubmFtZS5maXJzdE5hbWUoKSxcbiAgICAgICAgICAgIGZpbGVfdHlwZTogXy5zYW1wbGUoWydNb3ZpZScsICdUViBTaG93JywgJ0RvY3VtZW50YXJ5J10pLFxuICAgICAgICAgICAgZmlsZV9pbWFnZTogJ2h0dHA6Ly9wbGFjZWhvbGQuaXQvNjB4ODAnLFxuICAgICAgICAgICAgY2hhbm5lbDogXy5zYW1wbGUoWydaZWUgVFYnLCAnU2V0IE1heCcsICdaZWUgQ2luZW1hJywgJ1N0YXIgR29sZCddKSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBfLnNhbXBsZShfLnJhbmdlKDUwMDAsIDgwMDApKSxcbiAgICAgICAgICAgIGFzc2lnbmVkOiBfLnNhbXBsZShbJ0FzaHdpbicsICdBcHVydicsICdSb2hpdCcsIGZhbHNlLCBmYWxzZV0pLFxuICAgICAgICAgICAgc3RhdHVzOiBfLnNhbXBsZShbJ09uZ29pbmcnLCAnQ29tcGxldGVkJywgJ05vdCBEb25lJ10pLFxuICAgICAgICAgICAgdXBsb2FkX2RhdGU6IG1vbWVudChmYWtlci5kYXRlLnJlY2VudCgpKS5mb3JtYXQoJ0RELU1NLVlZJyksXG4gICAgICAgICAgICB0eF9kYXRlOiBtb21lbnQoZmFrZXIuZGF0ZS5yZWNlbnQoKSkuZm9ybWF0KCdERC1NTS1ZWScpXG5cdFx0fVxuXHR9KVxufVxuXG5cbnJvdXRlci5nZXQoJy9pdGVtcycsIChyZXEsIHJlcyk9PiB7XG5cdHZhciBuID0gcmVxLnF1ZXJ5Lm4gfHwgMTtcblx0dmFyIGRhdGEgPSBnZW5lcmF0ZUl0ZW0obik7XG5cblx0cmVzLmpzb24oZGF0YSk7XG59KVxuXG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL2FwaS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZha2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZmFrZXJcIlxuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9tZW50XCJcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3N1cGVyYWdlbnQnXG5pbXBvcnQgcXMgZnJvbSAncXVlcnlzdHJpbmcnXG5pbXBvcnQgdXJsIGZyb20gJ3VybCdcblxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgndGVzc2FjdDpjb250cm9sbGVyOmF1dGgnKVxuXG5leHBvcnQgZnVuY3Rpb24gTG9nSW4ocmVxLCByZXMsIG5leHQpe1xuXHRpZiAoICEhXy5nZXQocmVxLCAnc2Vzc2lvbi51c2VyLmF1dGhUb2tlbicpICl7XG5cdFx0ZGVidWcoJ0FscmVhZHkgbG9nZ2VkIGluLicpXG5cdH1cblx0Y29uc3QgdXNlcm5hbWUgPSByZXEuYm9keS51c2VybmFtZSB8fCBmYWxzZVxuXHRjb25zdCBwYXNzd29yZCA9IHJlcS5ib2R5LnBhc3N3b3JkIHx8IGZhbHNlXG5cblx0aWYgKCF1c2VybmFtZSl7XG5cdFx0bGV0IGVyciA9IG5ldyBFcnJvcignVXNlcm5hbWUgaXMgaW52YWxpZCcpXG5cdFx0ZGVidWcoZXJyKVxuXHRcdHJldHVybiByZXMuc3RhdHVzKDQwMykuanNvbih7XG5cdFx0XHRzdGF0dXM6ICdlcnJvcicsXG5cdFx0XHRtZXNzYWdlOiBlcnIubWVzc2FnZVxuXHRcdH0pXG5cdH1cblxuXHRpZiAoIXBhc3N3b3JkKXtcblx0XHRsZXQgZXJyID0gbmV3IEVycm9yKCdQYXNzd29yZCBpcyBpbnZhbGlkJylcblx0XHRkZWJ1ZyhlcnIpXG5cdFx0cmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5qc29uKHtcblx0XHRcdHN0YXR1czogJ2Vycm9yJyxcblx0XHRcdG1lc3NhZ2U6IGVyci5tZXNzYWdlXG5cdFx0fSlcblx0fVxuXG5cdGRlYnVnKGBMb2dnaW5nIEluLi4uICR7dXNlcm5hbWV9LCAke3Bhc3N3b3JkfWApXG5cblx0cmVxdWVzdC5wb3N0KGNvbmZpZy5MT0dJTl9VUkwpXG5cdFx0LnNlbmQoe3VzZXJuYW1lLCBwYXNzd29yZH0pXG5cdFx0LnRoZW4ocmVzcD0+IHtcblx0XHRcdGRlYnVnKCdSZXNwb25zZTogJywgcmVzcC5ib2R5KVxuXHRcdFx0aWYgKHJlc3AuYm9keS5hdXRoX3Rva2VuKXtcblx0XHRcdFx0cmVxLnNlc3Npb24udXNlcm5hbWUgPSB1c2VybmFtZVxuXHRcdFx0XHRyZXEuc2Vzc2lvbi5hdXRoVG9rZW4gPSByZXNwLmJvZHkuYXV0aFRva2VuXG5cdFx0XHRcdHJldHVybiByZXMuanNvbih7XG5cdFx0XHRcdFx0c3RhdHVzOiAnb2snLFxuXHRcdFx0XHRcdHVzZXI6IHtcblx0XHRcdFx0XHRcdHVzZXJuYW1lXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXG5cdFx0XHRcdG5ldyBFcnJvciggcmVzcC5ib2R5Lm5vbl9maWVsZF9lcnJvcnNbMF0gKVxuXHRcdFx0KVxuXG5cdFx0fSkuY2F0Y2goZXJyPT4ge1xuXHRcdFx0cmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5qc29uKHtcblx0XHRcdFx0c3RhdHVzOiAnZXJyb3InLFxuXHRcdFx0XHRtZXNzYWdlOiBlcnIubWVzc2FnZVxuXHRcdFx0fSlcblx0XHR9KVxuXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIExvZ091dChyZXEsIHJlcywgbmV4dCl7XG5cdHJlcS5zZXNzaW9uLmRlc3Ryb3koKVxuXHRyZXEuc2Vzc2lvbiA9IG51bGxcblx0cmVzLnJlZGlyZWN0KCcvJylcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL2F1dGguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdXBlcmFnZW50XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwic3VwZXJhZ2VudFwiXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJxdWVyeXN0cmluZ1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInF1ZXJ5c3RyaW5nXCJcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVybFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInVybFwiXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9