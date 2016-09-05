/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited
 */
var expect = require("chai").expect,
    request = require("supertest"),
    classes = require("../classes"),
    server = require("../server");

// Unit tests here
describe("Server", function() {
    it("responds correctly to valid requests", function(done) {
        request(server.app).get("//" + classes.constants.subdomains.PUBLIC + classes.constants.domain + "/").expect(200, done);
    });
    it("responds correctly to invalid request", function(done) {
        request(server.app).get("/foo/bar").expect(404, done);
    });
    it("starts up on command", function(done) {
        server.http.listen(server.app.get("ip"), server.app.get("port"), done);
    });
    it("shuts down on command", function(done) {
        server.http.on("shutdown", done);
        process.emit("message", "shutdown");
    });
});