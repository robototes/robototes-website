const logTBA = require('debug')('robototes-website:thebluealliance')
const crypto = require('crypto')
const router = require('koa-router')({
  prefix: '/webhook'
})

router.post('/tba', ctx => {
  if (process.env.DEBUG != null) {
    let message = ctx.request.body

    if (message !== {} && message.message_type != null && message.message_data != null) {
      // Verify that the request is from TBA and has not been tampered with
      let hash = crypto.createHash('sha1')
      hash.update(process.env.TBA_SECRET_KEY)
      hash.update(ctx.request.rawBody)

      if (ctx.request.headers.hasOwnProperty('x-tba-checksum') !== -1 && hash.digest('hex') === ctx.request.headers['x-tba-checksum']) {
        switch (ctx.request.body.message_type) {
          case 'upcoming_match':
            ctx.status = 200
            break
          case 'match_score':
            // TODO Add record to database
            ctx.status = 200
            break
          case 'starting_comp_level':
            ctx.status = 200
            break
          case 'alliance_selection':
            ctx.status = 200
            break
          case 'awards_posted':
            ctx.status = 200
            break
          case 'media_posted':
            ctx.throw(501)
            break
          case 'district_points_updated':
            ctx.throw(501)
            break
          case 'schedule_updated':
            ctx.status = 200
            break
          case 'final_results':
            ctx.throw(501)
            break
          case 'ping':
            logTBA('Ping received from The Blue Alliance')
            ctx.status = 200
            break
          case 'broadcast':
            ctx.status = 200
            break
          case 'verification':
            logTBA('Verification code received:', ctx.request.body.message_data.verification_key)
            ctx.status = 200
            break
          default:
            logTBA(ctx.request.body)
            ctx.status = 400
        }
      } else {
        ctx.throw(403)
      }
    } else {
      ctx.throw(400)
    }
  } else {
    ctx.throw(501)
  }
})

module.exports = router
