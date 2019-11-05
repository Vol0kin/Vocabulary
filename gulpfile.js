var gulp = require('gulp');
var jest = require('gulp-jest').default;
var exec = require('child_process').exec;

// Tarea para iniciar el gestor de proceos PM2
gulp.task('start', function(cb) {
	exec('pm2 start src/index.js -i 4',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});

// Tarea para parar el gestor de procesos PM2
gulp.task('stop', function(cb) {
	exec('pm2 stop all',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});

// Tarea para reiniciar el gestor de procesos PM2
gulp.task('restart', function(cb) {
	exec('pm2 restart src/index.js',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});

// Tarea para ejecutar los tests
gulp.task('test', () => {
	return gulp.src('test/*.test.js').pipe(jest({
		"collectCoverage": true,
		"coverageDirectory": "test/coverage/"
	}));
});

// Tarea para obtener la cobertura del codigo
gulp.task('coveralls', function(cb) {
	exec('cat test/coverage/lcov.info | node_modules/.bin/coveralls',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});