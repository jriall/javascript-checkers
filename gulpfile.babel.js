import autoprefixer from'gulp-autoprefixer';
import babelify from'babelify';
import browserify from 'browserify';
import buffer from'vinyl-buffer';
import cleanCSS from'gulp-clean-css';
import del from'del';
import fancyLog from 'fancy-log';
import gulp from 'gulp';
import rename from'gulp-rename';
import runSequence from 'run-sequence';
import sass from'gulp-sass';
import source from'vinyl-source-stream';
import uglify from 'gulp-uglify';
import eslint from 'gulp-eslint';
import bs from 'browser-sync';
import shell from 'gulp-shell';

bs.create();

gulp.task('sass', () => {
  del(['src/css/*.css', 'src/css/maps/*.map']);

  return gulp.src('./src/scss/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers : ['last 2 versions'],
        cascade: false,
      }))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('./src/css'))
      .pipe(bs.stream());
})

gulp.task('scripts', () => {
  del(['src/js/main.min.js', 'src/js/maps/*.map']);

  return browserify({entries: 'src/js/main.js', debug: true})
      .transform("babelify", { presets: ["env"] })
      .bundle()
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(rename('main.min.js'))
      // .pipe(uglify())
      .pipe(gulp.dest('./src/js'))
      .pipe(bs.stream());
})

gulp.task('server', () => {
  bs.init({
    server: {
      baseDir: "./src"
  }
  });
})

gulp.task('watch', () => {
  fancyLog('Watching for changes... 👁  👁')

  gulp.watch('./src/scss/**/*', ['sass'])
      .on('change', () => fancyLog('Rebuilding stylesheets...'));
  gulp.watch('./src/js/**/*', ['scripts'])
      .on('change', () => fancyLog('Rebuilding Javascript...'));
  gulp.watch("./src/*.html").on("change", () => {
    fancyLog('Rebuilding HTML files...');
    bs.reload;
  });
});

gulp.task('default', (done) => {
  runSequence(['sass','scripts', 'server', 'watch'], done);
});