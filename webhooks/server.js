// External modules
const debug = require('debug')
const nconf = require('nconf')
const Koa = require('koa')
const router = require('koa-router')({
  prefix: '/webhook'
})

// Logging
const log = debug('robototes-website-api:server')
const logHTTP = debug('http')

// Load configuration
nconf.env()
  .required([
    'PORT',
    'IP',
    'TBA_SECRET_KEY',
    'DATABASE_HOST',
    'DATABASE_PORT'
  ])
log('Loaded configuration')

// Load middleware
let middlewares = require('koa-load-middlewares')()

// Create a new app
const app = new Koa()

// Configure middleware
app.use(async (ctx, next) => {
  logHTTP(`<-- ${ctx.path}`)
  try {
    await next()

    // Get the status of any responses or assume the request wasn't handled
    ctx.status = ctx.status || 404

    // Throw any error codes, or just report and continue
    if (ctx.status >= 400) ctx.throw(ctx.status)
    else logHTTP(`\t--> ${ctx.status} OK`)
  } catch (err) {
    // Make sure our response reflects our error
    ctx.status = err.status

    // Tell Koa that we've handled an error
    ctx.app.emit('err', err, ctx)

    // Log the error and our response
    logHTTP(err)
    logHTTP(`\t--> ${err.status} NOT OK: ${err.message}`)
  }
})
  .use(middlewares.bodyparser())
  .use(middlewares.compress()) // Compresses responses
log('Configured middleware')

// Link all webhooks to the router
router.post('/tba', require('./routes/thebluealliance'))

// Add the routes
app.use(router.routes())
  .use(router.allowedMethods())
log('Configured routing')

// Start the server
module.exports = app.listen(nconf.get('PORT'), nconf.get('IP'), () => {
  log(`Server listening on port ${nconf.get('PORT')}`)
})
