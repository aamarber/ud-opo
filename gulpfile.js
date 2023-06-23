// Sass configuration
const { watch } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', () => {
  return gulp.src('*/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/'));
});

gulp.task('fonts', () => {
  return gulp.src('styles/**/*.woff2')
  .pipe(gulp.dest('dist/'));
})

gulp.task(
  'watch',
  gulp.series('sass', function(cb) {
    gulp.watch('*/*.scss', gulp.series(['sass', 'fonts']));
    cb();
  })
);

gulp.task(
  'default',
  gulp.series(['sass', 'fonts'], function(cb) {
    cb();
  })
);