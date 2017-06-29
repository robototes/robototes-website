const router = require('koa-router')()

router.get('/', async ctx => {
  await ctx.render('index')
})
.get('/about', async ctx => {
  await ctx.render('about')
})
.get('/resources', async ctx => {
  await ctx.render('resources')
})
.get('/blog', ctx => {
  ctx.status = 301
  ctx.redirect(`//blog.${process.env.DOMAIN}`)
})

module.exports = router
