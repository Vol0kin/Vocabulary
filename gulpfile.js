var gulp = require('gulp');
var jest = require('gulp-jest').default;
var exec = require('child_process').exec;
var apidoc = require('gulp-apidoc');
var jsdoc = require('gulp-jsdoc3');

// Task to runs pm2
gulp.task('start', function(cb) {
	exec('pm2 start src/index.js -i 4',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});

// Task to stop pm2
gulp.task('stop', function(cb) {
	exec('pm2 stop all',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});

// Taskt to restart pm2
gulp.task('restart', function(cb) {
	exec('pm2 restart src/index.js',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});

// Task to run tests
gulp.task('test', () => {
	return gulp.src('test/*.test.js').pipe(jest({
		"collectCoverage": true,
		"coverageDirectory": "test/coverage/"
	}));
});

// Task to get test coverage
gulp.task('coveralls', function(cb) {
	exec('cat test/coverage/lcov.info | node_modules/.bin/coveralls',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});

// Task to generate documentation, both for classes and REST API
gulp.task('doc', function(done) {
	gulp.src(["src/Voc*.js", "src/exceptions/*.js", "src/Checker.js"], {read: false}).pipe(jsdoc({
		"opts": {
			"destination": "docs/Vocabulary"
		}
	}, done));

	apidoc({
		src: "src/app/",
		dest: "docs/apirest/"
	}, done);
});