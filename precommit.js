/* Copyright (c) Microsoft Corporation. All Rights Reserved. */

var gulp = require('gulp'),
    glob = require('glob'),
    util = require('util'),
    parseGitignore = require('gitignore-globs'),
    Validator = require('lintspaces');

var INCLUDED_FILETYPES = '(ts|js|css|scss)';

gulp.task('check:whitespace', () => {
    console.log('\n-> Running precommit hook\n');

    // Ignore files specified by .gitignore
    var ignoreGlobs = parseGitignore(process.cwd() + '/.gitignore');
    // Fix end-of-line issue with gitignore-globs library
    ignoreGlobs.forEach( (glob, idx) => ignoreGlobs[idx] = glob.replace('\r', '') );
    ignoreGlobs.push('**/node_modules/**');

    glob('**/*.+' + INCLUDED_FILETYPES, { ignore: ignoreGlobs }, (err, files) => {
        if (err) {
            // TODO
            process.exit(0);
        }
        var validator = new Validator({
            newline: true,
            newlineMaximum: false,
            trailingspaces: true
        });

        for (var idx = 0; idx < files.length; idx++) {
            var file = files[idx];
            validator.validate(file);
        }

        var invalidFiles = validator.getInvalidFiles();
        console.log(util.inspect(invalidFiles, { depth: null }));
        var isInvalid = Object.keys(invalidFiles).length > 0;
        if (isInvalid) {
            console.log('\n-> Found whitespace issues in the following files:\n');
            Object.keys(invalidFiles).forEach( (file) => console.log(file) );
            console.log('\n-> Run `npm run trim` to fix these issues.\n');
            process.exit(1);
        }
    });
});

gulp.task('precommit', ['check:whitespace']);

module.exports = ['precommit'];
