const test = require('ava').test // Testing function
const supertest = require('supertest') // Routing testing

// Set up our requesting object
test.request = supertest(require('../server')) // Routing

// Tests in debug mode
require('./page_tests.js')(test)
require('./content_tests.js')(test)
require('./header_tests.js')(test)
