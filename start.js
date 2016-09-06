/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited
 */
var server = require("./code/server");
server.http.listen(server.app.get("port"), function() {
    if(process.send) process.send("online");
});

process.on("message", function(message) {
    if (message === "shutdown")
        process.nextTick(function() {
            process.exit(0);
        });
}).on("uncaughtException", function(err) {
    console.error(err);
    process.exit(0);
});