const os = require('os');

module.exports = {
    filetypes: process.env.DC_FILETYPES || '(ts|js|css|scss|html|json)',
    logErrors: process.env.DC_LOG_ERRORS,
    context: process.env.DC_CONTEXT || process.cwd(),
    osEol: process.env.SPECIFIC_EOL || os.EOL,
    specificGitignore: process.env.DC_SPECIFIC_GITIGNORE,
    outDir: process.env.DC_OUTDIR
};
