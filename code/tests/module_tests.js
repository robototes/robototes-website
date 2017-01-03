/*
Copyright (C) 2017 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited.
 */
var expect = require("chai").expect,
    async = require("async"),
    fs = require("fs"),
    path = require("path"),
    request = require("supertest"),
    extend = require("util")._extend;

describe("Modules", function() {
    var package = require("../../package"),
        modules = extend(package.dependencies, package.devDependencies);
    
    async.each(Object.keys(modules), function(current, callback) {
        describe(current, function() {
            async.parallel([
                function(cb) {
                    it("is installed", function(done) {
                        fs.readdir(path.join(__dirname, "/../../node_modules/" + current), function(err, files) {
                            return done(err);
                        });
                    });
                },
                function() {
                    it("is up to date", function(done) {
                        this.timeout(10000);
                        require("child_process").exec("npm show " + current + " version", function(err, stdout, stderr) {
                            if(err) return done(err);
                            var version = require("../../node_modules/" + current + "/package.json").version;
                            expect(version).to.be.equal(stdout.trim());
                            done();
                        });
                    });
                }
            ], callback);
        });
    });
});