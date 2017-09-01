const router = require('koa-router')()

const members = require('../../configs/members')
const robots = require('../../configs/robots')
const slideshow = require('../../configs/slideshow')
const sponsors = require('../../configs/sponsors')
const seo = require('../../configs/seo')

router.get('/', async ctx => {
  await ctx.render('index', {
    seo: {
      title: 'Home | Team 2412 - The Robototes'
    },
    slideshowImages: slideshow
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
.get('/resources', ctx => {
  ctx.status = 301
  ctx.redirect('/contact')
})
.get('/contact', async ctx => {
  await ctx.render('contact', {
    teamMembers: members.teamMembers,
    developers: members.developers,
    seo: {
      title: 'Contact Us | Team 2412 - The Robototes'
    }
  })
})
.get('/blog', ctx => {
  ctx.status = 301
  ctx.redirect(`https://blog.${process.env.DOMAIN}`)
})
.get('/robots.txt', ctx => {
  ctx.body = ''
  let robotstxt = []
  if (process.env.DEBUG != null) robotstxt = seo.robots.debug
  else robotstxt = seo.robots.production
  robotstxt.forEach(function (current) {
    ctx.body += current.key + ': ' + current.value + '\n'
  })
})
.get('/sitemap.xml', ctx => {
  ctx.status = 501
})

module.exports = router
