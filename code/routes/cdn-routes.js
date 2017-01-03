/*
Copyright (C) 2017 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited.
 */
// System imports
var fs = require("fs"),
    path = require("path");

// External libraries
var express = require("express"),
    minify = require("express-minify"),
    serveStatic = require("serve-static");

// Caching and routing options for CDN files
var options = {
    dotfiles: "ignore",
    fallthrough: true,
    index: false,
    maxAge: 1000 * 60 * 60 * 24 * 7 // One week
};

// Simple CDN static and dynamic routing
module.exports = express.Router()
    .use("/robots.txt", function(req, res) {
        var robots = "";
        [
            { key: "User-Agent", value: "*" },
            { key: "Disallow", value: "/" }
        ].forEach(function(current) {
            robots += (current.line || current.key) + ": " + current.value + "\n";
        });
        res.send(robots);
    })
    .use(function(req, res, next) {
        if(!req.app.get("debug")) minify();
        next();
    })
    .use(serveStatic(path.join(__dirname, "/../../views/cdn")));