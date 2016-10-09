/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited
 */
var partialsApp = angular.module("robototes-partials", [
        "robototes-common"
    ]);
partialsApp.controller("footerController", [
    "$scope",
    "$controller",
    function($scope, $controller) {
        angular.extend(this, $controller("commonController", { $scope: $scope }));
        
        // Google analytics opt-out
        $scope.optout = function() {
            console.log("u");
            window["ga-disable-" + ga.q[0][1]] = true;
        };
    }
]);