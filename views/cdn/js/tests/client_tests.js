/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited
 */
// External libraries
var expect = chai.expect;

// Checks for required libraries
describe("Dependencies", function() {
    describe("jQuery", function() {
        it("should be loaded", function() {
            expect(jQuery).to.not.be.null;
        });
        it("should be the latest version", function() {
            expect(jQuery.fn.jquery).to.be.equal("3.1.0");
        });
    });
});