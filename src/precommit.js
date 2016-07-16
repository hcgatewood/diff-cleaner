const path = require('path'),
    gulp = require('gulp'),
    glob = require('glob'),
    util = require('util'),
    parseGitignore = require('gitignore-globs'),
    Validator = require('lintspaces'),
    config = require('./config.js');

gulp.task('precommit', () => {
    console.log('\n-> Running precommit hook\n');

    // Ignore files specified by .gitignore
    if (config.logErrors) {
        console.log(config);
    }
    const gitignore = config.specificGitignore
        || path.resolve(config.context, '.gitignore');
    let ignoreGlobs;
    try {
        ignoreGlobs = parseGitignore(gitignore);
    } catch (err) {
        ignoreGlobs = [];
    }

    // Fix end-of-line issue with gitignore-globs library
    ignoreGlobs.forEach( (glob, idx) => ignoreGlobs[idx] = glob.replace('\r', '') );
    ignoreGlobs.push('**/node_modules/**');

    // Add negation of config globs
    if (config.customGlobs) {
        ignoreGlobs = ignoreGlobs.concat(negateGlobs(config.customGlobs));
    }

    glob('**/*.+' + config.filetypes, { ignore: ignoreGlobs }, (err, files) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        const validator = new Validator({
            newline: true,
            newlineMaximum: false,
            trailingspaces: true
        });

        for (let idx = 0; idx < files.length; idx++) {
            const file = files[idx];
            validator.validate(file);
        }

        const invalidFiles = validator.getInvalidFiles();

        if (config.logErrors) {
            console.log(util.inspect(invalidFiles, { depth: null }));
        }

        const isInvalid = Object.keys(invalidFiles).length > 0;
        if (isInvalid) {
            console.log('\n-> Found whitespace issues in the following files:\n');
            Object.keys(invalidFiles).forEach( (file) => console.log(file) );
            console.log('\n-> Run `npm run trim` to fix these issues.\n');
            process.exit(1);
        }
    });
});

function negateGlobs(globs) {
    globs.forEach( (idx, glob) => {
        if (glob[0] === '!') {
            globs[idx] = glob.substring(1);
        } else {
            globs[idx] = '!' + glob;
        }
    });
}

module.exports = ['precommit'];
