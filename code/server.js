/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited
 */
// System imports
var http = require("http"),
    path = require("path");

// External libraries
var express = require("express"),
    expressHelpers = require("express-helpers"),
    subdomain = require("express-subdomain"),
    cookieParser = require("cookie-parser"),
    compression = require("compression"),
    helmet = require("helmet"),
    cors = require("cors");

// Local code
var classes = require("./classes");

// Creates a new router
var app = module.exports = express();
expressHelpers(app);

// Sets globally accessible variables
app.set("env", process.env.NODE_ENV || "development") // The current environment (development|production)
    .set("views", path.join(__dirname, "/../views"))
    .set("view engine", "ejs")
    .set("port", classes.constants.ports[app.get("env").toUpperCase()] || process.env.PORT || 8080); // Gets the port to run on
app.locals.classes = classes;

// Sets up express middleware
app.use(helmet.contentSecurityPolicy({ // CSP
        directives: {
            defaultSrc: [ "'self'" ],
            scriptSrc: [
                "'self'",
                classes.fulldomains.CDN(),
                "cdnjs.cloudflare.com",
                "'unsafe-eval'",
                "'unsafe-inline'"
            ],
            styleSrc: [
                "'self'",
                classes.fulldomains.CDN(),
                "cdnjs.cloudflare.com",
                "fonts.googleapis.com",
                "'unsafe-inline'"
            ],
            fontSrc: [
                "'self'",
                classes.fulldomains.CDN(),
                "cdnjs.cloudflare.com",
                "fonts.gstatic.com"
            ],
            imgSrc: [
                "'self'",
                classes.fulldomains.CDN(),
                "cdnjs.cloudflare.com"
            ],
            sandbox: [ "allow-forms", "allow-scripts", "allow-same-origin" ],
            objectSrc: [],
        }
    }))
    .use(helmet.xssFilter())
    .use(helmet.frameguard({ action: "deny" })) // Prevents framing
    .use(helmet.hidePoweredBy()) // Removes X-Powered-By header
    .use(helmet.ieNoOpen())
    .use(helmet.noSniff())
    .use(cors({ origin: [ classes.fulldomains.CDN() ] }))
    .use(compression());

app.use(function(req, res, next) {
        // Sends an error page to the client
        res.errorPage = function(code) {
            this.status(code);
            this.render(path.join(__dirname, "/../views/pages/error.ejs"), { code: code });
            this.end();
        };
        
        res.locals.req = req;
        res.locals.res = res;
        next();
    })
    .use(subdomain(classes.constants.subdomains.CDN, require("./routes/cdn-routes")))
    .use(subdomain(classes.constants.subdomains.PUBLIC, require("./routes/public-routes")))
    .use(subdomain(classes.constants.subdomains.NONE, function(req, res, next) { // If no subdomain specified
        if(!res.headersSent)
            res.redirect("//" + classes.constants.subdomains.PUBLIC + "." + classes.constants.domain);
    }))
    .use(function(req, res) { // If request not routed
        res.errorPage(404);
    })
    .use(function(err, req, res, next) { // If error occurred
        console.error(err);
        res.errorPage(500);
    });