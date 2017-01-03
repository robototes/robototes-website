/*
Copyright (C) 2017 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited.
 */
// System imports
var http = require("http"),
    fs = require("fs"),
    path = require("path");

// External libraries
var expect = require("chai").expect, // Assertion lib
    request = require("supertest"); // Routing testing

// Local code
var app = require("../server"); // Routing

var server = http.Server(app); // Creates an HTTP server

// Recursively searches a directory and tests for the files
function walk(dir, uri, host) {
    // Loops through folders and files
    var files = fs.readdirSync(dir);
    if(files) {
        files.forEach(function(file) {
            var stats = fs.statSync(dir + "/" + file);
            if(stats.isDirectory()) {
                walk(dir + "/" + file, uri + "/" + file, host); // Recursively runs walk in subdirectories
            } else {
                it(uri + "/" + file + " exists (200)", function(done) {
                    request(app)
                        .get(uri + "/" + file)
                        .set("Host", host)
                        .expect(200, done); // It is a file, see if it is accessible from the client
                });
            }
        });
    }
}

// Tests here
describe("Server", function() {
    it("starts up on command", function(done) {
        server.listen(app.get("port"), done); // Starts the server for testing
    });
    it("shuts down on command", function() {
        expect(server.close()).to.not.be.null; // Almost immediately shuts down the server
    });
    describe("Public subdomain", function() {
        // Tests basic requests
        it("responds correctly to valid requests (200)", function(done) {
            request(app)
                .get("/")
                .set("Host", app.locals.classes.constants.subdomains.PUBLIC + "." + app.locals.classes.constants.domain)
                .expect(200, done);
        });
        it("responds correctly to invalid request (404)", function(done) {
            request(app)
                .get("/foo/bar")
                .set("Host", app.locals.classes.constants.subdomains.PUBLIC + "." + app.locals.classes.constants.domain)
                .expect(404, done);
        });
    });
    it("redirects from /blog to blog subdomain", function(done) {
        request(app)
            .get('/blog')
            .expect('Location', "//" + app.locals.classes.constants.subdomains.BLOG + "." + app.locals.classes.constants.domain)
            .expect(301, done);
    });
    describe("CDN", function() {
        // Recursively indexes files for URI testing
        walk(path.join(__dirname + "/../../views/cdn"), "", app.locals.classes.constants.subdomains.CDN + "." + app.locals.classes.constants.domain);
        it("responds correctly to invalid requests (404)", function(done) {
            request(app)
                .get("/foo/bar")
                .set("Host", app.locals.classes.constants.subdomains.CDN + "." + app.locals.classes.constants.domain)
                .expect(404, done);
        });
    });
});