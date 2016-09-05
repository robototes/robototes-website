/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited
 */
// Homepage
angular.module("robototes-homepage", [
        "robototes-common",
        "ngCookies"
    ])
    .controller("homeController", [
        "$scope",
        "$controller",
        "$http",
        "$cookie",
        function($scope, $controller, $http, $cookie) {
            angular.extend(this, $controller("commonController", { $scope: $scope }));
            $http.get("//" + $cookie("subdomain-cdn") + "." + $cookie("domain") + "/media/slideshow", function(err, res) {
                if(err) return console.error(err);
                console.log(res);
            });
        }
    ]);