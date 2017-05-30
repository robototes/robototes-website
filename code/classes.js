/*
Copyright (C) 2017 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited.
 */
 
module.exports = function(configs) {
    var classes = {
        constants: {
            subdomains: {
                STATUS: "status",
                PUBLIC: "www",
                CDN: "cdn",
                BLOG: "blog",
                full: function(sub) { return classes.constants.subdomains[sub.toUpperCase()] + "." + classes.constants.domain; }
            },
            domain: configs.DOMAIN || process.env.DOMAIN || "robototes.com",
            api_keys: {
                google: {
                    analytics: configs.G_TRACKING_ID
                },
                tba: {
                    secret: configs.TBA_SECRET_KEY
                }
            },
            database: configs.DATABASE
        }
    };
    return classes;
};