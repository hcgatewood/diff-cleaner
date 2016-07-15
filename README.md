# diff-cleaner

De-noisify git diffs.

Enforce trailing whitespace and EOF newlines on git pre-commit hooks.

# Features
Reading through git diffs should be a straightforward experience. Unfortunately, meaningless differences in trailing whitespace and end-of-file newlines clutters up diffs. `diff-cleaner` removes this noise.
- Adds a git pre-commit hook which checks for trailing whitespace and EOF newline, failing the commit as-necessary with a message to use `npm run trim`
- Provides an `npm run trim` command which cleans all files

# Usage
- `npm install --save-dev diff-cleaner`
- `npm install --save-dev husky`
- Add the following to your `gulpfile.js`:
```javascript
require('./node_modules/diff-cleaner/precommit.js');
require('./node_modules/diff-cleaner/trim.js');
```
- Add the following to your `package.json` scripts:
```json
"precommit": "gulp precommit",
"trim": "gulp trim"
```

# Notes
## Overriding pre-commit hook
To override the pre-commit hook, use `git commit --no-verify`.

## Standardizing newlines
See [dealing with line endings](https://help.github.com/articles/dealing-with-line-endings/) for how to standardize line endings using a `.gitattributes` file.

## VS Code
Add `"files.trimTrailingWhitespace": true` to your user settings document to strip trailing whitespace automatically.
