## robototes-website

[![trello](https://img.shields.io/badge/trello-robototes--website-red.svg)](https://trello.com/b/GCo1iLBr/robototes-website)

This repository is the control repository for our [microservice-based site](https://www.robototes.com). Our site is comprised of
the following microservices:

[![robototes/robototes-website-web](https://img.shields.io/badge/service-web-green.svg)](https://github.com/robototes/robototes-website-web)
[![robototes/robototes-website-api](https://img.shields.io/badge/service-api-green.svg)](https://github.com/robototes/robototes-website-api)
[![robototes/robototes-website-team](https://img.shields.io/badge/service-team-green.svg)](https://github.com/robototes/robototes-website-team)

The code on the v2 branch is deprecated, and was split up into the above microservices. The much older v1 code is available from
the master branch at commit [3b18b9f](https://github.com/robototes/robototes-website/tree/3b18b9f).

### What's a control repository and why do we use it?

This repository is used to manage our site, from configuring our DNS to managing our server. We use git because it allows us the
ability to version our configurations, and to control any number of deployments through indirect modification and CI triggers
rather than direct changes. This allows our entire site to be server and service agnostic, in that we could pick up our entire
website and move it to other infrastructure. In addition, we use this repository for common documentation that is relevant to all
microservices and the site as a whole.

#### What do we control from here?

We control our [Rancher](https://rancher.com) server and the Docker-based microservices above that make up our site using a
`docker-compose.yml` file for basic Docker container configuration, and a `rancher-compose.yml` file to configure Rancher-specific
settings for each stack.


Once pushed to this repository, any changes will be deployed to our server by
[Semaphore CI](https://semaphoreci.com/robototes).

#### Using this repository

When updating CI or DNS settings, make sure to update the relevant files in this repository
([CI.md](https://github.com/robototes/robototes-website/blob/master/CI.md) and
[DNS.md](https://github.com/robototes/robototes-website/blob/master/DNS.md)).

When microservice updates are truly ready for production, fetch and checkout the stable commit in the relevant submodule. Then,
update the image entries in the [docker-compose.yml](https://github.com/robototes/robototes-website/blob/master/docker-compose.yml).

### For programmer documentation, see [DOCS.md](https://github.com/robototes/robototes-website/blob/master/DOCS.md)
