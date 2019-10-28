var gulp = require('gulp');
var jest = require('gulp-jest').default

gulp.task('test-class', () => {
	return gulp.src('test/VocManager.test.js').pipe(jest());
});