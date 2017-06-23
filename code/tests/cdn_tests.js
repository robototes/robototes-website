var test = require("ava").test, // Testing function
    request = require("supertest"); // Routing testing

// Local code
var app = require("../server"); // Routing

test.cb("Server responds correctly to invalid requests (404)", function(t) {
    request(app)
        .get("/foo/bar")
        .set("Host", app.locals.classes.constants.subdomains.CDN + "." + app.locals.classes.constants.domain)
        .expect(404, t.end);
});