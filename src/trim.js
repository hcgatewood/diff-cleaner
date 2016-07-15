const path = require('path'),
    gulp = require('gulp'),
    eol = require('gulp-eol'),
    replace = require('gulp-replace'),
    whitespace = require('gulp-whitespace'),
    glob = require('glob'),
    parseGitignore = require('gitignore-globs'),
    config = require('./config.js');

gulp.task('trim', () => {
    console.log('\n-> Trimming whitespace and enforcing EOF newlines\n');

    // Defaults to chdir(process.cwd())
    process.chdir(config.context);

    const outDir = config.outDir || config.context;

    const gitignore = config.specificGitignore
        || path.resolve(config.context, '.gitignore');
    let ignoreGlobs;
    try {
        ignoreGlobs = parseGitignore(gitignore, { negate: true });
    } catch (err) {
        ignoreGlobs = [];
    }

    // Fix end-of-line issue with gitignore-globs library
    ignoreGlobs.forEach( (glob, idx) => ignoreGlobs[idx] = glob.replace('\r', '') );
    const defaultGlobs = ['**/*.+' + config.filetypes, '!**/node_modules/**'];
    let globs = defaultGlobs.concat(ignoreGlobs);
    if (config.customGlobs) {
        globs = globs.concat(config.customGlobs);
    }

    const regex = new RegExp(`(${config.osEol}|\n|\r)*$`);
    return gulp.src(globs)
        // Fix whitespace
        .pipe(whitespace({
            removeTrailing: true
        }))
        .pipe(replace(regex, ''))
        // Add a newline at EOF
        .pipe(eol())
        // Pipe back into place (or dir specified in config)
        .pipe(gulp.dest(outDir));
});

module.exports = ['trim'];
