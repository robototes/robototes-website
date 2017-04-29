# robototes-website

[![Build Status](https://travis-ci.org/robototes/robototes-website.svg?branch=production)](https://travis-ci.org/robototes/robototes-website)
[![Dependency Status](https://david-dm.org/robototes/robototes-website/status.svg?branch=master)](https://david-dm.org/robototes/robototes-website#info=dependencies)
[![Greenkeeper badge](https://badges.greenkeeper.io/openpass-inc/openpass-webapp.svg)](https://greenkeeper.io/)

The official Node.js website for the Robototes 2412 team.

### <a id="setup">Setting up the server</a>

#### Installing the environment

Before downloading the server code, ensure your server environment is prepared by installing the following:

* `node.js` version 7.2.0
* `npm` version 3.10.9 (installed with node)

#### Preparing the server

After the above dependencies are installed, download the server code and test it:

* `git clone -b production git@github.com:robototes/robototes-website.git --depth 1` to clone the latest production release
* `cd robototes-website` to enter the server code
* `npm install` to install all dependencies as described in `package.json`
* [`npm run tests`](#runningtests) to ensure the modules are installed and up to date, and the server is able to run
* `npm install` the missing or out of date modules as described by failed tests
* Create a new file in the root directory called `configs.json` and add the following settings, or `export` them in bash (`configs.json` takes priority over
environment variables):
    - `DOMAIN` (the domain the server serves on, default robototes.com)
    - `DEBUG` (whether to run in debug mode: true|false)
    - `G_TRACKING_ID` (optional, the Google Analytics tracking ID)
    - `PORT` (the port for the server to run on, default 8080)

A list of modules that must be included can be found below.

#### Required node modules

These modules should be auto-installed by `npm install`, but make sure to run [`npm run tests`](#runningtests) and check that all the modules are there and match
the below table. All of these modules are readily available on [npm](//www.npmjs.com).

| Library                                                               | License                                                           | Reason                                                                                                        |
|-----------------------------------------------------------------------|-------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| [async](//github.com/caolan/async)                                    | [Copyright](//github.com/caolan/async/blob/master/LICENSE)        | Asynchronous code handling                                                                                    |
| [chaijs](//chaijs.com/)                                               | [MIT](//github.com/chaijs/chai#license)                           | Testing assertion library                                                                                     |
| [compression middleware](//github.com/expressjs/compression)          | [MIT](//github.com/expressjs/compression/blob/master/LICENSE)     | Uses file compression to reduce file size                                                                     |
| [cors middleware](//github.com/expressjs/cors)                        | [MIT](//github.com/expressjs/cors/blob/master/LICENSE)            | Enables CORS (cross origin request sharing)                                                                   |
| [ejs](//www.embeddedjs.com/)                                          | [MIT](//github.com/tj/ejs)                                        | Templating engine                                                                                             |
| [ExpressJS](//expressjs.com/)                                         | [MIT](//github.com/expressjs/express/blob/master/LICENSE)         | Simple HTTP routing                                                                                           |
| [express-helpers](//github.com/tanema/express-helpers)                | [MIT](//github.com/tanema/express-helpers#license)                | Adds easy HTML templating tools                                                                               |
| [express-minify middleware](//github.com/SummerWish/express-minify)   | [MIT](//github.com/SummerWish/express-minify/blob/master/LICENSE) | Decreases file size by removing unnecessary whitespace and obfuscating variables, decreasing page load time   |
| [express-subdomain](//github.com/bmullan91/express-subdomain)         | MIT                                                               | Easy subdomain routing                                                                                        |
| [helmetjs middleware](//github.com/helmetjs/helmet)                   | [MIT](//github.com/helmetjs/helmet/blob/master/LICENSE)           | Security library with features such as CSP, noSniff, and frameguard                                           |
| [mochajs](//mochajs.org/)                                             | [MIT](//github.com/mochajs/mocha/blob/master/LICENSE)             | Complete Unit testing library that allows us to test our code in various situations, reducing bug density     |
| [naught](//github.com/andrewrk/naught)                                | [MIT](//github.com/andrewrk/naught/blob/master/LICENSE)           | Enables zero-downtime deployment solutions and multi-worker server setups                                     |
| [nsp](//github.com/nodesecurity/nsp)                                  | [Apache 2.0](//www.apache.org/licenses/LICENSE-2.0)               | Scans node modules for vulnerabilities                                                                        |
| [retire.js](//github.com/RetireJS/retire.js)                          | [Apache 2.0](//www.apache.org/licenses/LICENSE-2.0)               | Identifying code security vulnerabilities.                                                                    |
| [serve-favicon](//github.com/expressjs/serve-favicon)                 | [MIT](//github.com/expressjs/serve-favicon/blob/master/LICENSE)   | Simple way of serving requests for `/favicon.ico`                                                              |
| [supertest](//github.com/visionmedia/supertest)                       | [MIT](//github.com/visionmedia/supertest/blob/master/LICENSE)     | Run simple HTTP requests                                                                                      |

After running the commands and installing the required modules, follow the instructions to [start the server](#startserver).

#### Required client side libraries

These libraries are automatically included from [cdnjs](//cdnjs.com).

| Library                                                               | License                                                                   | Reason                                                                                                        |
|-----------------------------------------------------------------------|---------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| [Bootstrap](//getbootstrap.com/)                                      | [MIT](//github.com/twbs/bootstrap/blob/v4-dev/LICENSE)                    | Modal dialogs, UI stuff, etc.                                                                                 |
| [Cookie Consent 2](//silktide.com/tools/cookie-consent/)              | [MIT](//silktide.com/tools/cookie-consent/docs/license/)                  | Cookie consent to comply with EU laws                                                                         |
| [mochajs](//mochajs.org/)                                             | [MIT](//github.com/mochajs/mocha/blob/master/LICENSE)                     | Complete Unit testing library that allows us to test our code in various situations, reducing bug density     | 
| [chaijs](//chaijs.com/)                                               | [MIT](//github.com/chaijs/chai#license)                                   | Testing assertion library                                                                                     |
| [jQuery](//jquery.org)                                                | [Copyright](//github.com/jquery/jquery/blob/master/LICENSE.txt)           | Event handling, DOM navigation, other libraries (see above) require it.                                       |
| [Normalize](//github.com/necolas/normalize.css/blob/master/LICENSE.md)| [MIT](//github.com/necolas/normalize.css/blob/master/LICENSE.md)          | Normalizes CSS styles over multiple browsers                                                                  |
| [FontAwesome](//fontawesome.io/)                                      | [License](//github.com/FortAwesome/Font-Awesome#license)                  | Set of various Glyphicons                                                                                     |

### <a id="startserver">Starting the server</a>

To start the server, simply run either of the following:

```shell
npm run start-server // Runs the server
npm run start-server-notest // Runs the server, ignoring tests
```

#### <a id="prodmode">Production mode</a>

Change `DEBUG` in the `configs.json` file/environment variables to false or set the `NODE_ENV` environment variable to "production".

This mode will run several automated tests, and start the server if they succeed. The server uses [naught](//www.npmjs.com/package/naught) for zero-downtime
deployment, and as such the server runs on a daemon and logs are not printed to the console. Instead, you can find `stdout.log` and `stderr.log` files inside
the `server` folder.

#### <a id="debugmode">Debug mode</a>

Change `DEBUG` in the `configs.json` file/environment variables to true or set the `NODE_ENV` environment variable to "development".

It is recommended that you run the server in developer mode before running it in production, to ensure the code is stable. It is also recommended that you run
client-side unit tests in all major browsers ([Internet Explorer](//www.microsoft.com/en-us/download/internet-explorer.aspx),
[Edge](//www.microsoft.com/en-us/windows/microsoft-edge), [Google Chrome](//www.google.com/chrome/browser/desktop/), [Opera](//www.opera.com/),
and [Firefox](//mozilla.org)) before deploying to production, if you have made any changes to client side files.

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

We use [mocha](//www.npmjs.com/package/mocha) and [chai](//www.npmjs.com/package/chai) to unit test on both the server and the client. At the moment,
the above code runs all server tests in `code/tests` and prints the results. This command is also run by [`npm run start-server`](#startserver) and will only start the
server if all tests pass.

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
    We use [mochajs](//mochajs.org/) and [chaijs](//chaijs.com/), so follow their documentation for how to write tests
    * Write the actual code (with comments, lots of comments)
    * Make sure the code passes the tests
    * Optimize the code (make code gooder)
    * When you're done, commit your changes, and push to the git remote:
    ```
        git commit -m "Detailed commit message goes here."
        git push origin <branch-name>
    ```
    * Once a feature is stable and production-ready, triage it and submit a pull request to `master`
    * Our [Travis CI](//travis-ci.org/robototes/robototes-website/) will build and test the project based off the settings in .travis.yml
    * If all tests pass, have at least one experienced programmer review your changes, and accept the pull request
    * Now setup the server with the updates by pulling from the repository or using a code deployment tool
    * And last of all, [reward yourself](//www.rinkworks.com/stupid/)

### License

Copyright (C) 2017 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium of this project without the express permission of Robotics Leadership is strictly prohibited.