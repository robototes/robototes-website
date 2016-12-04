/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited.
 */
// System imports
var path = require("path"),
    fs = require("fs");

// External libraries
var express = require("express"),
    serveStatic = require("serve-static");
//Favicon
var favicon = require("serve-favicon");

// Slideshow images
var fileType = /\.(jpg)/i,
    dir = fs.readdirSync(path.join(__dirname, "../../views/cdn/media/slideshow")),
    files = [];
for(var i = 0; i < dir.length; i++)
    if(fileType.exec(path.extname(dir[i])))
        files.push(dir[i]); //store the file name into the array files

// Public routing code
module.exports = express.Router()
    .use(favicon(path.join(__dirname, "../../views/cdn/media/robotote.png")))
    .use("/robots.txt", function(req, res) {
        var robots = "";
        [
            { key: "User-Agent", value: "*" },
            { key: "Allow", value: "/" },
            { key: "Sitemap", value: req.app.locals.classes.constants.domain + "/sitemap.xml" }
        ].forEach(function(current) {
            robots += (current.line || current.key) + ": " + current.value + "\n";
        });
        res.send(robots);
    })
    .get("/", function(req, res) {
        res.render(path.join(__dirname, "/../../views/pages/index.ejs"), { slideshow: files });
        res.end();
    })
    .get("/resources", function(req, res) {
        res.render(path.join(__dirname, "/../../views/pages/resources.ejs"));
        res.end();
        
    })
    .get("/about", function(req, res) {
        res.render(path.join(__dirname, "/../../views/pages/about.ejs"));
        res.end();
    })
    .get("/rss", serveStatic(path.join(__dirname, "/../../views/rss"), { "Content-Type": "text/rss" }));