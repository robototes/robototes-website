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

// Load middleware
let middlewares = require('koa-load-middlewares')()
middlewares.cors = require('kcors')

// Logging
const log = debug('robototes-website:server')
const logHTTP = debug('http')

// Load configuration
dotenv.load({
  errorOnMissing: true,
  overrideProcessEnv: true
})
log('Loaded configuration')

// Local code
const router = require('./routes/')
const webhookRouter = require('./routes/webhooks')

// Create a new app
const app = new Koa()

// Initializes and attaches pug
let pug = new middlewares.pug({
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
    ctx.status = ctx.status || 404
    if (ctx.status >= 400) ctx.throw(ctx.status)
    else logHTTP(`\t--> ${ctx.status} OK`)
  } catch (err) {
    err.status = err.status || ctx.status
    ctx.render('error', {
      error: err
    })
    ctx.status = err.status
    ctx.app.emit('err', err, ctx)
    logHTTP(err)
    logHTTP(`\t--> ${ctx.status} NOT OK: ${err.message}`)
  }
})
.use(middlewares.bodyparser())
.use(middlewares.helmet.contentSecurityPolicy({ // CSP
  directives: {
    defaultSrc: [ "'self'" ],
    scriptSrc: [
      '\'self\'',
      `cdn.${process.env.DOMAIN}`,
      'cdnjs.cloudflare.com',
      'ajax.cloudflare.com',
      'www.google-analytics.com',
      'analytics.google.com',
      'www.google.com',
      "'unsafe-eval'",
      "'unsafe-inline'"
    ],
    styleSrc: [
      '\'self\'',
      `cdn.${process.env.DOMAIN}`,
      'cdnjs.cloudflare.com',
      'fonts.googleapis.com',
      "'unsafe-inline'"
    ],
    fontSrc: [
      '\'self\'',
      `cdn.${process.env.DOMAIN}`,
      'cdnjs.cloudflare.com',
      'fonts.gstatic.com'
    ],
    imgSrc: [
      '\'self\'',
      'data:',
      `cdn.${process.env.DOMAIN}`,
      'www.google-analytics.com',
      'stats.g.doubleclick.net',
      'cdnjs.cloudflare.com',
      'ssl.gstatic.com'
    ],
    childSrc: [ 'docs.google.com' ],
    sandbox: [ 'allow-forms', 'allow-scripts', 'allow-same-origin', 'allow-popups' ],
    objectSrc: [ "'none'" ]
  }
}))
.use(middlewares.helmet.hpkp({ // HTTP Public Key Pinning
  maxAge: 60 * 60 * 24 * 90,
  sha256s: process.env.HPKP_HASHES.split(','),
  includeSubdomains: true
}))
.use(middlewares.helmet.xssFilter())
.use(middlewares.helmet.frameguard({ action: 'deny' })) // Prevents framing
.use(middlewares.helmet.hidePoweredBy()) // Removes X-Powered-By header
.use(middlewares.helmet.ieNoOpen())
.use(middlewares.helmet.noSniff()) // Prevents MIME type sniffing
.use(middlewares.cors({ origin: [ `cdn.${process.env.DOMAIN}` ] })) // Enables CORS
.use(middlewares.cacheControl({
  noCache: process.env.DEBUG != null,
  maxAge: 2678400
}))
.use(middlewares.favicon(path.resolve(__dirname, '..', 'views', 'cdn', 'media', 'robotote.ico')))
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
