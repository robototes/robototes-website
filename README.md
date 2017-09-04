# robototes-website v2

[![Build Status](https://semaphoreci.com/api/v1/robototes/robototes-website/branches/v2/shields_badge.svg)](https://semaphoreci.com/robototes/robototes-website)
[![David](https://img.shields.io/david/robototes/robototes-website.svg)](https://david-dm.org/robototes/robototes-website#info=dependencies)
[![Codecov branch](https://img.shields.io/codecov/c/github/robototes/robototes-website/v2.svg)](https://codecov.io/gh/robototes/robototes-website/branches/v2)
[![Greenkeeper badge](https://img.shields.io/badge/greenkeeper-enabled-brightgreen.svg)](https://greenkeeper.io/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

The official Node.js website for the Robototes 2412 team.

### <a id="setup">Setting up the server</a>

#### Installing the environment

Before downloading the server code, ensure your server environment is prepared by installing the following:

* `node.js` version 8.1.2 or latest recommended
* `npm` version 5.0.3 or latest recommended (installed with node)

#### Preparing the server

After the above dependencies are installed, download the server code and test it:

* `git clone -b production git@github.com:robototes/robototes-website.git --branch v2 --depth 1` to clone the latest production release
* `cd robototes-website` to enter the server code
* `npm install` to install all dependencies as described in `package.json`
* [`npm run tests`](#runningtests) to ensure the server is able to run
* Create a new file in the root directory called `.env` and add the following settings, or `export` them in bash (`.env` takes priority over
environment variables):
    - `DOMAIN` (the domain the server serves on, default robototes.com)
    - `PORT` (the port for the server to run on, default 8080)
    - `DEBUG` (whether to run in debug mode: true|false)
    - `G_TRACKING_ID` (optional, the Google Analytics tracking ID)
    - `HPKP_HASHES` (a comma separated list of HPKP hashes for CAs, Intermediates, and the site certificate)

### <a id="startserver">Starting the server</a>

To start the server, simply run either of the following:

```shell
npm run start-server // Runs the server
npm run start-server-notest // Runs the server, ignoring all tests
```

#### <a id="prodmode">Production mode</a>

Change `DEBUG` in the `configs.json` file/environment variables to false or set the `NODE_ENV` environment variable to "production".

This mode will run several automated tests, and start the server if they succeed. The server uses [naught](https://www.npmjs.com/package/naught) for zero-downtime
deployment, and as such the server runs on a daemon and logs are not printed to the console. Instead, you can find `stdout.log` and `stderr.log` files inside
the `server` folder.

#### <a id="debugmode">Debug mode</a>

Change `DEBUG` in the `configs.json` file/environment variables to true or set the `NODE_ENV` environment variable to "development".

It is recommended that you run the server in developer mode before running it in production, to ensure the code is stable. It is also recommended that
if you have made any changes to any client files, you run client-side unit tests in all major browsers
([Internet Explorer](https://www.microsoft.com/en-us/download/internet-explorer.aspx), [Edge](https://www.microsoft.com/en-us/windows/microsoft-edge),
[Google Chrome](https://www.google.com/chrome/browser/desktop/), [Opera](https://www.opera.com/), and [Firefox](https://mozilla.org)) before deploying to production.

#### Best practices

When running the server, consider a few best practices:

* DO NOT run the server as `root`, this is a serious security risk that could allow for attacks with root privileges
* DO follow this procedure for starting the server:
    * Run [`npm run tests`](#runningtests) and ensure ALL tests pass
    * Run the server in [debug mode](#debugmode)
    * Run client side tests and ensure ALL tests pass
    * [Shut down](#specialcommands) the development server
    * Run the server in [production mode](#prodmode)

### <a id="runningtests">Running tests</a>

#### Server side

```javascript
npm run tests
```

We use [ava](https://www.npmjs.com/package/ava) to test on the server, and [mocha](https://www.npmjs.com/package/mocha) and [chai](https://www.npmjs.com/package/chai) to unit test
on the client. At the moment, the above code runs all server tests in `code/tests` and prints the results. This command is also run by [`npm run start-server`](#startserver) and
`npm run deploy` and will only start/deploy to the server if all tests pass.

The following tests are available (to run them by themselves, use `mocha code/tests/{test}`):

* `module_tests` Makes sure all modules are installed and up to date (may take a while to finish)
* `server_tests` Ensures the server responds correctly to predictable input

#### Client side

As long as the server is run in [debug mode](#debugmode), our unit testing suite will be included in the client. The tests are automatically fetched from
`views/js/tests/client_tests.js` and can be run by clicking the `Run tests` button fixed to the bottom of the page or the `Run again` button on the shown modal.

### <a id="specialcommands">Special commands</a>

While the server is running, the following commands can be run:

```javascript
npm run deploy // Initiates a zero downtime deploy
npm run abort-deploy // Aborts hanging deployments (when a deployment is unable to start or stop workers)
npm run status // Displays the current server status
npm run stop // Shuts all workers down
```

Both the [`start-server`](#startserver) and `deploy` commands have a simpler counterpart, which skips all tests, and can be run by adding `-notest` to the end of the
command.

### Best practices

We follow some rules to make code consistent, future proofed, and easy to debug.

#### Keeping the server updated

It is recommended to regularly maintain the server, following this checklist:

* Keep `node` and `npm` updated. After updating to the latest stable version (DO NOT use unstable versions in production), [run all tests](#runningtests), and then
redeploy
* Keep all node modules updated. As modules are deprecated, update to their latest stable release and [run tests](#runningtests), modifying code as necessary
* Run [`npm run tests`](#runningtests) even if no changes are made, simply to ensure the server is stable
* Review server logs for errors

#### Development best practices

* Comment your code so that future programmers know what your code is supposed to do
* Update this README as necessary so that programmers that come after you can easily start developing (speaking from experience, they will hate you if you don't)
* Triage and assign bugs
* Follow the Test-Driven-Development workflow:
    * Create a git branch with a descriptive name for what you are planning on creating:
    `git checkout -b branch-name-goes-here`
        The branch name should be be named like this: reason/descriptor
        There are 4 reasons that you can use:
        * `wip` Work in progress. This is generally a large feature and is likely to take a long time, so name it appropriately, like
            `wip/loginsystem`
        * `bug` Bug fix. Generally this is a small feature with an issue open on Github, so use `bug/issue_id_number_here`
        * `feat` A minor feature. Often times this is also a feature request on Github, so use `feat/issue_id_number_here`.
            Alernatively, if it is not filed as a feature request, just use a descriptor like `feat/reallyawesomefeature`
        * `junk` An experimental branch. These should generally not be merged, and are for experimentation that can be implemented
            correctly later on a `feat`, `bug`, or `wip` branch
    * Write tests for the results you want from your code (as many as needed, for as many situations as possible, no matter how unlikely)
    We use [mochajs](https://mochajs.org/) and [chaijs](http://chaijs.com/), so follow their documentation for how to write tests
    * Write the actual code (with comments, lots of comments)
    * Make sure the code passes the tests
    * Optimize the code (make code gooder)
    * When you're done, commit your changes, and push to the git remote:
    ```
        git commit -m "Detailed commit message goes here."
        git push origin <branch-name>
    ```
    * Once a feature is stable and production-ready, triage it and submit a pull request to `master`
    * Our [Travis CI](https://travis-ci.org/robototes/robototes-website/) will build and test the project based off the settings in .travis.yml
    * If all tests pass, have at least one experienced programmer review your changes, and accept the pull request
    * Now setup the server with the updates by pulling from the repository or using a code deployment tool
    * And last of all, [reward yourself](http://www.rinkworks.com/stupid/)

### License

Copyright &copy; 2017 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium of this project without the express permission of Robotics Leadership is strictly prohibited.