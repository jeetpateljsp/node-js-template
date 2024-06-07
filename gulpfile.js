var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var fs = require('fs');
var prettier = require('gulp-prettier-plugin');
var eslint = require('gulp-eslint');

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
    return gulp.src(['server/**/*.ts', './gulpfile.js'])
        .pipe(prettier(
            {
                printWidth: 80,
                tabWidth: 4,
                useTabs: false,
                semi: true,
                singleQuote: true,
                trailingComma: 'all',
                arrowParens: 'avoid',
                endOfLine: 'auto',
            }
        ))
        .pipe(eslint())
        .pipe(eslint.failAfterError())
        .pipe(gulp.dest(file => file.base));
});

// Default task
gulp.task('default', gulp.series('clean', 'lint', 'build'), () => {
    console.log('Default task executed successfully! 🎉');
});