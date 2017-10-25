// System imports
const path = require('path')

// External modules
const debug = require('debug')
const nconf = require('nconf')
const Koa = require('koa')

// Logging
const log = debug('robototes-website:server')
const logHTTP = debug('http')

// Load configuration
nconf.env()
  .required([
    'PORT',
    'IP',
    'DOMAIN',
    'G_TRACKING_ID',
    'HPKP_HASHES',
    'DATABASE_HOST',
    'DATABASE_PORT'
  ])
log('Loaded configuration')

// Load middleware and middleware configuration
let middlewares = require('koa-load-middlewares')()
middlewares.cors = require('kcors')
middlewares.config = require('./configs/middleware')
const Pug = middlewares.pug

// Local code
const router = require('./routes/')

// Create a new app
const app = new Koa()

// Initializes and attaches Pug
let pug = new Pug({
  viewPath: path.resolve(__dirname, 'views', 'pages'),
  basedir: path.resolve(__dirname, 'views', 'partials'),
  debug: nconf.get('DEBUG') != null,
  pretty: false,
  locals: {
    socialMedia: require('./configs/social.js'),
    nconf
  }
})
pug.use(app)
log('Initialized Pug')

// Middleware
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
    // Make sure we have an error code
    err.status = err.status || ctx.status

    // Render the error page
    ctx.render('error', {
      error: err
    })
    ctx.status = err.status // Correct the response back to an error response (since ctx.render changes it to 200)

    // Tell Koa that we've handled an error
    ctx.app.emit('err', err, ctx)

    // Log the error and our response
    logHTTP(err)
    logHTTP(`\t--> ${ctx.status} NOT OK: ${err.message}`)
  }
})
.use(middlewares.bodyparser())
.use(middlewares.helmet.contentSecurityPolicy(middlewares.config.helmet.contentSecurityPolicy)) // CSP
.use(middlewares.helmet.hpkp(middlewares.config.helmet.hpkp)) // HTTP Public Key Pinning
.use(middlewares.helmet.xssFilter())
.use(middlewares.helmet.frameguard(middlewares.config.helmet.frameguard)) // Prevents framing
.use(middlewares.helmet.hidePoweredBy()) // Removes X-Powered-By header
.use(middlewares.helmet.ieNoOpen())
.use(middlewares.helmet.noSniff()) // Prevents MIME type sniffing
.use(middlewares.cors(middlewares.config.cors)) // Enables CORS
.use(middlewares.cacheControl(middlewares.config.cacheControl))
.use(middlewares.favicon(middlewares.config.favicon))
.use(middlewares.compress()) // Compresses responses
.use(router.routes())
.use(router.allowedMethods())
log('Configured routing')

// Start the server
module.exports = app.listen(nconf.get('PORT'), nconf.get('IP'), () => {
  log(`Server listening on port ${nconf.get('PORT')}`)
})
