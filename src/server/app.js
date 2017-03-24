import Promise from 'bluebird'
import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import compression from 'compression'
import config from './config'
global.Promise = Promise;

import session from 'express-session'

var debug  = require('debug')('tessact:node');
var app = express();

var MySQLStore = require('express-mysql-session')(session);

const IS_PROD = (process.env.NODE_ENV === "production");
const PORT = (process.env.PORT || 4200);

var routes = require('./routes').default;

const DB_CONFIG = config.DB[IS_PROD ? 'production': 'development']

if (app.get('env') === 'development') {
    app.locals.pretty = true;
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('env', IS_PROD ? 'production' : 'development');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cookieParser(config.SESSION_SECRET)
);
app.use(compression());
app.use(
    '/public',
    express.static( path.resolve(__dirname, './public'))
);

app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: config.SESSION_SECRET,
        session: new MySQLStore(DB_CONFIG)
    })
)

app.use('/', routes());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

const runServer = (app)=> {
    app.listen(PORT, ()=> {
        debug(`Listening on http://localhost:${PORT}`);
        if (__DEV__)
            debug(`HMR on http://localhost:${config.BS_PORT}`);
    });
}


runServer(app);

module.exports = app;
