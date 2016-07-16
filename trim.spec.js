'use strict';

const path = require('path'),
    fs = require('fs'),
    extend = require('util')._extend,
    spawnSync = require('child_process').spawnSync,
    rimraf = require('rimraf').sync,
    trim = require('./trim.js'),
    cleanConfig = require('./config.js');

// Each spec references a specific file. File extensions are unique.
describe('Trim', () => {
    const testDir = path.resolve(cleanConfig.context, 'test/');
    const editedDir = path.resolve(testDir, 'edited/');
    const afterDir = path.resolve(testDir, 'after');
    let config;
    let env;

    beforeEach( () => {
        rimraf(editedDir);
        config = JSON.parse(JSON.stringify(cleanConfig));  // deep copy
        env = process.env;
        env = extend(env, {
            DC_CONTEXT: testDir,
            DC_SPECIFIC_GITIGNORE: path.resolve(testDir, 'gitignore'),
            DC_OUTDIR: editedDir,
            DC_LOG_ERRORS: true
        });
    });

    it('should remove trailing whitespace', () => {
        env.DC_FILETYPES = '(js)';
        const file = 'trailing-whitespace.js';
        const trim = spawnSync('gulp', ['trim'], { env: env, cwd: testDir });
        if (trim.status !== 0) {
            console.log(trim.stdout.toString('utf8'));
            console.log(trim.stderr.toString('utf8'));
            fail('Did not exit with status 0');
        }
        const output = fs.readFileSync(path.resolve(editedDir, file)).toString();
        const desiredOutput = fs.readFileSync(path.resolve(afterDir, file)).toString();
        if (output !== desiredOutput) {
            console.log('Trim output:');
            console.log(output);
            console.log('\nDesired output:');
            console.log(desiredOutput);
            fail('Incorrectly modified file');
        }
    });

    it('should remove no EOF newline', () => {
        env.DC_FILETYPES = '(html)';
        const file = 'no-newline.html';
        const trim = spawnSync('gulp', ['trim'], { env: env, cwd: testDir });
        if (trim.status !== 0) {
            console.log(trim.stdout.toString('utf8'));
            console.log(trim.stderr.toString('utf8'));
            fail('Did not exit with status 0');
        }
        const output = fs.readFileSync(path.resolve(editedDir, file)).toString();
        const desiredOutput = fs.readFileSync(path.resolve(afterDir, file)).toString();
        if (output !== desiredOutput) {
            console.log('Trim output:');
            console.log(output);
            console.log('\nDesired output:');
            console.log(desiredOutput);
            fail('Incorrectly modified file');
        }
    });

    it('should remove extraneous newlines', () => {
        env.DC_FILETYPES = '(json)';
        const file = 'extraneous-newlines.json';
        const trim = spawnSync('gulp', ['trim'], { env: env, cwd: testDir });
        if (trim.status !== 0) {
            console.log(trim.stdout.toString('utf8'));
            console.log(trim.stderr.toString('utf8'));
            fail('Did not exit with status 0');
        }
        const output = fs.readFileSync(path.resolve(editedDir, file)).toString();
        const desiredOutput = fs.readFileSync(path.resolve(afterDir, file)).toString();
        if (output !== desiredOutput) {
            console.log('Trim output:');
            console.log(output);
            console.log('\nDesired output:');
            console.log(desiredOutput);
            fail('Incorrectly modified file');
        }
    });

    it('should not touch ignored filetypes', () => {
        env.DC_FILETYPES = undefined;
        const file = 'dont-change.md';
        const trim = spawnSync('gulp', ['trim'], { env: env, cwd: testDir });
        if (trim.status !== 0) {
            console.log(trim.stdout.toString('utf8'));
            console.log(trim.stderr.toString('utf8'));
            fail('Did not exit with status 0');
        }
        try {
            const output = fs.readFileSync(path.resolve(editedDir, file)).toString();
        } catch (err) {
            return;
        }
        fail('Modified file when it should not have');
    });

    it('should not touch files in .gitignore', () => {
        env.DC_FILETYPES = '(css)';
        const file = 'ignore-me.css';
        const trim = spawnSync('gulp', ['trim'], { env: env, cwd: testDir });
        if (trim.status !== 0) {
            console.log(trim.stdout.toString('utf8'));
            console.log(trim.stderr.toString('utf8'));
            fail('Did not exit with status 0');
        }
        try {
            const output = fs.readFileSync(path.resolve(editedDir, file)).toString();
        } catch (err) {
            return;
        }
        fail('Modified file when it should not have');
    });
});
