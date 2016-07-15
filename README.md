# pretty-please

A library for de-noisifying git diffs.

Enforces trailing whitespace and EOF newlines on git pre-commit hooks.

# Usage

- `npm install --save-dev pretty-please`
- `npm install --save-dev husky`
- Add the following to your `gulpfile.js`:
```javascript
require('./node_modules/pretty-please/precommit.js');
require('./node_modules/pretty-please/trim.js');
```
- Add the following to your `package.json` scripts:
```json
"precommit": "gulp precommit",
"trim": "gulp trim"
```

# Notes
## Overriding pre-commit hook
To override the pre-commit hook, use `git commit --no-verify`.

## VS Code
Add `"files.trimTrailingWhitespace": true` to your user settings document to strip trailing whitespace automatically.
