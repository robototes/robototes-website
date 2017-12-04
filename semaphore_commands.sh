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
# Setup
yarn --version
node --version
git submodule init
git submodule update
for wd in {web,api,team}; do yarn install --cwd $wd; done
# Testing
for wd in {web,api,team}; do cd $wd && yarn test && cd ..; done
# After
git submodule deinit --force --all

## Deployments

# Production
# Download the CDN files
svn export https://github.com/robototes/robototes-website-web/trunk/views/cdn/
# List CDN files
ls -l $(pwd)/cdn/
# Upload CDN files to S3
docker run --rm -e AWS_ACCESS_KEY_ID \
  -e AWS_SECRET_ACCESS_KEY \
  -v $(pwd)/cdn/:/workspace/ \
  xueshanf/awscli aws s3 sync /workspace/ s3://cdn.robototes.com/ --delete
# Purge the Cloudflare cache of our CDN files
curl -X DELETE "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/purge_cache" \
  -H "X-Auth-Email: $CF_API_USER" \
  -H "X-Auth-Key: $CF_API_KEY" \
  -H "Content-Type: application/json" \
  --data '{"files":["https://cdn.robototes.com/"]}'
# Upgrade our server containers/configuration
docker run --rm -v $(pwd)/docker-compose.yml:/workspace/docker-compose.yml \
  -v $(pwd)/rancher-compose.yml:/workspace/rancher-compose.yml \
  -e RANCHER_URL \
  -e RANCHER_ACCESS_KEY \
  -e RANCHER_SECRET_KEY \
  -e DOMAIN \
  -e G_TRACKING_ID \
  -e TBA_SECRET_KEY \
  -e AUTH0_CLIENT_ID \
  -e AUTH0_CLIENT_SECRET \
  -e AUTH0_DOMAIN \
  -e CERTIFICATE \
  monostream/rancher-compose rancher-compose up -d --upgrade --pull --confirm-upgrade
