var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var del = require('del');

var path = {
	scripts: 'client/controller/*.js',
	styles: 'client/content/*.css'
};

gulp.task('cleanscript', function() {
  return del(['client/build/script']);
});

gulp.task('cleanstyle', function() {
  return del(['client/build/style']);
});

gulp.task('scripts', ['cleanscript'], function(){
	return gulp.src(['client/controller/app.js', 'client/controller/blogservice.js', 'client/controller/login-controller.js', 'client/controller/blog-controller.js'])
		.pipe(concat('main.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('client/build/script'));
});

gulp.task('styles', ['cleanstyle'], function(){
	return gulp.src('client/content/style.css')
		.pipe(concat('main.css'))
		.pipe(cssmin())
		//.pipe(uglify().on('error', gulpUtil.log))
		.pipe(gulp.dest('client/build/style'));
});

gulp.task('watch', function(){
	gulp.watch(path.scripts, ['scripts']);
	gulp.watch(path.styles, ['styles']);
});

gulp.task('default', ['watch', 'scripts', 'styles']);