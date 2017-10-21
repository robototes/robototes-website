const request = require('request')
const nconf = require('nconf')

const logMembers = require('debug')('robototes-website:members')
const router = require('koa-router')({
  prefix: '/members'
})

module.exports = function (passport) {
  router.get('/', ctx => {
    if (ctx.isAuthenticated()) {
      return true
    } else {
      ctx.status = 302
      ctx.redirect('/members/login')
    }
  }, async ctx => {
    await ctx.render('members/index', {
      seo: {
        title: 'Members | Team 2412 - The Robototes'
      }
    })
  })
  .get('/login', async ctx => {
    await ctx.render('members/login', {
      seo: {
        title: 'Log in | Team 2412 - The Robototes'
      }
    })
  })
  .get('/logout', ctx => {
    ctx.logout()
    ctx.redirect('/')
  })

  router.post('/login', passport.authenticate('auth0', { successReturnToOrRedirect: '/', failureRedirect: '/login' }))
  .post('/invite/github', ctx => ctx.isAuthenticated, ctx => {
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

  return router
}
