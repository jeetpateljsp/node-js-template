var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var eslint = require('gulp-eslint');
var fs = require('fs');

// Task to transpile TypeScript to JavaScript
gulp.task('build', function() {
    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
});

// Task to clean the dist folder
gulp.task('clean', function() {
    return fs.promises.rm('dist', { recursive: true, force: true });
});

// Task to lint the TypeScript files
gulp.task('lint', function() {
    return gulp.src(['server/**/*.ts', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Default task
gulp.task('default', gulp.series('clean', 'lint', 'build'), function() {
    console.log('Default task executed successfully! 🎉');
});