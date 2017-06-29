/*
Copyright (C) 2017 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited.
 */
// System imports
const path = require('path')

// External modules
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const Koa = require('koa')
const Pug = require('koa-pug')
const helmet = require('koa-helmet')
const cors = require('kcors')
const bodyparser = require('koa-bodyparser')
const compress = require('koa-compress')
const error = require('koa-error')

// Local code
const router = require('./routes/')
const strings = require('./strings/')

// Load configuration
dotenvExpand(dotenv.config())

// Create a new app
const app = new Koa()

// Initializes and attaches pug
let pug = new Pug({
  viewPath: path.resolve(__dirname, '..', 'views', 'pages'),
  debug: process.env.DEBUG != null,
  pretty: false,
  locals: { strings }
})
pug.use(app)

// Middleware
app.use(error({
  // engine: 'pug',
  // template: path.resolve(__dirname, '..', 'views', 'pages', 'error.pug')
}))
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
.use(compress()) // Compresses responses
.use(router.routes())
.use(router.allowedMethods())

// Start the server
app.listen(process.env.PORT)
