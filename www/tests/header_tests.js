module.exports = function (test) {
  // Response headers
  test.cb('Content-Security-Policy is set', t => {
    test.request.get('/')
      .expect('Content-Security-Policy', /.*/, t.end)
  })
  test.cb('HPKP is set', t => {
    test.request.get('/')
      .expect('Public-Key-Pins', /.*/, t.end)
  })
  test.cb('X-XSS-Protection is set and valid (mode=block)', t => {
    test.request.get('/')
      .expect('X-XSS-Protection', '1; mode=block', t.end)
  })
  test.cb('Frameguard is set and valid (DENY)', t => {
    test.request.get('/')
      .expect('X-Frame-Options', 'DENY', t.end)
  })
  test.cb('X-Powered-By is not set', t => {
    test.request.get('/')
      .end((err, res) => {
        t.is(res.header['X-Powered-By'], undefined)
        t.end(err)
      })
  })
  test.cb('IE No Open is set and valid (noopen)', t => {
    test.request.get('/')
      .expect('X-Download-Options', 'noopen', t.end)
  })
  test.cb('MIME type sniffing is set and valid (nosniff)', t => {
    test.request.get('/')
      .expect('X-Content-Type-Options', 'nosniff', t.end)
  })
  test.cb('Cache is set and valid (no-cache or max-age=2678400)', t => {
    test.request.get('/')
      .expect('Cache-Control', /(no-cache,max-age=0|max-age=2678400)/, t.end)
  })
}
