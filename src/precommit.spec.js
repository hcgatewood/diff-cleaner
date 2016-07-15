'use strict';

const path = require('path'),
    extend = require('util')._extend,
    spawnSync = require('child_process').spawnSync,
    precommit = require(path.resolve(__dirname, 'precommit.js')),
    cleanConfig = require(path.resolve(__dirname, 'config.js'));

// Each spec references a specific file. File extensions are unique.
describe('Precommit', () => {
    const testDir = path.resolve(cleanConfig.context, 'test');
    let config;
    let env;

    beforeEach( () => {
        config = JSON.parse(JSON.stringify(cleanConfig));  // deep copy
        env = process.env;
        env = extend(env, {
            DC_CONTEXT: testDir,
            DC_SPECIFIC_GITIGNORE: path.resolve(testDir, '.gitignore'),
            DC_LOG_ERRORS: true
        });
    });

    it('should catch trailing whitespace', () => {
        // Using trailing-whitespace.js
        env.DC_FILETYPES = '(js)';
        const precommit = spawnSync('gulp', ['precommit'], { env: env });
        if (precommit.status !== 1) {
            console.log(precommit.stdout.toString('utf8'));
            console.log(precommit.stderr.toString('utf8'));
            fail('Did not exit with status 1');
        }
    });

    it('should catch no EOF newline', () => {
        // Using no-newlinte.html
        env.DC_FILETYPES = '(html)';
        const precommit = spawnSync('gulp', ['precommit'], { env: env });
        if (precommit.status !== 1) {
            console.log(precommit.stdout.toString('utf8'));
            console.log(precommit.stderr.toString('utf8'));
            fail('Did not exit with status 1');
        }
    });

    it('should catch extraneous newlines', () => {
        // Using extraneous-newlines.json
        env.DC_FILETYPES = '(json)';
        const precommit = spawnSync('gulp', ['precommit'], { env: env });
        if (precommit.status !== 1) {
            console.log(precommit.stdout.toString('utf8'));
            console.log(precommit.stderr.toString('utf8'));
            fail('Did not exit with status 1');
        }
    });

    it('should ignore ignored filetypes', () => {
        // Using dont-change.md
        env.DC_FILETYPES = undefined;
        const precommit = spawnSync('gulp', ['precommit'], { env: env });
        if (precommit.status !== 0) {
            console.log(precommit.stdout.toString('utf8'));
            console.log(precommit.stderr.toString('utf8'));
            fail('Did not exit with status 0');
        }
    });

    it('should ignore files in .gitignore', () => {
        // Using ignore-me.css
        env.DC_FILETYPES = '(css)';
        const precommit = spawnSync('gulp', ['precommit'], { env: env });
        if (precommit.status !== 0) {
            console.log(precommit.stdout.toString('utf8'));
            console.log(precommit.stderr.toString('utf8'));
            fail('Did not exit with status 0');
        }
    });

});
