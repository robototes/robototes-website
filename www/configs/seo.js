const nconf = require('nconf')

module.exports = {
  robots: {
    debug: [
      { key: 'User-Agent', value: '*' },
      { key: 'Disallow', value: '/' }
    ],
    production: [
      { key: 'User-Agent', value: '*' },
      { key: 'Allow', value: '/' },
      { key: 'Sitemap', value: `https://www.${nconf.get('DOMAIN')}/sitemap.xml` }
    ]
  },
  sitemap: {
    '@': {
      'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9'
    },
    'url': [
      {
        loc: `https://${nconf.get('DOMAIN')}/`,
        priority: 1,
        changefreq: 'weekly'
      },
      {
        loc: `https://${nconf.get('DOMAIN')}/about`,
        priority: 0.7,
        changefreq: 'weekly'
      },
      {
        loc: `https://${nconf.get('DOMAIN')}/contact`,
        priority: 0.5,
        changefreq: 'weekly'
      }
    ]
  }
}
