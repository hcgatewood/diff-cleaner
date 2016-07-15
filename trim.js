/* Copyright (c) Microsoft Corporation. All Rights Reserved. */

var gulp = require('gulp'),
    os = require('os'),
    print = require('gulp-print'),
    eol = require('gulp-eol'),
    replace = require('gulp-replace'),
    whitespace = require('gulp-whitespace'),
    glob = require('glob'),
    parseGitignore = require('gitignore-globs');

var INCLUDED_FILETYPES= '(ts|js|css|scss)';

gulp.task('trim:whitespace', () => {
    console.log('\n-> Trimming whitespace and enforcing EOF newlines\n');

    var fromGitignore = parseGitignore(process.cwd() + '/.gitignore', { negate: true });
    // Fix end-of-line issue with gitignore-globs library
    fromGitignore.forEach( (glob, idx) => fromGitignore[idx] = glob.replace('\r', '') );
    var defaultGlobs = ['**/*.+' + INCLUDED_FILETYPES, '!**/node_modules/**'];
    var globs = defaultGlobs.concat(fromGitignore);

    var regex = new RegExp('(' + os.EOL + '|\n|\r)*$');
    return gulp.src(globs)
        // Print src files for debugging
        // .pipe(print())
        // Fix whitespace
        .pipe(whitespace({
            removeTrailing: true
        }))
        // Remove excess newlines at EOF
        // .pipe(replace(os.EOL + '*$', ''))
        // .pipe(replace(/\n*$/, ''))
        .pipe(replace(regex, ''))
        // Add a newline at EOF
        .pipe(eol())
        // Pipe back into place
        .pipe(gulp.dest('./'));
});

gulp.task('trim', ['trim:whitespace']);

module.exports = ['trim'];
