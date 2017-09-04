module.exports = function (test) {
  // Content attributes
  test.cb('Correct Content-Type for webpages (text/html)', t => {
    test.request.get('/')
      .expect('Content-Type', 'text/html; charset=utf-8', t.end)
  })
  test.cb('Correct Content-Type for icons (image/x-icon)', t => {
    test.request.get('/favicon.ico')
      .expect('Content-Type', 'image/x-icon', t.end)
  })
  test.cb('Correct Content-Type for robots.txt (text/plain)', t => {
    test.request.get('/robots.txt')
      .expect('Content-Type', 'text/plain; charset=utf-8', t.end)
  })
  test.cb('Correct Content-Type for sitemap.xml (application/xml)', t => {
    test.request.get('/sitemap.xml')
      .expect('Content-Type', 'application/xml; charset=utf-8', t.end)
  })
  test.cb('Responses are compressed', t => {
    test.request.get('/')
      .expect('Content-Encoding', 'gzip')
      .expect('Transfer-Encoding', 'chunked')
      .expect('Vary', /Accept-Encoding/)
      .end((err, res) => {
        t.is(res.header['Content-Length'], undefined)
        t.end(err)
      })
  })
}
