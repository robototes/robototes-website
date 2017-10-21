const test = require('ava').test // Testing function
const supertest = require('supertest') // Routing testing

// Set up our requesting object
test.request = supertest(require('../server')) // Routing

// Request/response tests
require('./page_tests')(test)
require('./content_tests')(test)
require('./header_tests')(test)
