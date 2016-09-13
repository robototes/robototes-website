/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited
 */
// System imports
var path = require("path"),
    fs = require("fs");

// External libraries
var express = require("express"),
    serveStatic = require("serve-static");

// Public routing code
module.exports = express.Router()
    .get("/", function(req, res, next) {
        res.render(path.join(__dirname, "/../../views/pages/index.ejs"));
        res.end();
    })
    .get("/rss", serveStatic(path.join(__dirname, "/../../views/rss"), { "Content-Type": "text/rss" }));