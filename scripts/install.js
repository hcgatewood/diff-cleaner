const message = `

-> Installing diff-cleaner...
-> Caveats:
   - Must have a git hooks manager. \`npm install --save-dev husky\` is recommended.
   - Add the following to your gulpfile.js:
      - require('./diff-cleaner/precommit.js');
      - require('./diff-cleaner/trim.js');
   - Add the following to your package.json scripts:
      - "precommit": "gulp precommit,"
      - "trim": "gulp trim"

`;

console.log(message);
