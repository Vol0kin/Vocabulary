var gulp = require('gulp');
var jest = require('gulp-jest').default;
var exec = require('child_process').exec;
var apidoc = require('gulp-apidoc');
var jsdoc = require('gulp-jsdoc3');

// Task to start microservice using node (no pm2 involved)
gulp.task('start-node', function(cb) {
	exec('node src/index.js',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});

// Task to run pm2
gulp.task('start', function(cb) {
	exec('pm2 start src/index.js -i 4 --name Vocabulary',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});

// Task to stop pm2
gulp.task('stop', function(cb) {
	exec('pm2 stop Vocabulary',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});

// Taskt to restart pm2
gulp.task('restart', function(cb) {
	exec('pm2 restart Vocabulary',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});

// Taskt to reload pm2
gulp.task('reload', function(cb) {
	exec('pm2 reload Vocabulary',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});

// Task to run tests
gulp.task('test', () => {
	return gulp.src('test/').pipe(jest({
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
	gulp.src(["src/Vocabulary.js", "src/exceptions/*.js", "src/Word.js" ], {read: false}).pipe(jsdoc({
		"opts": {
			"destination": "docs/Vocabulary"
		}
	}, done));

	apidoc({
		src: "src/app/",
		dest: "docs/apirest/"
	}, done);
});

// Task to create Heroku app
gulp.task('heroku', function(cb) {
	exec('sudo snap install heroku --classic && heroku login && heroku apps:create --region eu vocabulary-vi && git push heroku master',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});

// Task to create Heroku app using Docker image
gulp.task('heroku-docker', function(cb) {
	exec('sudo snap install heroku --classic && heroku login && heroku apps:create --region eu vocabulary-vi && heroku stack:set container && git push heroku master',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});

// Task to create the Docker image
gulp.task('docker-build', function(cb) {
	exec('sudo docker build -t vocabulary .',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});

// Task to run the Docker image
gulp.task('docker-run', function(cb) {
	exec('sudo docker run -p 8080:8080 vocabulary',
		function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	});
});