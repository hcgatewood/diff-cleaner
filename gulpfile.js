'use strict'

require('./build-scripts/test.js');
require('./index.js');
require('./index.js').config.customGlobs = ['!**/test/**'];
