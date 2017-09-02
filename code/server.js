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
const Pug = require('koa-pug')
const favicon = require('koa-favicon')
const helmet = require('koa-helmet')
const cors = require('kcors')
const bodyparser = require('koa-bodyparser')
const compress = require('koa-compress')
const cacheControl = require('koa-cache-control')

// Local code
const router = require('./routes/')

// Logging
const log = debug('robototes-website:server')
const logHTTP = debug('http')

// Load configuration
dotenv.load({
  errorOnMissing: true,
  overrideProcessEnv: true
})
log('Loaded configuration')

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
    ctx.status = ctx.status || 404
    if (ctx.status >= 400) {
      logHTTP(`\t--> ${ctx.status} NOT OK`)
      ctx.throw(ctx.status)
    } else logHTTP(`\t--> ${ctx.status} OK`)
  } catch (err) {
    ctx.status = err.status || 500
    ctx.render('error', {
      errorCode: ctx.status,
      error: err
    })
    ctx.app.emit('err', err, ctx)
    logHTTP(`\t--> ${ctx.status} ${err.message}`)
  }
})
.use(helmet.contentSecurityPolicy({ // CSP
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
      `cdn.${process.env.DOMAIN}`,
      'www.google-analytics.com',
      'cdnjs.cloudflare.com',
      'ssl.gstatic.com'
    ],
    childSrc: [ 'docs.google.com' ],
    sandbox: [ 'allow-forms', 'allow-scripts', 'allow-same-origin', 'allow-popups' ],
    objectSrc: [ "'none'" ]
  }
}))
.use(helmet.hpkp({ // HTTP Public Key Pinning
  maxAge: 60 * 60 * 24 * 90,
  sha256s: process.env.HPKP_HASHES.split(','),
  includeSubdomains: true
}))
.use(helmet.xssFilter())
.use(helmet.frameguard({ action: 'deny' })) // Prevents framing
.use(helmet.hidePoweredBy()) // Removes X-Powered-By header
.use(helmet.ieNoOpen())
.use(helmet.noSniff()) // Prevents MIME type sniffing
.use(cors({ origin: [ `cdn.${process.env.DOMAIN}` ] })) // Enables CORS
.use(bodyparser({
  onerror: (err, ctx) => {
    ctx.throw(400, 'Bad Request', { error: err })
  }
}))
.use(cacheControl({
  noCache: process.env.DEBUG != null,
  maxAge: 2678400
}))
.use(favicon(path.resolve(__dirname, '..', 'views', 'cdn', 'media', 'robotote.ico')))
.use(compress()) // Compresses responses
.use(router.routes())
.use(router.allowedMethods())
log('Configured routing')

// Start the server
module.exports = app.listen(process.env.PORT, process.env.IP, () => {
  log(`Server listening on port ${process.env.PORT}`)
})
