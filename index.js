require('now-env')

const { NOW_URL, HOST = 'http://localhost', PORT = 3000 } = process.env

process.env.HOST = NOW_URL ? NOW_URL : HOST
process.env.PORT = NOW_URL ? 443 : PORT

// Set options as a parameter, environment variable, or rc file.
require = require('esm')(module /*, options*/)
module.exports = require('./main.js')
