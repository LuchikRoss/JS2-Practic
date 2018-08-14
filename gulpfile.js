var gulp = require('gulp');
var sass = require('gulp-sass');
var path = './';

gulp.task('sass', function(){
    gulp.src(path + '/scss/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest(path + '/css'));
});

gulp.task('sass:watch', function(){
    gulp.watch('./' + path + '/scss/*.scss', ['sass']);
});