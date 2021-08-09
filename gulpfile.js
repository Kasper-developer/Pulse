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

gulp.task('sass', function (callback) {
	// Находим расположение sass файла
	return gulp.src('./src/sass/style.+(scss|sass)')
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
		.pipe(gulp.dest('./src/css/'));
	callback()
});

gulp.task('scripts', function (callback) {
	return gulp.src('./src/js/main.js')
		.pipe(gulp.dest('./src/js/'));
	callback();
})

gulp.task('watch', function () {
	// Слежение за HTML и CSS файлами и обновление браузера
	watch(['./src/*.html', './src/css/**/*.css', './src/js/main.js'], gulp.parallel(browserSync.reload));

	// Слежение за SASS файлами
	watch('./src/sass/**/*.+(scss|sass)', gulp.parallel('sass'))

	// Слежение за js файлами
	watch('./src/js/**/*.js', gulp.parallel('scripts'))

});

// Задача для старта сервера из папки src
gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: "./src/"
		}
	})
});

// Запускаем одновременно задачи server, watch, sass и js
gulp.task('default', gulp.parallel('server', 'watch', 'sass', 'scripts'));