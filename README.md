## DEPRECATED
This repository and the code within is deprecated. The code here has been split into multiple
microservices, and further development will continue on each of the following repositories:

[![robototes/robototes-website-web](https://img.shields.io/badge/service-web-green.svg)](https://github.com/robototes/robototes-website-web)
[![robototes/robototes-website-api](https://img.shields.io/badge/service-api-green.svg)](https://github.com/robototes/robototes-website-api)
[![robototes/robototes-website-team](https://img.shields.io/badge/service-team-green.svg)](https://github.com/robototes/robototes-website-team)

# robototes-website v2

[![Build Status](https://semaphoreci.com/api/v1/robototes/robototes-website/branches/v2/shields_badge.svg)](https://semaphoreci.com/robototes/robototes-website)
[![David](https://img.shields.io/david/robototes/robototes-website.svg)](https://david-dm.org/robototes/robototes-website#info=dependencies)
[![Codecov branch](https://img.shields.io/codecov/c/github/robototes/robototes-website/v2.svg)](https://codecov.io/gh/robototes/robototes-website/branches/v2)
[![codebeat badge](https://codebeat.co/badges/247d1999-c9cc-4708-83b9-7ae92d755a3f)](https://codebeat.co/projects/github-com-robototes-robototes-website-v2)
[![Greenkeeper badge](https://img.shields.io/badge/greenkeeper-enabled-brightgreen.svg)](https://greenkeeper.io/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![GO ROBOTOTES!](https://img.shields.io/badge/GO-ROBOTOTES!-brightred.svg)](https://www.robototes.com)

The official Node.js website for the Robototes 2412 team.

### Software requirements

* `node.js` version 8 or greater is recommended
* `npm` version 5 or greater is recommended

### Configuring the server

A `.env` configuration file in the root of the project is required, the server will not start without
it. The following configuration can be set

* `DOMAIN` (*required*) The domain at which this site is hosted
* `IP` (*optional, default `0.0.0.0`*) The IP to run the server on
* `PORT` (*optional, default `3000`*) The port to listen for requests on
* `DEBUG` (*optional*) see [Debug mode](#debugmode)
* `G_TRACKING_ID` (*required, default `UA-84502206-1`*) The Google Analytics Id, default is the
  Id used in development
* `HPKP_HASHES` (*required, default can be found in [HPKP Hashes](#hpkphashes)*) The HPKP hashes to
  serve in the Public-Key-Pins header
* `TBA_SECRET_KEY` (*optional, not implemented yet*) See [The Blue Alliance](#tba)

##### <a id="hpkphashes">HPKP Hashes</a>

* `lCppFqbkrlJ3EcVFAkeip0+44VaoJUymbnOaEUk7tEU=` (AddTrust External CA Root)
* `58qRu/uxh4gFezqAcERupSkRYBlBAvfcw7mEjGPLnNU=` (Comodo ECC CA)
* `grX4Ta9HpZx6tSHkmCrvpApTQGo67CYDnvprLg5yRME=` (Comodo RSA CA)
* `klO23nT2ehFDXCfx3eHTDRESMz3asj1muO+4aIdjiuY=` (Comodo RSA Domain Validation Secure Server CA)
* `x9SZw6TwIqfmvrLZ/kz1o0Ossjmn728BnBKpUFqGNVM=` (Comodo ECC Domain Validation Secure Server CA)
* `8nlrI65ePaHAJMVLL9DCWEGL13FhoPiFPTbeQ53ATV4=` (*.c9users.io)
* `tey1EE7fk3hATntrqvJd0pRDLpjqawZ7YSlOiA/staQ=` (sni32250.cloudflaressl.com)

### <a id="testing">Testing</a>

We use [ava](https://www.npmjs.com/package/ava) and [supertest](https://www.npmjs.com/package/supertest)
to test the server, including our routing and middleware. When writing new tests, make sure to follow
the documentation of the libraries mentioned above. The tests can be found in the `code/tests` folder,
and can be run using the following:

```shell
npm test
```

This will run the tests and create code coverage files using [nyc](https://www.npmjs.com/package/nyc)
that can be submitted from a CI test to [Codecov](https://codecov.io) using the Codecov CLI.

We use [Semaphore CI](https://semaphoreci.com/robototes/robototes-website) as our CI/CD service. Once
tested, our code is deployed automatically to a staging site, and can be manually deployed to our
production server.


### <a id="debugmode">Debug mode</a>

If the `DEBUG` environment variable is set, debug mode will be activated. This changes the following:

* Sets `/robots.txt` to the debug version set in the `seo.js` config
* Disables page caching
* Enables the experimental The Blue Alliance webhook
* Enables extra information on error pages
* Enables Pug debug mode
* Enables the Google Analytics debug mode

The `DEBUG` environment variable is shared with the [debug](https://www.npmjs.com/package/debug)
module for logging. The recommended filter value is `robototes-website:*,http`, which will show
setup information, and log HTTP requests. These are enabled by default when the server is run
in development mode using the following command:

```shell
npm run dev
```

### Running in production

To run the server in production, make sure [debug mode](#debugmode) is disabled and the `DOMAIN`
environment variable is set correctly. Test the server, then run it using the following command:

```shell
npm start
```

The server is run using [forever](https://www.npmjs.com/package/forever/) so it can be run in the
background. The following commands might also be useful:

```shell
npm run status // Will display the currently running forever threads
npm run stop // Stops the running server
```

### <a id="tba">The Blue Alliance</a>

THIS FEATURE IS STILL IN DEVELOPMENT

[The Blue Alliance](https://www.thebluealliance.com/) is a service provided free of charge to FRC
teams for scouting, watching, and reliving the FIRST Robotics Competition. One such feature in
particular that we use is a subscription to webhooks that provide us with realtime event updates.
We use these webhooks to build a customized feed for our users with all events regarding our team.

### Best practices

We follow some rules to make code consistent, future proofed, and easy to debug, as well as keeping the
server safe

#### Server best practices

* DO NOT run the server as `root`, this is a serious security risk that could allow for attacks with
root privileges
* Keep `node` and `npm` updated. After updating to the latest stable version (DO NOT use unstable
versions in production), [run all tests](#testing), and then redeploy
* Keep all node modules updated. In most cases, [Greenkeeper](https://greenkeeper.io) should
automatically keep all modules updated and tested
* [Test](#testing) regularly, even if no changes are made, simply to ensure the code is stable
* Review server logs for errors
* For information about updating the production server, contact one of our website developers at
[webmaster@robototes.com](mailto:webmaster@robototes.com)

#### Development best practices

* Comment your code so that future programmers know what your code is supposed to do
* Update this README as necessary so that programmers that come after you can easily start
  developing (speaking from experience, they will hate you if you don't)
* Triage and assign bugs
* Follow the Test-Driven-Development workflow:
  * Create a git branch with a descriptive name for what you are planning on creating:
    `git checkout -b branch-name-goes-here`. The branch name should be be named like this:
    `reason/descriptor`. There are 4 reasons that you can use:
      * `wip` Work in progress. This is generally a large feature and is likely to take
        a long time, so name it appropriately, like `wip/loginsystem`
      * `bug` Bug fix. Generally this is a small feature with an issue open on Github,
        so use `bug/issue_id_number_here`
      * `feat` A minor feature. Often times this is also a feature request on Github, so use
        `feat/issue_id_number_here`. Alernatively, if it is not filed as a feature request, just use
        a descriptor like `feat/reallyawesomefeature`
      * `junk` An experimental branch. These should generally not be merged, and are for experimentation
        that can be implemented correctly later on a `feat`, `bug`, or `wip` branch
    * Write tests for the results you want from your code (as many as needed, for as many situations as
      possible, no matter how unlikely). See [testing](#testing) for a description of our testing system
      and references on how to use it
    * Write the actual code (with comments, lots of comments)
    * Make sure the code passes the tests
    * Optimize the code (make code gooder)
    * When you're done, commit your changes, and push to the git remote:
    ```
        git commit -m "Detailed commit message goes here."
        git push origin <branch-name>
    ```
    * Once a feature is stable and production-ready, triage it and submit a pull request to `master`
    * Our [Semaphore CI](https://semaphoreci.com/robototes/robototes-website/) will build and test the
      project
    * If all tests pass, have at least one experienced programmer review your changes, and accept the pull
      request
    * Now setup the server with the updates by pulling from the repository or using a code deployment tool
    * And last of all, [reward yourself](http://www.rinkworks.com/stupid/)

### Maintainers

[@dannytech](https://github.com/dannytech) and
[@TAKBS2412](https://github.com/TAKBS2412)

### Contributing

While we do accept and encourage contributions, this site is designed and built
exclusively for The Robototes. As such, most content comes from within the
organization and code is written by a subteam. If you find any bugs, please feel
free to open an issue or write a pull request.

##### Vulnerability disclosure

If you find a vulnerability in our site, please,
[report it](mailto:webmaster@robototes.com). We won't sue or anything as long as
you don't exploit any bugs and you disclose responsibly (give us time to respond
and fix it before you tell the world). If you would like to test our security,
please contact us at [webmaster@robototes.com](mailto:webmaster@robototes.com)
and we can work something out

### License

Copyright &copy; 2017 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium of this project without the express permission of Robotics Leadership is strictly prohibited.
