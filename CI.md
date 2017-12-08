## CI/CD commands

The following are the commands used by our CI/CD service. We use Semaphore CI to facilitate automated testing and deployment to
Docker Hub and our production environment.

### For microservices

Our microservices are all tested in an identical manner. They each have different test suites and CI projects, but use the same
commands to test

#### Build stages

##### Setup

* `yarn --version`
* `node --version`
* `yarn install`

##### Testing

* `yarn test`

##### After job

* `yarn coverage`

#### Deployments

We deploy each microservice to Docker Hub, where it is pulled from by our production server.

##### Docker Hub

Don't forget to replace `<name>` with the microservice name.

* `docker --version`
* `docker build -t robototes-website-<name> .`
* `docker tag robototes-website-<name> robototes/robototes-website-<name>:${REVISION:0:7}`
* `docker tag robototes-website-<name> robototes/robototes-website-<name>:latest`
* `docker push robototes/robototes-website-<name>`

### For this repository

This repository is the control project, it is used to define global configurations for the overall website. We use CI to test each microservice one last time
before deploying, a multi-step process of first deploying our CDN files and updating global caches, then updating the microservices running in production.

#### Build stages

Each of the microservices is referenced as a submodule in this repository, both for easy access and to lock a specific version. Each submodule is at a specific
commit, deemed the most stable and production-ready. This ensures the CDN files are from the same version as the rest of the code, which must be re-tested at
the same commit as the Docker images that will be deployed.

##### Setup

First, some diagnostic info:

* `yarn --version`
* `node --version`

Then, pull the code for each microservice:

* `git submodule init`
* `git submodule update`

##### Testing

To save testing time, microservices are tested in parallel:

* `cd <microservice>` (replace `<microservice>` with one of `api`, `web`, `team`)
* `yarn install`
* `yarn test`

##### After

Semaphore wants us to deinit our submodules once we're done:

* `git submodule deinit --force .`

#### Deployments

We deploy client-side files to the CDN, and pull and update containers on our production server.

##### Production

The production server is running Rancher, and the necessary API keys for each deployment tool is stored in their respective environment variables. We use
Docker containers for `awscli` and `rancher-compose` so we don't have to install those tools, and pass in the credentials using the `-e` flag in Docker.

* Deploy our CDN files to the S3 bucket
```
docker run --rm -e AWS_ACCESS_KEY_ID \
  -e AWS_SECRET_ACCESS_KEY \
  -v $(pwd)/web/views/cdn/:/workspace/ \
  xueshanf/awscli aws s3 sync /workspace/ s3://cdn.robototes.com/ --delete
```
* Purge the Cloudflare cache so the new files are available
```
curl -X DELETE "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/purge_cache" \
  -H "X-Auth-Email: $CF_API_USER" \
  -H "X-Auth-Key: $CF_API_KEY" \
  -H "Content-Type: application/json" \
  --data '{"files":["https://cdn.robototes.com/"]}'
```
* Deploy our new containers to our Rancher using `rancher-compose`
```
docker run --rm -v $(pwd)/docker-compose.yml:/workspace/docker-compose.yml \
  -v $(pwd)/rancher-compose.yml:/workspace/rancher-compose.yml \
  -e RANCHER_URL \
  -e RANCHER_ACCESS_KEY \
  -e RANCHER_SECRET_KEY \
  -e COMPOSE_PROJECT_NAME \
  -e DOMAIN \
  -e G_TRACKING_ID \
  -e TBA_SECRET_KEY \
  -e AUTH0_CLIENT_ID \
  -e AUTH0_CLIENT_SECRET \
  -e AUTH0_DOMAIN \
  -e CERTIFICATE \
  monostream/rancher-compose rancher-compose up -d --upgrade --pull --confirm-upgrade
```
