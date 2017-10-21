const test = require('ava').test // Testing function
const supertest = require('supertest') // Routing testing

process.env.DEBUG = null
const app = require('../server') // Our server

test.request = supertest(app) // Routing

// Overall tests
test.cb('Ignores requests to non-existent webhooks', t => {
  test.request.post('/webhook/foo')
    .expect(404, t.end)
})

// TBA Tests
require('./tba_tests')(test)
