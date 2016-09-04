# robototes-website

The official Node.js website for the Robototes 2412 team.

### Starting the server:

```javascript
npm run start-server // Runs the server on 8 workers
```

This will run several automated tests, and start the server if they succeed. The server uses [naught](https://www.npmjs.com/package/naught) for zero-downtime
deployment, and as such the server runs on a daemon and logs are not printed to the console. Instead, you can find ```stdout.log``` and ```stderr.log``` files
inside the ```server``` and ```server/dev``` folders, depending on how you are running the server.

It is recommended that you run the server in developer mode (see [Special commands](#Special commands)) before running it in production, to ensure the code is
stable. It is also recommended that you run client-side unit tests in all major browsers ([Internet Explorer](), [Chrome](), and [Firefox]()) before deploying
to production, if you have made any changes to client side files.

### Running tests

##### Server side

```javascript
npm run tests
```

We use [mocha](https://www.npmjs.com/package/mocha) and [chai](https://www.npmjs.com/package/chai) to unit test on both the server and the client. At the moment,
the above code runs all server tests in ```code/tests``` and prints the results. This command is also run by ```npm run start-server``` and will only start the
server if all tests pass.

##### Client side

As long as the server is run in development mode, our unit testing suite will be included in the client. The tests are automatically fetched from
```views/js/tests``` and can be run by clicking the "Run tests" button fixed to the bottom of the page.

### Special commands

While the server is running, the following commands can be run:

```javascript
npm run deploy // Initiates a zero downtime deploy
npm run abort-deploy // Aborts hanging deployments (when a worker is stuck open)
npm run status // Displays the current server status
npm run stop // Shuts all workers down
```

All commands except ```tests``` have a development counterpart that can be run by adding ```-dev``` to the end of the command. Ex.:

```javascript
npm run start-server-dev
```

In addition to being a different server instance from the production server, which allows for live testing, there are a few command differences:

* ```npm run start-server-dev``` ignores all tests and starts the server on only 2 workers as opposed to 8
* ```npm run deploy-dev``` ignores all tests and deploys to running threads 

The production server runs on port 8080, while the development server runs on 8081 to allow for different environments.