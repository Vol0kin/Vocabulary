var gulp = require('gulp');
var jest = require('gulp-jest').default;
var exec = require('child_process').exec;

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