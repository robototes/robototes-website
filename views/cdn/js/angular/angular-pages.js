/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited
 */
var pagesApp = angular.module("robototes-pages", [
        "robototes-common"
    ]);
pagesApp.controller("homeController", [
    "$scope",
    "$controller",
    function($scope, $controller) {
        angular.extend(this, $controller("commonController", { $scope: $scope }));
    }
]);
pagesApp.controller("errorController", [
    "$scope",
    "$controller",
    function($scope, $controller) {
        angular.extend(this, $controller("commonController", { $scope: $scope }));
    }
]);