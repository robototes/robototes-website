const test = require('ava').test // Testing function
const request = require('supertest') // Routing testing

// Local code
let app = require('../server') // Routing

// Tests basic requests
test.cb('Server responds correctly to valid requests (200)', function (t) {
  request(app)
    .get('/')
    .expect(200, t.end)
})
test.cb('Server responds correctly to invalid request (404)', function (t) {
  request(app)
    .get('/foo/bar')
    .expect(404, t.end)
})
test.cb('Server redirects from /blog to blog subdomain', function (t) {
  request(app)
    .get('/blog')
    .expect('Location', `https://blog.${process.env.DOMAIN}`)
    .expect(301, t.end)
})
