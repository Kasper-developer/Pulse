const gulp = require('gulp'); // Подключаем gulp
const browserSync = require('browser-sync'); // Подключаем browser-sync
const watch = require('gulp-watch'); // Подключаем gulp-watch
const sass = require('gulp-sass')(require('sass')); // Подключаем gulp-sass,sass
const autoprefixer = require('gulp-autoprefixer'); // Подключаем gulp-autoprefixer
const sourcemaps = require('gulp-sourcemaps'); // Подключаем gulp-sourcemaps
const plumber = require('gulp-plumber'); // Подключаем gulp-plumber
const notify = require('gulp-notify'); // Подключаем gulp-notify
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const tinify = require('gulp-tinify');
const htmlmin = require('gulp-htmlmin');

gulp.task('sass', function (callback) {
	// Находим расположение sass файла
	return gulp.src('src/sass/style.+(scss|sass)')
		.pipe(rename({
			prefix: "",
			suffix: ".min",
		}))
		// Настройки уведомления ошибок в стилях
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return {
					title: 'Styles',
					sound: false,
					message: err.message
				}
			})
		}))
		// Настройки считывания исходной карты sass файла
		.pipe(sourcemaps.init())
		.pipe(sass())
		// Настройка Автопрефиксера
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			cascade: false
		}))
		// Настройки записи исходной карты sass файла
		.pipe(sourcemaps.write())
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		// Указание пункта назначения sass файла
		.pipe(gulp.dest('dist/css'));
	callback()
});

gulp.task('scripts', function (callback) {
	return gulp.src('src/js/**/*.js')
		.pipe(gulp.dest('dist/js'));
	callback();
})

gulp.task('fonts', function (callback) {
	return gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
	callback();
})

gulp.task('icons', function (callback) {
	return gulp.src('src/icons/**/*')
		.pipe(gulp.dest('dist/icons'));
	callback();
})

gulp.task('images', function (callback) {
	return gulp.src('src/img/**/*')
		.pipe(tinify('VP6GjHJtJT6mky62SVlm0DPbG03SRDQb'))
		.pipe(gulp.dest('dist/img'));
	callback();
})

gulp.task('html', function () {
	return gulp.src('src/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist/'))
})

gulp.task('mailer', function (callback) {
	return gulp.src('src/mailer/**/*')
		.pipe(gulp.dest('dist/mailer'));
	callback();
})

gulp.task('watch', function () {
	// Слежение за HTML и CSS файлами и обновление браузера
	watch(['src/*.html', 'src/css/**/*.css', 'src/sass/**/*.scss', 'src/js/main.js'], gulp.parallel(browserSync.reload));

	// Слежение за HTML файлами
	watch('src/*.html').on('change', gulp.parallel('html'))

	// Слежение за SASS файлами
	watch('src/sass/**/*.+(scss|sass|css)').on('change', gulp.parallel('sass'))

	// Слежение за js файлами
	watch('src/js/**/*.js').on('change', gulp.parallel('scripts'))

});

// Задача для старта сервера из папки src
gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: "dist"
		}
	})
});

// Запускаем одновременно задачи server, watch, sass и js
gulp.task('default', gulp.parallel('server', 'watch', 'sass', 'scripts', 'fonts', 'icons', 'html', 'images', 'mailer'));