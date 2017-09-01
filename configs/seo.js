module.exports = {
  robots: {
    debug: [
      { key: 'User-Agent', value: '*' },
      { key: 'Disallow', value: '/' }
    ],
    production: [
      { key: 'User-Agent', value: '*' },
      { key: 'Allow', value: '/' },
      { key: 'Sitemap', value: '/sitemap.xml' }
    ]
  },
  sitemap: {
    '@': {
      'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9'
    },
    'url': [
      {
        loc: 'https://www.robototes.com/',
        priority: 1,
        changefreq: 'weekly'
      },
      {
        loc: 'https://www.robototes.com/about',
        priority: 0.7,
        changefreq: 'weekly'
      },
      {
        loc: 'https://www.robototes.com/contact',
        priority: 0.5,
        changefreq: 'weekly'
      }
    ]
  }
}
