/*
Copyright (C) 2017 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited.
 */
// System imports
var http = require("http");

// Local code
var app = require("./code/server");

// Creates and runs a new server
var httpServer = http.Server(app);
httpServer.listen(app.get("port"), function() {
    if(process.send) process.send("online"); // Alerts naught the server is running
});

// Responds to naught shutdown messages
process.on("message", function(message) {
    if (message === "shutdown")
        process.nextTick(function() {
            process.exit(0);
        });
}).on("uncaughtException", function(err) { // Shuts down the server after a fatal uncaught error
    console.error(err);
    process.exit(0);
});