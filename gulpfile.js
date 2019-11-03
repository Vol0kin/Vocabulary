var gulp = require('gulp');
var jest = require('gulp-jest').default;
var coveralls = require('gulp-coveralls');

gulp.task('test-class', () => {
	return gulp.src('test/VocManager.test.js').pipe(jest({
		"collectCoverage": true,
		"coverageDirectory": "test/coverage/"
	}));
});

gulp.task('coveralls', () => {
	return gulp.src('test/coverage/**/lcov.info').pipe(coveralls());
})