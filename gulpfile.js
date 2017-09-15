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
    rename = require('gulp-rename'),
    deletefile = require('gulp-delete-file');

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
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('builds/assets/css'))

	// Minify CSS
	.pipe(cleancss())
	.pipe(rename({ extname: '.min.css' }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('builds/assets/css'));
});

gulp.task('deletefile', function () {
    var regexp = /\w*(\-\w{8}\.js){1}$|\w*(\-\w{8}\.css){1}$/;
    return gulp.src([
    	'builds/assets/css/style.css.min.css',
    	'builds/assets/css/style.css.min.css.map'])
    .pipe(deletefile({
        reg: regexp,
        deleteMatch: false
    }))
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

gulp.task('js-bootstrap', function() {
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.js'])
	.pipe(gulp.dest('builds/assets/plugins/bootstrap/js'))
	.pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('builds/assets/plugins/bootstrap/js'));
});

gulp.task('js-jquery', function() {
	return gulp.src([
		'node_modules/jquery/dist/jquery.js',
		'node_modules/jquery/dist/jquery.slim.js'])
	.pipe(gulp.dest('builds/assets/plugins/jquery'))
	.pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('builds/assets/plugins/jquery'));
});

gulp.task('clear', function (done) {
    return cache.clearAll(done);
});

gulp.task('watch', function() {
	gulp.watch(['sass/sass/**/*.scss'], ['css']);
	gulp.watch(['sass/sass-bootstrap/**/*.scss'], ['css-bootstrap']);
	gulp.watch(['sass/sass/**/*.scss'], ['css-bootstrap']);
	gulp.watch(['sass/sass-bootstrap/**/*.scss'], ['css']);


	gulp.watch(['sass/sass/**/*.scss'], ['js-jquery']);
	gulp.watch(['builds/**'], ['deletefile']);
	gulp.watch(['builds/**'], ['clear']);
	gulp.watch(['sass/sass-bootstrap/**/*.scss'], ['js-bootstrap']);
});

gulp.task('default', ['watch']);