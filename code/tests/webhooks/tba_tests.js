const crypto = require('crypto')

const messages = require('./tba_notifications')

let getHash = function (message) {
  let hash = crypto.createHash('sha1')
  hash.update(process.env.TBA_SECRET_KEY)
  hash.update(JSON.stringify(message))
  return hash.digest('hex')
}

module.exports = function (test) {
  // Response statuses
  test.cb('Denies empty requests', t => {
    test.request.post('/webhook/tba')
      .expect(400, t.end)
  })
  test.cb('Denies requests with invalid checksums (403)', t => {
    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', 'invalidchecksum')
      .send(messages.ping)
      .expect(403, t.end)
  })
  test.cb('Denies requests with no checksum (403)', t => {
    test.request.post('/webhook/tba')
      .send(messages.ping)
      .expect(403, t.end)
  })
  test.cb('Denies requests with invalid message types (400)', t => {
    let message = {
      message_type: 'invalid_type',
      message_data: {}
    }

    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(message))
      .send(message)
      .expect(400, t.end)
  })
  test.cb('Denies requests with no message type (400)', t => {
    let message = {
      message_data: {}
    }

    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(message))
      .send(message)
      .expect(400, t.end)
  })
  test.cb('Denies requests with no message body (400)', t => {
    let message = {
      message_type: {}
    }

    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(message))
      .send(message)
      .expect(400, t.end)
  })
  test.cb('Denies empty requests (400)', t => {
    let message = {}

    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(message))
      .send(message)
      .expect(400, t.end)
  })
  test.cb('Acknowledges upcoming match notifications (200)', t => {
    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(messages.upcoming_match))
      .send(messages.upcoming_match)
      .expect(200, t.end)
  })
  test.cb('Acknowledges match score notifications (200)', t => {
    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(messages.match_score))
      .send(messages.match_score)
      .expect(200, t.end)
  })
  test.cb('Acknowledges competition level notifications (200)', t => {
    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(messages.starting_comp_level))
      .send(messages.starting_comp_level)
      .expect(200, t.end)
  })
  test.cb('Acknowledges alliance selection notifications (200)', t => {
    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(messages.alliance_selection))
      .send(messages.alliance_selection)
      .expect(200, t.end)
  })
  test.cb('Acknowledges award notifications (200)', t => {
    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(messages.awards_posted))
      .send(messages.awards_posted)
      .expect(200, t.end)
  })
  test.cb('Acknowledges new media (501)', t => {
    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(messages.media_posted))
      .send(messages.media_posted)
      .expect(501, t.end) // Not implemented by TBA yet
  })
  test.cb('Acknowledges district point notifications (501)', t => {
    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(messages.district_points_updated))
      .send(messages.district_points_updated)
      .expect(501, t.end) // Not implemented by TBA yet
  })
  test.cb('Acknowledges event schedule updates (200)', t => {
    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(messages.schedule_updated))
      .send(messages.schedule_updated)
      .expect(200, t.end)
  })
  test.cb('Acknowledges results (501)', t => {
    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(messages.final_results))
      .send(messages.final_results)
      .expect(501, t.end) // Not implemented by TBA yet
  })
  test.cb('Acknowledges pings (200)', t => {
    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(messages.ping))
      .send(messages.ping)
      .expect(200, t.end)
  })
  test.cb('Acknowledges broadcasts (200)', t => {
    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(messages.broadcast))
      .send(messages.broadcast)
      .expect(200, t.end)
  })
  test.cb('Acknowledges verification codes (200)', t => {
    test.request.post('/webhook/tba')
      .set('X-TBA-Checksum', getHash(messages.verification))
      .send(messages.verification)
      .expect(200, t.end)
  })
}
