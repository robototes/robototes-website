/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited
 */
var configs = require("../configs")
 
module.exports = {
    constants: {
        subdomains: {
            STATUS: "status",
            PUBLIC: "www",
            CDN: "cdn",
            full: function(sub) { return module.exports.constants.subdomains[sub.toUpperCase()] + "." + module.exports.constants.domain; }
        },
        domain: configs.DOMAIN || "robototes.com",
        api_keys: {
            google: {
                analytics: configs.G_TRACKING_ID
            }
        }
    }
};