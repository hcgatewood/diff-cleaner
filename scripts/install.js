var message =
    '\n' +
    '-> Installing pretty-please...\n' +
    '-> Caveats:\n' +
    '\t- Must have a git hooks manager. `npm install --save-dev husky` is recommended.\n' +
    '\t- Add the following to your gulpfile.js:\n' +
    "\t\t- require('./node_modules/pretty-please/precommit.js');\n" +
    "\t\t- require('./node_modules/pretty-please/trim.js');\n" +
    '\t- Add the following to your package.json scripts:\n' +
    '\t\t- "precommit": "gulp precommit,"\n' +
    '\t\t- "trim": "gulp trim"\n' +
    '\n';

console.log(message);