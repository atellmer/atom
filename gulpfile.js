var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var spritesmith = require('gulp.spritesmith');
var rev = require('gulp-rev-append');
var del = require('del');
var clc = require('cli-color');

var config = require('./config');

console.log(clc.green('-------------------------------------------'));
console.log(clc.green('Mode: ') + clc.yellow(config.mode));
console.log(clc.green('Debug: ') + clc.yellow(config.debug));
console.log(clc.green('-------------------------------------------'));

var path = {
	root: 'client/',
	app: function () {
		return this.root + 'app/'
	},
	components: function () {
		return this.app() + 'components/'
	},
	icons: function () {
		return this.root + 'resources/icons/'
	},
	img: function () {
		return this.root + 'resources/img/'
	},
	dist: function () {
		return this.root + 'dist/'
	}
};

var task = {
	componentScripts: '',
	componentStyles: '',
	componentTemplates: '',
	sprite: '',
	hashFiles: ''
};

var prettify = true;

//connect
gulp.task('connect', function () {
	connect.server({
		root: path.root.slice(0, -1),
		port: 3000,
		livereload: true
	});
});

//component-scripts
gulp.task('component-scripts', function () {
	task.componentScripts = gulp.src([
		path.app() + '**/*.module.js',
		path.app() + '**/*.config.js',
		path.app() + '**/*.service.js',
		path.app() + '**/*.directive.js',
		path.app() + '**/*.component.js',
		path.app() + '**/*.controller.js'
		])
		.pipe(concat('bundle.js'));
				
	if (!config.debug) {
		task.componentScripts
			.pipe(uglify());
	}
	
	task.componentScripts = task.componentScripts
		.pipe(gulp.dest(path.dist()))
		.pipe(connect.reload());
				
	return task.componentScripts;
});

//component-styles
gulp.task('component-styles', function () {
	task.componentStyles = gulp.src([
		path.components() + '**/common.component.styl',
		path.components() + '**/*.styl'
		])
		.pipe(concat('bundle.styl'))
		.pipe(stylus({
			use: [nib()],
			compress: !config.debug
		}))
		.pipe(gulp.dest(path.dist()))
		.pipe(connect.reload());
			
	return task.componentStyles;
});

//component-templates
gulp.task('component-templates', function () {
	task.componentTemplates = gulp.src(path.root + '**/*.html')
		.pipe(rev()).pipe(connect.reload());
		
	return task.componentTemplates;
});

//sprite
gulp.task('sprite', function () {
   task.sprite = gulp.src(path.icons() + 'source/**/*.{jpg,jpeg,png,gif}')
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.css'
		}))
		.pipe(gulp.dest(path.icons() + 'sprite/'));
		
  return task.sprite;
});

//hash-files
gulp.task('hash-files', function () {
	task.hashFiles = gulp.src(path.root + '**/*.html')
		.pipe(rev())
		.pipe(gulp.dest(function (file) {
			return file.base;
		}))
		.pipe(connect.reload());
		
	return task.hashFiles;
});

//watch
gulp.task('watch', function () {
	gulp.watch(path.app() + '**/*.js', ['component-scripts', 'hash-files']);
	gulp.watch(path.components() + '**/*.styl', ['component-styles', 'hash-files']);
	gulp.watch(path.root + '**/*.html', ['component-templates']);
	gulp.watch(path.icons() + 'source/**/*.*', ['sprite']);
});

gulp.task('default', [
	'connect', 
	'component-scripts', 
	'component-styles', 
	'component-templates', 
	'sprite', 
	'hash-files',
	'watch'
]);