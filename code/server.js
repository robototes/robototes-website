/*
Copyright (C) 2017 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited.
 */
// System imports
const path = require('path')

// External modules
const debug = require('debug')
const dotenv = require('dotenv-extended')
const Koa = require('koa')

// Logging
const log = debug('robototes-website:server')
const logHTTP = debug('http')

// Load configuration
dotenv.load({
  errorOnMissing: true,
  overrideProcessEnv: true
})
log('Loaded configuration')

// Load middleware and middleware configuration
let middlewares = require('koa-load-middlewares')()
middlewares.cors = require('kcors')
middlewares.config = require('../configs/middleware')
const Pug = middlewares.pug

// Local code
const router = require('./routes/')
const webhookRouter = require('./routes/webhooks')

// Create a new app
const app = new Koa()

// Initializes and attaches pug
let pug = new Pug({
  viewPath: path.resolve(__dirname, '..', 'views', 'pages'),
  basedir: path.resolve(__dirname, '..', 'views', 'partials'),
  debug: process.env.DEBUG != null,
  pretty: false,
  locals: {
    socialMedia: require('../configs/social.js')
  }
})
pug.use(app)
log('Initialized pug')

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
.use(webhookRouter.routes())
.use(webhookRouter.allowedMethods())
log('Configured routing')

// Start the server
module.exports = app.listen(process.env.PORT, process.env.IP, () => {
  log(`Server listening on port ${process.env.PORT}`)
})
