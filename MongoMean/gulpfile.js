var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
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
	return gulp.src(['client/controller/app.js', 'client/controller/blogservice.js', 'client/controller/login-controller.js',  'client/controller/home-controller.js', 'client/controller/blog-controller.js'])
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('client/build/script'))
		.pipe(livereload());
});

gulp.task('styles', ['cleanstyle'], function(){
	return gulp.src(['client/content/loading-bar.css', 'client/content/style.css'])
		.pipe(concat('main.css'))
		.pipe(cssmin())		
		.pipe(gulp.dest('client/build/style'))
		.pipe(livereload());
});

gulp.task('watch', function(){
	gulp.watch(path.scripts, ['scripts']);
	gulp.watch(path.styles, ['styles']);
});

gulp.task('default', ['watch', 'scripts', 'styles'],function(){
	livereload.listen();
	nodemon({		
		script: 'index.js',
		ext: 'js'
	}).on('restart', function(){	
		gulp.src('index.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	});
});