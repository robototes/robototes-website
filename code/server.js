/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited
 */
var http = require("http"),
    path = require("path");

var classes = require("./classes"),
    express = require("express"),
    subdomain = require("express-subdomain"),
    cookieParser = require("cookie-parser"),
    helmet = require("helmet");

var app = express(),
    server = http.Server(app);
module.exports = {
    app: app,
    http: server,
    createServer: server
};

app.set("env", process.env.NODE_ENV)
    .set("port", classes.constants.ports[app.get("env").toUpperCase()] || process.env.PORT || 8080);
app.locals = {
    classes: classes,
    port: app.get("port")
};
app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [ "'self'" ],
            scriptSrc: [
                "'self'",
                classes.constants.subdomains.CDN + "." + classes.constants.domain + ":" + app.get("port"),
                "cdnjs.cloudflare.com",
                "'unsafe-eval'",
                "'unsafe-inline'"
            ],
            styleSrc: [
                "'self'",
                classes.constants.subdomains.CDN + "." + classes.constants.domain + ":" + app.get("port"),
                "cdnjs.cloudflare.com",
                "fonts.googleapis.com",
                "'unsafe-inline'"
            ],
            fontSrc: [
                "cdnjs.cloudflare.com",
                "fonts.gstatic.com"
            ],
            imgSrc: [
                "'self'",
                "cdnjs.cloudflare.com"
            ],
            sandbox: [ "allow-forms", "allow-scripts", "allow-same-origin" ],
            objectSrc: [],
        }
    }))
    .use(helmet.xssFilter())
    .use(helmet.frameguard({ action: "deny" }))
    .use(helmet.hidePoweredBy())
    .use(helmet.ieNoOpen())
    .use(helmet.noSniff());

app.use(function(req, res, next) {
        res.errorPage = function(code) {
            this.status(code);
            this.render(path.join(__dirname, "/../views/pages/error.ejs"), { code: code });
            this.end();
        };
        
        next();
    })
    .use(subdomain(classes.constants.subdomains.CDN, require("./routes/cdn-routes")))
    .use(subdomain(classes.constants.subdomains.PUBLIC, require("./routes/public-routes")))
    .use(subdomain(classes.constants.subdomains.NONE, function(req, res, next) {
        if(!res.headersSent)
            res.redirect("//" + classes.constants.subdomains.PUBLIC + "." + classes.constants.domain);
    }))
    .use(function(req, res) {
        res.errorPage(404);
    })
    .use(function(err, req, res, next){
        // Handles server errors gracefully
        console.error(err);
        res.errorPage(500);
    });