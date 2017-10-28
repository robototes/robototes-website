# Common developer documentation

### Software requirements

* `node.js` version 8 or greater is recommended
* `yarn` version 1.2.1 or greater is recommended

### <a id="debugmode">Debug mode</a>

All our microservices have a debug mode. If the `DEBUG` environment variable is set, debug mode will be activated. This
usually changes the following, but varies by microservice. Refer to the microservice-specific documentation regarding debug
mode in the repositories' READMEs:

* Sets `/robots.txt` to the debug version set in the `seo.js` config, if applicable
* Disables page caching, if applicable
* Enables extra information on error pages, if applicable
* Enables Pug debug mode, if applicable

The `DEBUG` environment variable is shared with the [debug](https://www.npmjs.com/package/debug) module for logging. The
recommended filter value is `robototes-website*,http`, which will show setup information, and log HTTP requests. These are
enabled by default when the server is run in development mode using the following command:

```shell
yarn dev
```

### Running in production

To run the server in production, make sure [debug mode](#debugmode) is disabled and the
microservice-specific configuration variables (which are documented in each microservice's README) are set correctly.
[Test the server](#testing), then run it using the following command:

```shell
yarn start
```

### Best practices

We follow the following rules to make code style consistent, future proofed, and easy to debug, as well as keep the server
safe.

#### Server best practices

* DO NOT run the server as `root`, this is a serious security risk that could allow for attacks with root privileges
* DO keep `node` and `yarn` updated. After updating to the latest stable version (DO NOT use unstable versions in production),
  [run all tests](#testing), and then redeploy
* DO keep all node modules updated. In most cases, [Greenkeeper](https://greenkeeper.io) should automatically send pull
  requests for out-of-date modules and GitHub should notify you of these PRs
* DO [test](#testing) regularly (consider using Build Scheduling on [Semaphore CI](https://semaphoreci.com/robototes), even
  if no changes are made, simply to ensure the code is stable
* DO review server logs for errors/unusual events
* For information about updating the production server, contact one of our website developers at
[webmaster@robototes.com](mailto:webmaster@robototes.com)

#### Development best practices

* DO comment your code so that future programmers know what your code is supposed to do
* DO update this and all other READMEs as necessary so that programmers that come after you can easily start developing
  (speaking from experience, they will hate you if you don't)
* DO triage and assign bugs, even when not working in a team, for organization and accountability
* DO follow the Test-Driven-Development workflow:
  * Create a git branch with a descriptive name for what you are planning on creating:
    `git checkout -b branch-name-goes-here`. The branch name should be be named like this:
    `reason/descriptor`. There are 4 reasons that you can use:
      * `wip` Work in progress. This is generally a large feature and is likely to take a long time, so name it appropriately,
        like `wip/loginsystem`
      * `bug` Bug fix. Generally this is a small feature with an issue open on Github, so use `bug/issue_id_number_here`
      * `feat` A minor feature. Often times this is also a feature request on Github, so use `feat/issue_id_number_here`.
        Alernatively, if it is not filed as a feature request, just use a descriptor like `feat/reallyawesomefeature`
      * `junk` An experimental branch. These should generally not be merged, and are for experimentation that can be
        implemented correctly later on a `feat`, `bug`, or `wip` branch
    * Write tests for the results you want from your code (as many as needed, for as many situations as possible, no matter
      how unlikely). See [testing](#testing) for a description of our testing system and references on how to use it
    * Write the actual code (with comments, lots of comments)
    * Make sure the code passes the tests
    * Optimize the code (make code gooder)
    * When you're done, commit your changes, and push to the repository on GitHub:
    ```
        git commit -m "Detailed commit message goes here."
        git push origin <branch-name>
    ```
    * Once a feature is stable and production-ready, triage it and submit a pull request to `master`
    * Our [Semaphore CI](https://semaphoreci.com/robototes/) will build and [test](#testing) the project
    * If all tests pass, have at least one experienced programmer review your changes, and accept the pull request
    * Make modifications to the site as necessary on this repo, then trigger a deployment to the server either automatically
      by pushing from this repo, or manually using Manual Deployments on [Semaphore CI](https://semaphoreci.com/robototes/)
    * And last of all, [reward yourself](http://www.rinkworks.com/stupid/)

### <a id="testing">Testing</a>

We use [ava](https://www.npmjs.com/package/ava) and [supertest](https://www.npmjs.com/package/supertest) to test the server,
including our routing and middleware. When writing new tests, make sure to follow the documentation of the libraries
mentioned above. The tests can be found in the `tests` folder of each microservice, and can be run using the following:

```shell
yarn test
```

This will run the tests and create code coverage files using [nyc](https://www.npmjs.com/package/nyc) that can be submitted
from a CI test to [Codecov](https://codecov.io/gh/robototes/) using the Codecov CLI:

```shell
yarn coverage
```

We use [Semaphore CI](https://semaphoreci.com/robototes/robototes-website-api) as our CI/CD service. Once tested, our code is
deployed automatically to [Docker Hub](https://hub.docker.com/u/robototes/), and can be manually deployed to our production
server from this repository's Semaphore CI.

### Contributing/Vulnerability disclosure

Please review our [CONTRIBUTING.md](https://github.com/robototes/robototes-website/blob/master/CONTRIBUTING.md) before
submitting pull requests or reporting vulnerabilities.

### Maintainers

[@dannytech](https://github.com/dannytech) and
[@TAKBS2412](https://github.com/TAKBS2412)

### License

Copyright &copy; 2017 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium of this project without the express permission of Robotics Leadership is strictly prohibited.
