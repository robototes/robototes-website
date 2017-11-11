// Flag definitions
var CF_PROXY = {
  OFF: {
    cloudflare_proxy: 'off' // No proxy
  },
  ON: {
    cloudflare_proxy: 'on' // Proxy
  },
  FULL: {
    cloudflare_proxy: 'full' // Proxy+Railgun
  }
}
var CF_PROXY_DEFAULT = {
  OFF: {
    cloudflare_proxy_default: 'off' // No proxy
  },
  ON: {
    cloudflare_proxy_default: 'on' // Proxy
  }
}

// Providers
var REG_NONE = NewRegistrar('none', 'NONE')
var CLOUDFLARE = NewDnsProvider('cloudflare', 'CLOUDFLAREAPI', { manage_redirects: true })

// Applies to all zones
DEFAULTS(
  CF_PROXY_DEFAULT.ON
)

// Zones
D('robototes.com', REG_NONE, DnsProvider(CLOUDFLARE),
  A('@', '{ SERVER_IP }'),
  CNAME('www', 'robototes.com.'),
  CNAME('first', 'robototes.com.'),
  CNAME('blog', 'ghs.google.com.'),
  CNAME('cdn', 'cdn.robototes.com.s3.amazonaws.com.'),
  CNAME('report', 'robototes.report-uri.com'),
  CNAME('status', 'stats.uptimerobot.com.', CF_PROXY.OFF),

  // Zoho Mail
  CNAME('zb14818593', 'zmverify.zoho.com.', CF_PROXY.OFF),
  MX('@', 10, 'mx.zoho.com.'),
  MX('@', 20, 'mx2.zoho.com.'),
  TXT('default._domainkey', 'v=DKIM1\; k=rsa\; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/sEarcL2nCPvUlGgOaXAwdOsoKMtv6So5nPkQzJGWpsk6mQRqnKuOLnnyftzyHk0DCEe10UWLWw2AQRxKcOx3wOUhvwECcKLBWOv4egZSUBtbzZ3tM/0hG1hyDEWI1QMgtNZJ304n1MaJHbCPTIG+zBgFYV68ggAtBZFM7RX+iwIDAQAB'),
  TXT('@', 'v=spf1 include:zoho.com ~all'),

  // Page Rules
  CF_REDIRECT('first.robototes.com/*', 'https://www.robototes.com/$1'),
  CF_REDIRECT('robototes.com/*', 'https://www.robototes.com/$1')
)

D('robototes.net', REG_NONE, DnsProvider(CLOUDFLARE),
  CNAME('@', 'www.robototes.com.'),

  // Page rules
  CF_REDIRECT('*robototes.net/*', 'https://www.robototes.com/$2') // Redirect to primary zone
)

D('robototes.org', REG_NONE, DnsProvider(CLOUDFLARE),
  CNAME('@', 'www.robototes.com.'),

  // Page rules
  CF_REDIRECT('*robototes.org/*', 'https://www.robototes.com/$2') // Redirect to primary zone
)
