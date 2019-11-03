var gulp = require('gulp');
var jest = require('gulp-jest').default;
const shell = require('gulp-shell');

gulp.task('test-class', () => {
	return gulp.src('test/VocManager.test.js').pipe(jest({
		"collectCoverage": true,
		"coverageDirectory": "test/coverage/"
	}));
});

gulp.task('coveralls', shell.task('cat test/coverage/lcov.info | node_modules/.bin/coveralls'))