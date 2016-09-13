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
    describe("AngularJS", function() {
        it("should be loaded", function() {
            expect(angular).to.not.be.null;
        });
        // robototes-common app
        describe("robototes-common", function() {
            var $scope = {}, controller;
            beforeEach(module("robototes-common"));
            describe("commonController", function() {
                beforeEach(inject(function($controller) {
                    controller = $controller("commonController", { $scope: $scope });
                }));
            });
        });
        // robototes-pages app
        describe("robototes-pages", function() {
            beforeEach(module("robototes-pages"));
            describe("homeController", function() {
                var $scope = {}, controller;
                beforeEach(inject(function($controller) {
                    controller = $controller("homeController", { $scope: $scope });
                }));
            });
            describe("errorController", function() {
                var $scope = {}, controller;
                beforeEach(inject(function($controller) {
                    controller = $controller("errorController", { $scope: $scope });
                }));
            });
        });
        // robototes-dev app
        describe("robototes-dev", function() {
            beforeEach(module("robototes-dev"));
            describe("devController", function() {
                var $scope = {}, controller;
                beforeEach(inject(function($controller) {
                    controller = $controller("devController", { $scope: $scope });
                }));
                it("should have runTests function", function() {
                    expect($scope.runTests).to.not.be.null;
                    expect(typeof $scope.runTests).to.be.equal("function");
                });
            });
        });
    });
});