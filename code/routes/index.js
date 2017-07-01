const router = require('koa-router')()

const members = require('../../configs/members')
const robots = require('../../configs/robots')
const sponsors = require('../../configs/sponsors')

router.get('/', async ctx => {
  await ctx.render('index', {
    seo: {
      title: 'Home | Team 2412 - The Robototes'
    }
  })
})
.get('/about', async ctx => {
  await ctx.render('about', {
    seo: {
      title: 'About | Team 2412 - The Robototes'
    },
    robots: robots,
    sponsors: sponsors
  })
})
.get('/resources', async ctx => {
  await ctx.render('resources', {
    teamMembers: members.teamMembers,
    developers: members.developers,
    seo: {
      title: 'Resources | Team 2412 - The Robototes'
    }
  })
})
.get('/blog', ctx => {
  ctx.status = 301
  ctx.redirect(`https://blog.${process.env.DOMAIN}`)
})
.get('/forms/feedback', ctx => {
  ctx.status = 301
  ctx.redirect('https://docs.google.com/forms/d/e/1FAIpQLSc5SdCkTTWJXQYXTO-TGej9yAiyfsk34U6BhhKprdTtGLWPhg/viewform?usp=sf_link')
})
.get('/robots.txt', ctx => {
  [
    { key: 'User-Agent', value: '*' },
    { key: 'Allow', value: '/' },
    { key: 'Sitemap', value: '/sitemap.xml' }
  ].forEach(function (current) {
    ctx.body += current.key + ': ' + current.value + '\n'
  })
})
.get('/sitemap.xml', ctx => {
  ctx.status = 501
})

module.exports = router
