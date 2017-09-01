const test = require('ava').test // Testing function
const supertest = require('supertest') // Routing testing

// Set up our requesting object
let request = supertest(require('../server')) // Routing

// Response statuses
test.cb('Server responds correctly to valid requests (200)', t => {
  request.get('/')
    .expect(200, t.end)
})
test.cb('Server responds correctly to invalid request (404)', t => {
  request.get('/foo/bar')
    .expect(404, t.end)
})
test.cb('Server redirects from /blog to blog subdomain', t => {
  request.get('/blog')
    .expect('Location', `https://blog.${process.env.DOMAIN}`)
    .expect(301, t.end)
})
test.cb('Server redirects from old /resources to contact page', t => {
  request.get('/resources')
    .expect('Location', '/contact')
    .expect(301, t.end)
})
test.cb('Sitemap returns Not Implemented', t => {
  request.get('/sitemap.xml')
    .expect(501, t.end)
})
test.cb('Favicon exists', t => {
  request.get('/favicon.ico')
    .expect(200, t.end)
})

// Content attributes
test.cb('Correct Content-Type for webpages', t => {
  request.get('/')
    .expect('Content-Type', 'text/html; charset=utf-8', t.end)
})
test.cb('Correct Content-Type for icons', t => {
  request.get('/favicon.ico')
    .expect('Content-Type', 'image/x-icon', t.end)
})
test.cb('Correct Content-Type for robots.txt', t => {
  request.get('/robots.txt')
    .expect('Content-Type', 'text/plain; charset=utf-8', t.end)
})
// test.cb('Correct Content-Type for sitemap.xml', t => {
//   request.get('/sitemap.xml')
//     .expect('Content-Type', 'application/xml; charset=utf-8', t.end)
// })
test.cb('Responses are compressed', t => {
  request.get('/')
    .expect('Content-Encoding', 'gzip')
    .expect('Transfer-Encoding', 'chunked')
    .expect('Vary', /Accept-Encoding/)
    .expect(res => {
      if (res.header['Content-Length'] !== undefined) {
        throw new Error('Content-Length is defined on compressed response')
      }
    })
    .end(t.end)
})

// Response headers
test.cb('Content-Security-Policy is set', t => {
  request.get('/')
    .expect('Content-Security-Policy', /.*/, t.end)
})
test.cb('HPKP is set', t => {
  request.get('/')
    .expect('Public-Key-Pins', /.*/, t.end)
})
test.cb('X-XSS-Protection is set and valid', t => {
  request.get('/')
    .expect('X-XSS-Protection', '1; mode=block', t.end)
})
test.cb('Frameguard is set and valid', t => {
  request.get('/')
    .expect('X-Frame-Options', 'DENY', t.end)
})
test.cb('X-Powered-By is not set', t => {
  request.get('/')
    .expect(res => {
      if (res.header['X-Powered-By'] !== undefined) {
        throw new Error('X-Powered-By is still set')
      }
    })
    .end(t.end)
})
test.cb('IE No Open is set', t => {
  request.get('/')
    .expect('X-Download-Options', 'noopen', t.end)
})
test.cb('MIME type sniffing is disabled', t => {
  request.get('/')
    .expect('X-Content-Type-Options', 'nosniff', t.end)
})
// test.cb('CORS headers are properly set', t => {
//   request.get('/')
//     .expect('Access-Control-Allow-Origin', `cdn.${process.env.DOMAIN}`, t.end)
// })
test.cb('Cache is correctly set', t => {
  let expectedCacheControl
  if (process.env.DEBUG != null) expectedCacheControl = 'no-cache,max-age=0'
  else expectedCacheControl = 'max-age=2678400'
  request.get('/')
    .expect('Cache-Control', expectedCacheControl, t.end)
})

// TODO Webhook tests
