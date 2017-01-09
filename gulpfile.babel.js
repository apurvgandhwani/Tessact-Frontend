import gulp   from 'gulp'
import run    from 'run-sequence'
import loadPlugins from 'gulp-load-plugins'


import browserSync from 'browser-sync'
import webpack   from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import ClientConfig  from './tools/client.config'
import ServerConfig  from './tools/server.config'
import DLLConfig from './tools/dll.config'

import vendorsTask from './copy_task'


const IS_PROD = process.env.NODE_ENV === "production";
var WATCH = false;
var clientBundler; 
var serverBundler;

var $ = loadPlugins();

gulp.task('default', ['build:watch']);
gulp.task('build:prod', cb=> {
	WATCH = false;
	run('copy:assets', 'bundle', cb);
});
gulp.task('build:watch', cb=> {
	WATCH = true;
	run('copy:assets', 'bundle:dll', 'bundle', 'start:server', 'watch:sync', 'watch:assets', cb);
});

gulp.task('bundle:dll', cb=> {
	if (IS_PROD)
		return cb();

	var dllBundler = webpack(DLLConfig);

	return new Promise((resolve, reject)=> {
		dllBundler.run((err, stats)=> {
			if (err) {
				return reject(err)
			}
			console.log('DLL Bundled.')
			console.log(stats.toString({colors: true, chunks: false}))
			resolve()
		});	
	})
});

gulp.task('bundle', cb => {
	var count = 0;
	clientBundler = webpack(ClientConfig)
	serverBundler = webpack(ServerConfig);
	const bundleComplete = (msg) => (err, stats)=> {
		if (err)
			throw new gutil.PluginError(msg + ':bundle', err)
		console.log( stats.toString({ colors: true, chunks: false }) );
		console.log( `  -- ${msg} bundled.`);
		if (++count === 2) cb();
	}

	clientBundler.run(bundleComplete('client'));
	WATCH
		? serverBundler.watch(750, bundleComplete('server:watch'))
		: serverBundler.run(bundleComplete('server'))
});

gulp.task('start:server', cb=> {
	console.log('Starting Node Server...');
	$.nodemon({
		script: 'build/server-bundle.js',
		watch: ['build/server-bundle.js'],
		ext: 'js',
		ignore: ['!build/public', '!build/vendor', 'src/client'],
		env: Object.assign({NODE_ENV: 'development', DEBUG: 'tessact:*'}, process.env),
		nodeArgs: ['--debug', '--inspect']
	}).on('start', cb=>{
		console.log('Server Restarted: Reloading BrowserSync.');
		browserSync.reload();
	});
	cb();
});

gulp.task('watch:sync', cb=> {
	process.on('exit', () => browserSync.exit());
	browserSync({
		logPrefix: 'tessact: ',
		open: false, notify: true,
		port: (process.env.BS_PORT || 3000),
		proxy: {
			target: 'localhost:4200',
			middleware: [
				webpackDevMiddleware(clientBundler, {
					publicPath: ClientConfig.output.publicPath,
					stats: {colors: true, chunks: false}
				}),
				webpackHotMiddleware(clientBundler)
			]
		},
		files: [
			'build/public/**/*.css',
			'!build/public/**/*.js'
		]
  	}, cb);
});

gulp.task('copy:vendors', vendorsTask);
gulp.task('copy:assets', cb=> {
	run('copy:vendors', 'copy:views', 'copy:public', cb);
});
gulp.task('copy:views', cb=> {
	return (
		gulp.src('./src/server/views/**/*.jade')
			.pipe($.changed('./build/views'))
			.pipe($.size({title: 'copied views', pretty: true}))
			.pipe( gulp.dest('./build/views'))
	)
});
gulp.task('copy:public', cb=> {
	return (
		gulp.src('./src/public/**/*.*')
			.pipe($.changed('./build/public/'))
			.pipe($.size({title: 'copied public', pretty: true}))
			.pipe(gulp.dest('./build/public/'))
	)
});
gulp.task('watch:assets', cb=> {
	gulp.watch('./src/server/views/**/*.jade', {interval: 1000}, ['copy:views']);
	gulp.watch('./src/public/**/*.*', {interval: 1000}, ['copy:public']);
	cb();
});