const logTBA = require('debug')('robototes-website:thebluealliance')
const crypto = require('crypto')
const router = require('koa-router')({
  prefix: '/webhook'
})

router.post('/tba', ctx => {
  if (process.env.DEBUG != null) {
    // Verify that the request is from TBA and has not been tampered with
    let hash = crypto.createHash('sha1')
    hash.update(process.env.TBA_SECRET_KEY)
    hash.update(ctx.request.rawBody)

    if (hash.digest('hex') === ctx.request.headers['x-tba-checksum']) {
      switch (ctx.request.body.message_type) {
        case 'upcoming_match':
          break
        case 'match_score':
          // TODO Add record to database
          break
        case 'alliance_selection':
          break
        case 'awards_posted':
          break
        case 'media_posted':
          throw new Error('Not implemented yet')
        case 'final_results':
          throw new Error('Not implemented yet')
        case 'ping':
          logTBA('Ping received from The Blue Alliance')
          break
        case 'broadcast':
          break
        case 'verification':
          logTBA('Verification code received:', ctx.request.body.message_data.verification_key)
          break
        default:
          logTBA(ctx.request.body)
      }
      ctx.status = 200
    } else {
      ctx.status = 403
    }
  } else {
    ctx.status = 501
  }
})

module.exports = router
