/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited
 */
var express = require("express"),
    path = require("path"),
    fs = require("fs"),
    minify = require("express-minify"),
    serveStatic = require("serve-static");

var options = {
    dotfiles: "ignore",
    fallthrough: true,
    index: false,
    maxAge: 1000 * 60 * 60 * 24 * 7 // One week
};
if(process.env.NODE_ENV === "development") delete options.maxAge;

module.exports = express.Router()
    .use(minify())
    .use("/media/slideshow", function(req, res) {
        fs.readdir(path.join(__dirname, "/../../views/cdn/media/slideshow"), function(err, files) {
            if(err) return res.errorPage(500);
            res.json(files).end();
        });
    })
    .use(serveStatic(path.join(__dirname, "/../../views/cdn")));