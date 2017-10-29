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

## Deployments

# Production
aws s3 sync ./views/cdn s3://cdn.robototes.com/ # Upload CDN files to S3
# Purge the Cloudflare cache of our CDN files
docker run --rm -e "CF_ZONE_ID=$CF_ZONE_ID" \
  -e "CF_API_USER=$CF_API_USER" \
  -e "CF_API_KEY=$CF_API_KEY" \
  robototes/cloudflare-cli purge cdn.robototes.com
# Upgrade our server containers/configuration
docker run --rm -v $(pwd)/docker-compose.yml:/docker-compose.yml \
  -v $(pwd)/rancher-compose.yml:/rancher-compose.yml \
  -e "RANCHER_URL=$RANCHER_URL" \
  -e "RANCHER_ACCESS_KEY=$RANCHER_ACCESS_KEY" \
  -e "RANCHER_SECRET_KEY=$RANCHER_SECRET_KEY" \
  robototes/rancher-compose up --upgrade --pull --confirm-upgrade
sed -i "s/{ SERVER_IP }/$SERVER_IP/g" dnsconfig.js # Fill in server IP and CDN URL
# Update our DNS
docker run --rm -v $(pwd)/dnsconfig.js:/dns/dnsconfig.js \
  -v $(pwd)/creds.json.env:/dns/creds.json.env \
  -e "CF_API_USER=$CF_API_USER" \
  -e "CF_API_KEY=$CF_API_KEY" \
  stackexchange/dnscontrol dnscontrol push
