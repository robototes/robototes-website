const logTBA = require('debug')('robototes-website:thebluealliance')
const crypto = require('crypto')
const router = require('koa-router')({
  prefix: '/webhook'
})

router.post('/tba', ctx => {
  // TODO verify X-TBA-Checksum
  let hash = crypto.createHash('sha1')
  hash.update(process.env.TBA_SECRET_KEY)
  logTBA(ctx.request.body)
  hash.update(JSON.stringify(ctx.request.body))
  console.log(hash.digest('hex'))
  logTBA(`Checksum received: ${ctx.request.headers['x-tba-checksum']}`)
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
})

module.exports = router
