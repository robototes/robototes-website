# DNS and Proxy

We use Cloudflare for our DNS and proxy.

## DNS

The following are our DNS records, grouped by type.

### MX

We use Zoho Mail for `@robototes.com` addresses, so these records are used to point to their services.

| Name            | Priority  | Domain        |
|-----------------|-----------|---------------|
| robototes.com.  | 10        | mx.zoho.com.  |
| robototes.com.  | 20        | mx2.zoho.com. |

### TXT

DKIM records are used to help validate our emails so they don't get flagged as spam.

| Name                                | Value                                                                                                                                                                                                                                           |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| default._domainkey.robototes.com.   | "v=DKIM1\; k=rsa\; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/sEarcL2nCPvUlGgOaXAwdOsoKMtv6So5nPkQzJGWpsk6mQRqnKuOLnnyftzyHk0DCEe10UWLWw2AQRxKcOx3wOUhvwECcKLBWOv4egZSUBtbzZ3tM/0hG1hyDEWI1QMgtNZJ304n1MaJHbCPTIG+zBgFYV68ggAtBZFM7RX+iwIDAQAB"  |
| robototes.com.                      | "v=spf1 include:zoho.com ~all"                                                                                                                                                                                                                  |

### CNAME

For external services like our CDN, blog, and status page, we use CNAME records. Using Cloudflare, we can also proxy this traffic to reduce origin load and improve caching.

| Name                         | Domain                                  | Proxy (CloudFlare Only)  |
|------------------------------|-----------------------------------------|--------------------------|
| www.robototes.com.           | robototes.com                           | true                     |
| first.robototes.com.         | robototes.com                           | true                     |
| cdn.robototes.com.           | cdn.robototes.com.s3.amazonaws.com.     | true                     |
| blog.robototes.com.          | ghs.google.com.                         | true                     |
| status.robototes.com.        | stats.uptimerobot.com.                  | false                    |
| j5uos2mtlg3n.robototes.com.  | gv-45puxlwh2ojb7k.dv.googlehosted.com.  | true                     |
| zb14818593.robototes.com.    | zmverify.zoho.com.                      | false                    |

### A

Our server is the only A record here, plus there are CNAME records above to resolve `www` and the old `first` subdomain. To protect our origin, we use the Cloudflare proxy here.

| Name            | IP            | Proxy (CloudFlare Only) |
|-----------------|---------------|-------------------------|
| robototes.com.  | <server ip>   | true                    |

## Cloudflare Options

We use Cloudflare specific features to improve speed and security, plus offload simple tasks from our server.

### Page Rules

Cloudflare helps us upgrade insecure requests and redirect to the correct URLs for our site.

| Type            | Filter                          | Behavior                      |
|-----------------|---------------------------------|-------------------------------|
| SSL             | https://www.robototes.com/*     | Strict                        |
| Redirect (301)  | first.robototes.com/*           | https://www.robototes.com/$1  |
| Redirect (301)  | robototes.com/*                 | https://www.robototes.com/$1  |

### Other options (CloudFlare Only)

We use some miscellaneous settings that improve security and speed, plus allow for our site to stay online when the origin is down.

| Setting             | Value                           |
|---------------------|---------------------------------|
| Always Use HTTPS    | On                              |
| HSTS                | 12 months, subdomains, preload  |
| Security Level      | Medium                          |
| Email Obfuscation   | On                              |
| Browser Cache       | 8 days                          |
| Always Online       | On                              |
