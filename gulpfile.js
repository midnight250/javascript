var gulp = require('gulp'),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    cleancss = require('gulp-clean-css'),
    cache = require('gulp-cache'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');

gulp.task('css', function() {
    return gulp.src(['sass/sass/style.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
		outputStyle: 'expanded', 
		indentType: 'tab',
		indentWidth: '1'
	}).on('error', sass.logError))
	.pipe(postcss([
		autoprefixer('last 2 versions', '> 1%')
	]))
	//.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('builds/assets/css'))

	// Minify CSS
	.pipe(cleancss())
	.pipe(rename(
		{
			suffix: '.min'
		}
	))
	.pipe(gulp.dest('builds/assets/css'));
});

gulp.task('css-bootstrap', function() {
    return gulp.src([
    		'sass/sass-bootstrap/bootstrap.scss',
    		'sass/sass-bootstrap/bootstrap-grid.scss',
    		'sass/sass-bootstrap/bootstrap-reboot.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
		outputStyle: 'expanded', 
		indentType: 'tab',
		indentWidth: '1'
	}).on('error', sass.logError))
	.pipe(postcss([
		autoprefixer('last 2 versions', '> 1%')
	]))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('builds/assets/plugins/bootstrap/css'));
});

gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

gulp.task('watch', function() {
	gulp.watch(['sass/sass/**/*.scss'], ['css']);
	gulp.watch(['builds/**'], ['clear']);
	gulp.watch(['sass/sass-bootstrap/**/*.scss'], ['css-bootstrap']);
});

gulp.task('default', ['watch']);