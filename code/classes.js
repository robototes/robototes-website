/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited
 */
module.exports = {
    constants: {
        subdomains: {
            STATUS: "status.robototes-website-dannytech",
            PUBLIC: "www.robototes-website-dannytech",
            CDN: "cdn.robototes-website-dannytech",
            NONE: "robototes-website-dannytech"
        },
        ports: {
            PRODUCTION: 8080,
            DEVELOPMENT: 8081
        },
        domain: "c9users.io"
    },
    fulldomains: {
        STATUS: function() { return module.exports.constants.subdomains.STATUS + "." + module.exports.constants.domain + ":" + module.exports.constants.ports[process.env.NODE_ENV.toUpperCase()] },
        PUBLIC: function() { return module.exports.constants.subdomains.PUBLIC + "." + module.exports.constants.domain + ":" + module.exports.constants.ports[process.env.NODE_ENV.toUpperCase()] },
        CDN: function() { return module.exports.constants.subdomains.CDN + "." + module.exports.constants.domain + ":" + module.exports.constants.ports[process.env.NODE_ENV.toUpperCase()] },
        NONE: function() { return module.exports.constants.subdomains.NONE + "." + module.exports.constants.domain + ":" + module.exports.constants.ports[process.env.NODE_ENV.toUpperCase()] }
    }
};