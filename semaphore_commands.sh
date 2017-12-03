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
# Download CDN files
svn export https://github.com/robototes/robototes-website-web/trunk/views/cdn/
# List CDN files
ls -l $(pwd)/cdn/

## Deployments

# Production
# Upload CDN files to S3
docker run --rm -e "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID" \
  -e "AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY" \
  -v $(pwd)/cdn/:/workspace/ \
  xueshanf/awscli aws s3 sync /workspace/ s3://cdn.robototes.com/
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
  monostream/rancher-compose rancher-compose up --upgrade --pull --confirm-upgrade
