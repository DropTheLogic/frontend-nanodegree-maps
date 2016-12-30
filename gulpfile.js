/**********************************
 * REQUIRES
 **********************************/
var gulp = require('gulp');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');

/**********************************
 * TASKS
 **********************************/
gulp.task('useref', function() {
	return gulp.src('src/*.html')
		.pipe(useref())
		//.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cleanCSS()))
		.pipe(gulp.dest('dist'))
});

gulp.task('images', function() {
	return gulp.src('src/img/*.+(png|jpg|gif|svg)')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
});

gulp.task('clean:dist', function() {
	return del.sync('dist');
});

gulp.task('default', function(callback) {
	runSequence('clean:dist', ['useref', 'images'],
		callback
	)
});