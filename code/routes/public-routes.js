/*
Copyright (C) 2017 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

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

// Local code
// var db = require("../db/db.js");

// Slideshow images
var fileType = /\.(jpg)/i,
    dir = fs.readdirSync(path.join(__dirname, "../../views/cdn/media/slideshow")),
    files = [];
for(var i = 0; i < dir.length; i++)
    if(fileType.exec(path.extname(dir[i])))
        files.push(dir[i]); //store the file name into the array files

// Connects to the events database
// var dbconn,
//     Event;
// db.connect("events", function(err, conn) {
//     if(err) throw err;
//     Event = require("../db/models/Event.js")(conn);
//     dbconn = conn;
// });

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
    .get("/media", function(req, res) {
        res.render(path.join(__dirname, "/../../views/pages/media.ejs"));
        res.end();
    })
    // .get("/rss/ticker", function(req, res) {
    //     if(dbconn)
    //     Event.find({}, function(err, data) {
    //         if(err) throw err;
    //         console.log(data);
    //         // Parse data into uniform JSON structure
    //         // Convert to XML
    //         res.json(/* Converted XML */);
    //     });
    // })
    // .post("/webhook/:source", function(req, res) {
    //     // The Blue Alliance
    //     if(req.params.source === "tba") { // TODO Check X-TBA-Checksum to ensure payload integrity and source
    //         // Detects the type of Blue Alliance Webhook (https://www.thebluealliance.com/apidocs/webhooks)
    //         console.log(req.body);
    //         switch(req.body.message_type) {
    //             case "upcoming_match":
    //                 break;
    //             case "match_score":
    //                 // Add record to database
    //                 var newEvent = new Event({
                        
    //                 });
    //                 newEvent.save();
    //                 break;
    //             case "alliance_selection":
    //                 break;
    //             case "awards_posted":
    //                 break;
    //             case "media_posted":
    //                 throw new Error("Not implemented yet");
    //             case "final_results":
    //                 throw new Error("Not implemented yet");
    //             case "ping":
    //                 console.log("Ping received");
    //                 break;
    //             case "broadcast":
    //                 break;
    //             case "verification":
    //                 console.log("Verification code received:", req.body.message_data.verification_key);
    //                 break;
    //             default:
    //                 console.log(req.body);
    //         }
    //     }
    // });