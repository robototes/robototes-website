const crypto = require('crypto')

module.exports = function (test) {
  // Response statuses
  test.cb('Denies requests with invalid checksums (403)', t => {
    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', 'invalidchecksum')
      .send({})
      .expect(403, t.end)
  })
  test.cb('Accepts requests with valid checksums', t => {
    // Calculate the checksum for this request
    let hash = crypto.createHash('sha1')
    hash.update(process.env.TBA_SECRET_KEY)
    hash.update('{"message_data": {"desc": "This is a test message ensuring your device can recieve push messages from The Blue Alliance.", "title": "Test Message"}, "message_type": "ping"}')
    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', hash.digest('hex'))
      .send('{"message_data": {"desc": "This is a test message ensuring your device can recieve push messages from The Blue Alliance.", "title": "Test Message"}, "message_type": "ping"}')
      .expect(200, t.end)
  })
}
