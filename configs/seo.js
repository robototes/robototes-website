module.exports = {
  robots: {
    debug: [
      { key: 'User-Agent', value: '*' },
      { key: 'Disallow', value: '*' }
    ],
    production: [
      { key: 'User-Agent', value: '*' },
      { key: 'Allow', value: '/' },
      { key: 'Sitemap', value: '/sitemap.xml' }
    ]
  }
}
