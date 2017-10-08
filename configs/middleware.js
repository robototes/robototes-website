const path = require('path')

module.exports = {
  helmet: {
    contentSecurityPolicy: {
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
        childSrc: [
          'docs.google.com',
          'calendar.google.com'
        ],
        sandbox: [ 'allow-forms', 'allow-scripts', 'allow-same-origin', 'allow-popups' ],
        objectSrc: [ "'none'" ]
      }
    },
    hpkp: {
      maxAge: 60 * 60 * 24 * 90,
      sha256s: process.env.HPKP_HASHES.split(','),
      includeSubdomains: true
    },
    frameguard: { action: 'deny' }
  },
  cors: { origin: [ `cdn.${process.env.DOMAIN}` ] },
  cacheControl: {
    noCache: process.env.DEBUG != null,
    maxAge: 2678400
  },
  favicon: path.resolve(__dirname, '..', 'views', 'cdn', 'media', 'robotote.ico')
}
