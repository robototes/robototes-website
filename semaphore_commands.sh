#### For microservices

## Build stages

# Setup
yarn --version
node --version
yarn install

# Testing
yarn test

# After job
yarn coverage

## Deployments

# Docker Hub
docker --version
docker build -t robototes-website-$NAME .
docker tag robototes-website-$NAME robototes/robototes-website-$NAME:${REVISION:0:7}
docker tag robototes-website-$NAME robototes/robototes-website-$NAME:latest
docker push robototes/robototes-website-$NAME

#### For this repository

## Build stages
# Preview DNS changes
docker run --rm -v $(pwd)/dnsconfig.js:/dns/dnsconfig.js \
  -v $(pwd)/creds.json.env:/dns/creds.json.env \
  -e "CF_API_USER=$CF_API_USER" \
  -e "CF_API_KEY=$CF_API_KEY" \
  stackexchange/dnscontrol dnscontrol preview

## Deployments

# Production
# Upload CDN files to S3
git clone https://github.com/robototes/robototes-website-web.git web/
docker run --rm -e "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID" \
  -e "AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY " \
  -v $(pwd)/web/views/cdn/:/workspace/ \
  xueshanf/awscli s3 sync / s3://cdn.robototes.com/
# Purge the Cloudflare cache of our CDN files
docker run --rm -e "CF_ZONE_ID=$CF_ZONE_ID" \
  -e "CF_API_USER=$CF_API_USER" \
  -e "CF_API_KEY=$CF_API_KEY" \
  anjuna/cfcli purge cdn.robototes.com
# Upgrade our server containers/configuration
docker run --rm -v $(pwd)/docker-compose.yml:/workspace/docker-compose.yml \
  -v $(pwd)/rancher-compose.yml:/workspace/rancher-compose.yml \
  -e "RANCHER_URL=$RANCHER_URL" \
  -e "RANCHER_ACCESS_KEY=$RANCHER_ACCESS_KEY" \
  -e "RANCHER_SECRET_KEY=$RANCHER_SECRET_KEY" \
  monostream/rancher-compose up --upgrade --pull --confirm-upgrade
sed -i "s/{ SERVER_IP }/$SERVER_IP/g" dnsconfig.js # Fill in server IP and CDN URL
# Update our DNS
docker run --rm -v $(pwd)/dnsconfig.js:/dns/dnsconfig.js \
  -v $(pwd)/creds.json.env:/dns/creds.json.env \
  -e "CF_API_USER=$CF_API_USER" \
  -e "CF_API_KEY=$CF_API_KEY" \
  stackexchange/dnscontrol dnscontrol push
