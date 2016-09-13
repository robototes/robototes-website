/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited
 */
var devApp = angular.module("robototes-dev", [
        "robototes-common"
    ]);
devApp.controller("devController", [
    "$scope",
    "$controller",
    function($scope, $controller) {
        console.log("here");
        angular.extend(this, $controller("commonController", { $scope: $scope }));
        
        $scope.showTestResults = false;
        $scope.runTests = function() {
            console.log("Running tests...");
            $scope.showTestResults = true;
            mocha.run();
        };
    }
]);