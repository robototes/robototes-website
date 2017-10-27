const request = require('request')
const nconf = require('nconf')
const passport = require('koa-passport')

const logMembers = require('debug')('robototes-website-team:router')
const router = require('koa-router')({
  prefix: '/members'
})

.get('/', passport.authenticate('auth0'), async ctx => {
  await ctx.render('index', {
    seo: {
      title: 'Members | Team 2412 - The Robototes'
    }
  })
})
.get('/login', passport.authenticate('auth0', { failureRedirect: '/members/login' }))
.get('/logout', ctx => {
  ctx.logout()
  ctx.redirect('/members')
})

router.post('/invite/github', ctx => ctx.isAuthenticated, ctx => {
  logMembers('Inviting user to @robototes organization')

  request.put(`https://api.github.com/teams/1/memberships/${ctx.request.body.githubUsername}`, (err, res, body) => {
    console.error(err)
  })
  // PUT https://api.github.com/teams/1/memberships/:username
})
.post('/invite/slack', ctx => ctx.isAuthenticated, ctx => {
  logMembers('Inviting user to Slack')

  request.post('https//slack.com/api/users.admin.invite', {
    json: {
      token: nconf.get('SLACK_API_TOKEN'),
      email: 'email@example.com',
      channels: [
        'announcements',
        'general',
        'random'
      ].join(','),
      first_name: 'John',
      last_name: 'Doe'
    }
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      try {
        let responseJSON = JSON.parse(body)
        if (responseJSON.ok === true) {
          if (responseJSON.warning != null) {
            logMembers(`Slack API warning: ${responseJSON.warning}`)
          }
          logMembers('User invited successfully')
          ctx.status = 200
        } else {
          logMembers(`Slack API error: ${responseJSON.error}`)
        }
      } catch (err) {
        logMembers('Error parsing Slack API response')
        ctx.throw(500)
      }
    } else {
      logMembers('Request to add user to Slack failed')
      ctx.throw(500)
    }
  })
})

module.exports = router
