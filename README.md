# robototes-website

[![Build Status](//travis-ci.org/robototes/robototes-website.svg?branch=production)](//travis-ci.org/robototes/robototes-website)
[![Dependency Status](//david-dm.org/robototes/robototes-website/status.svg?branch=master)](//david-dm.org/robototes/robototes-website#info=dependencies)
[![Our Trello](//trello.com/b/xUBeXgQ4/robototes-website)](//trello.com/b/xUBeXgQ4/robototes-website)

The official Node.js website for the Robototes 2412 team.

### <a id="setup">Setting up the server</a>

##### Installing the environment

Before downloading the server code, ensure your server environment is prepared by installing the following

* `node.js` version 6.9.0
* `npm` version 3.10.3 (installed with node)
* `nvm` version 0.31.0 (installed with node)

##### Preparing the server

After the above dependencies are installed, download the server code and test it

* `git clone -b production git@github.com:robototes/robototes-website.git --depth 1` to clone the latest production release
* `cd robototes-website` to enter the server code
* `npm install` to install all dependencies as described in `package.json`
* [`mocha code/tests/module_tests`](#runningtests) to ensure the modules are installed and up to date
* `npm install` the missing or out of date modules as described by failed tests
* Modify settings in `code/classes.js`
* Add the following settings to a file called `configs.json` in the root directory of the repository or `export` them in bash:
    - `DOMAIN` (the domain the server serves on, default robototes.com)
    - `ENV` or `NODE_ENV` in bash (the node environment: production|development)
    - `SUBDOMAIN_OFFSET` (optional, the offset to subdomains, default 2)
    - `G_TRACKING_ID` (optional, the Google Analytics tracking ID)
    - `PORT` (the port for the server to run on, default 8080)

(If the `mocha` command is not found, run `npm install --dev`)

A list of modules that must be included can be found below.

##### Required node modules

These modules should be auto-installed by `npm install`, but make sure to run [`mocha code/tests/module_tests`](#runningtests)
and check that all the modules are there and match the below table. All of these modules are readily available on [npm](//www.npmjs.com)

| Library                                                               | License                                                           | Reason                                                                                                        |
|-----------------------------------------------------------------------|-------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| [ExpressJS](//expressjs.com/)                                         | [MIT](//github.com/expressjs/express/blob/master/LICENSE)         | Simple HTTP routing                                                                                           |
| [express-helpers](//github.com/tanema/express-helpers)                | [MIT](//github.com/tanema/express-helpers#license)                | Adds easy HTML templating tools                                                                               |
| [express-subdomain](//github.com/bmullan91/express-subdomain)         | MIT                                                               | Easy subdomain routing                                                                                        |
| [cookie-parser middleware](//github.com/expressjs/cookie-parser)      | [MIT](//github.com/expressjs/cookie-parser/blob/master/LICENSE)   | Enables us to interact with browser cookies                                                                   |
| [compression middleware](//github.com/expressjs/compression)          | [MIT](//github.com/expressjs/compression/blob/master/LICENSE)     | Uses file compression to reduce file size                                                                     |
| [express-minify middleware](//github.com/SummerWish/express-minify)   | [MIT](//github.com/SummerWish/express-minify/blob/master/LICENSE) | Decreases file size by removing unnecessary whitespace and obfuscating variables, decreasing page load time   |
| [helmetjs middleware](//github.com/helmetjs/helmet)                   | [MIT](//github.com/helmetjs/helmet/blob/master/LICENSE)           | Security library with features such as CSP, noSniff, and frameguard                                           |
| [cors middleware](//github.com/expressjs/cors)                        | [MIT](//github.com/expressjs/cors/blob/master/LICENSE)            | Enables CORS (cross origin request sharing)                                                                   |
| [ejs](//www.embeddedjs.com/)                                          | [MIT](//github.com/tj/ejs)                                        | Templating engine                                                                                             |
| [naught](//github.com/andrewrk/naught)                                | [MIT](//github.com/andrewrk/naught/blob/master/LICENSE)           | Enables zero-downtime deployment solutions and multi-worker server setups                                     |
| [async](//github.com/caolan/async)                                    | [Copyright](//github.com/caolan/async/blob/master/LICENSE)        | Asynchronous code handling                                                                                    |
| [mochajs](//mochajs.org/)                                             | [MIT](//github.com/mochajs/mocha/blob/master/LICENSE)             | Complete Unit testing library that allows us to test our code in various situations, reducing bug density     |
| [chaijs](//chaijs.com/)                                               | [MIT](//github.com/chaijs/chai#license)                           | Testing assertion library                                                                                     |
| [supertest](//github.com/visionmedia/supertest)                       | [MIT](//github.com/andrewrk/naught/blob/master/LICENSE)           | Run simple HTTP requests                                                                                      |
| [nsp](//github.com/nodesecurity/nsp)                                  | [Apache 2.0](//www.apache.org/licenses/LICENSE-2.0)               | Scans node modules for vulnerabilities                                                                        |
| [retire.js](//github.com/RetireJS/retire.js)                          | [Apache 2.0](//www.apache.org/licenses/LICENSE-2.0)               | Identifying code security vulnerabilities.                                                                    |

After running the commands and installing the required modules, follow the instructions in [Starting the server](#startserver).

##### Required client side libraries

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

##### Production mode

Change ENV in the `configs.json` file or set the NODE_ENV environment variable to "production"

```javascript
npm run start-server // Runs the server on 8 workers
```

This will run several automated tests, and start the server if they succeed. The server uses [naught](//www.npmjs.com/package/naught) for zero-downtime deployment, and as such
the server runs on a daemon and logs are not printed to the console. Instead, you can find `stdout.log` and `stderr.log` files inside the `server` and `server/dev`
folders, depending on how you are running the server.

##### Development mode

Change ENV in the `configs.json` file or set the NODE_ENV environment variable to "development"

```javascript
npm run start-server-notest // Runs the server, ignoring tests
```

It is recommended that you run the server in developer mode before running it in production, to ensure the code is stable. It is also recommended that you run client-side unit tests
in all major browsers ([Internet Explorer/Edge](//www.microsoft.com/en-us/download/internet-explorer.aspx), [Chrome](//www.google.com/chrome/browser/desktop/), and [Firefox](//mozilla.org)) before deploying
to production, if you have made any changes to client side files.

The production server runs on port 8080, while the development server runs on 8081 to allow both environments to run at the same time. When running the server, consider a few best practices:
* DO NOT run the server as `root`, this is a serious security risk that could allow for attacks with root privileges
* DO follow this procedure for starting the server:
    * Run [`npm run tests`](#runningtests) and ensure ALL tests pass
    * Run the server in development mode
    * Run client side tests and ensure ALL tests pass
    * [Shut down](#specialcommands) the development server
    * Run the server in production mode

### <a id="runningtests">Running tests</a>

##### Server side

```javascript
npm run tests
```

We use [mocha](//www.npmjs.com/package/mocha) and [chai](//www.npmjs.com/package/chai) to unit test on both the server and the client. At the moment,
the above code runs all server tests in `code/tests` and prints the results. This command is also run by [`npm run start-server`](#startserver) and will only start the
server if all tests pass.

The following tests are available (to run them by themselves, use `mocha code/tests/{test}`):
* `module_tests` Makes sure all modules are installed and up to date (may take a while to finish)
* `server_tests` Ensures the server responds correctly to predictable input

##### Client side

As long as the server is run in development mode, our unit testing suite will be included in the client. The tests are automatically fetched from `views/js/tests` and can
be run by clicking the `Run tests` button fixed to the bottom of the page or the `Run again` button on the shown modal.

### <a id="specialcommands">Special commands</a>

While the server is running, the following commands can be run:

```javascript
npm run deploy // Initiates a zero downtime deploy
npm run abort-deploy // Aborts hanging deployments (when a worker is stuck open)
npm run status // Displays the current server status
npm run stop // Shuts all workers down
```

Both the `start-server` and `deploy` commands have a simpler counterpart, which skips tests, and can be run by adding `-notest` to the end of the command

In addition to being a different server instance from the production server, which allows for live testing, there are a few command differences:

* `npm run start-server-notest`([starting the server](#startserver)) ignores all tests
* `npm run deploy-notest` ignores all tests and deploys to running threads

### Best practices

We follow some rules to make code consistent, future proof, and easy to debug.

##### Keeping the server updated

It is recommended to regularly maintain the server, following this checklist:

* Keep `node`, `npm`, and `nvm` updated. After updating to the latest stable version (DO NOT use unstable versions in production), [run all tests](#runningtests), and then
redeploy
* Keep all node modules updated. As modules are deprecated, update to their latest stable release and [run relevant tests](#runningtests), modifying code as necessary
* Run [`npm run tests`](#runningtests) even if no changes are made, simply to ensure the server is stable
* Review server logs for errors

##### Development best practices

* Comment your code so that future programmers know what your code is supposed to do
* Update this README as necessary so that programmers that come after you can easily start developing
* Triage and assign bugs
* Follow the Test-Driven-Development workflow:
    * Create a git branch with a descriptive name for what you are planning on creating:
    `git checkout -b branch-name-goes-here`
        The branch name should be be named like this: reason/detail
        There are 4 reasons that you can use:
        * `wip` Work in progress. This is generally a large feature and is likely to take a long time, so name it appropriately, like
            `wip/loginsystem`
        * `bug` Bug fix. Generally this is a small feature with an issue open on Github, so use `bug/issue_id_number_here`
        * `feat` A minor feature. Often times this is also a feature request on Github, so use `feat/issue_id_number_here`.
            Alernatively, if it is not filed as a feature request, just use a descriptor like `feat/reallyawesomefeature`
        * `junk` An experimental branch. These should generally not be merged, and are for experimentation that can be implemented
            correctly later on a `feat` or `wip` branch
    * Write tests for the results you want from your code (as many as needed, for as many situations as possible, no matter how unlikely)
    * Write the actual code (with comments)
    * Make sure the code passes the tests
    * Optimize the code (make code gooder)
    * Have at least one experienced programmer review your changes
    * When you're done, commit your changes, merge the branch, and push to the git repository:
    ```
        git commit -m "Detailed commit message goes here."
        git checkout production
        git merge branch-name-goes-here
        git branch -d branch-name-goes-here
        git push origin master
    ```
    * Once a feature is stable and production-ready, triage it and push it to the git repo on the `production` branch
    * Our [Travis CI](//travis-ci.org/robototes/robototes-website/) will build and test the project based off the settings in .travis.yml
    * Now setup the server with the updates by pulling from the repository or using a code deployment tool
    * And last of all, [reward yourself](//www.rinkworks.com/stupid/)

### License

Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium of this project without the express permission of Robotics Leadership is strictly prohibited