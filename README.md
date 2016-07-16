# diff-cleaner

De-noisify git diffs.

Enforce trailing whitespace and EOF newlines with git pre-commit hooks.

# Features
Reading through git diffs should be a straightforward experience. Unfortunately, meaningless differences in trailing whitespace and end-of-file newlines clutters up diffs. `diff-cleaner` removes this noise.

- Adds a git pre-commit hook which checks for trailing whitespace and an EOF newline, failing the commit as-necessary with a message to use `npm run trim`
- Provides an `npm run trim` command which fixes the errors found in the pre-commit hook

# Usage
## Get started
- `npm install --save-dev diff-cleaner`
- `npm install --save-dev husky`
- Add the following to your `gulpfile.js`:
```javascript
require('./diff-cleaner/precommit.js');
require('./diff-cleaner/trim.js');
```
- Add the following to your `package.json` scripts:
```json
"precommit": "gulp precommit",
"trim": "gulp trim"
```

## Options
Check out `config.js` for full options. A selection are shown below.

To change _e.g._ the included filetypes to just html and css, add the following to your `gulpfile.js`:
```javascript
require('diff-cleaner').config.filetypes = '(html|css)';
```

- `filetypes`. The file extensions that will be linted and updated. Must be in the form _e.g._ `'(js|py|txt)'`. Defaults to `'(ts|js|css|scss|html|json)'`.
- `logErrors`. When truthy, log the full issue report on precommit linting errors.
- `specifigGitignore`. Use a `.gitignore` other than in the root directory.
- `customGlobs`. Any custom globs to consider during precommit and trim.

# Notes
## Overriding pre-commit hook
To override the pre-commit hook, use `git commit --no-verify`.

## Standardizing newlines
See [dealing with line endings](https://help.github.com/articles/dealing-with-line-endings/) for how to standardize line endings using a `.gitattributes` file.

## VS Code
Add `"files.trimTrailingWhitespace": true` to your user settings document to strip trailing whitespace automatically.
