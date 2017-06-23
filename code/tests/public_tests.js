var test = require("ava").test, // Testing function
    request = require("supertest"); // Routing testing

// Local code
var app = require("../server"); // Routing

// Tests basic requests
test.cb("Server responds correctly to valid requests (200)", function(t) {
    request(app)
        .get("/")
        .set("Host", app.locals.classes.constants.subdomains.PUBLIC + "." + app.locals.classes.constants.domain)
        .expect(200, t.end);
});
test.cb("Server responds correctly to invalid request (404)", function(t) {
    request(app)
        .get("/foo/bar")
        .set("Host", app.locals.classes.constants.subdomains.PUBLIC + "." + app.locals.classes.constants.domain)
        .expect(404, t.end);
});
test.cb("Server redirects from /blog to blog subdomain", function(t) {
    request(app)
        .get('/blog')
        .expect('Location', "//" + app.locals.classes.constants.subdomains.BLOG + "." + app.locals.classes.constants.domain)
        .expect(301, t.end);
});