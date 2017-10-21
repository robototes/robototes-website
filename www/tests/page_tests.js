const nconf = require('nconf')

module.exports = function (test) {
  // Response statuses
  test.cb('Server responds to request for homepage (200)', t => {
    test.request.get('/')
      .expect(200, t.end)
  })
  test.cb('Server responds to request for about page (200)', t => {
    test.request.get('/about')
      .expect(200, t.end)
  })
  test.cb('Server responds to request for contact page (200)', t => {
    test.request.get('/contact')
      .expect(200, t.end)
  })
  test.cb('Server responds to request for events page (200)', t => {
    test.request.get('/events')
      .expect(200, t.end)
  })
  test.cb('Server responds to request for favicon (200)', t => {
    test.request.get('/favicon.ico')
      .expect(200, t.end)
  })
  test.cb('Server responds correctly to non-existent page request (404)', t => {
    test.request.get('/foo/bar')
      .expect(404, t.end)
  })
  test.cb('Server redirects from /blog to blog subdomain (301)', t => {
    test.request.get('/blog')
      .expect('Location', `https://blog.${nconf.get('DOMAIN')}`)
      .expect(301, t.end)
  })
  test.cb('Server redirects from old /resources to contact page (301)', t => {
    test.request.get('/resources')
      .expect('Location', '/contact')
      .expect(301, t.end)
  })
  test.cb('Server responds to request for sitemap.xml (200)', t => {
    test.request.get('/sitemap.xml')
      .expect(200, t.end)
  })
  test.cb('Server responds to request for robots.txt (200)', t => {
    test.request.get('/robots.txt')
      .expect(200, t.end)
  })
}
