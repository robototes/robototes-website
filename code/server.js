/*
Copyright (C) 2016 Sammamish Robotics <robototes2412@gmail.com> All rights reserved

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited
 */
// System imports
var url = require("url"),
    path = require("path");

// External libraries
var express = require("express"),
    expressHelpers = require("express-helpers"),
    subdomain = require("express-subdomain"),
    cookieParser = require("cookie-parser"),
    compression = require("compression"),
    helmet = require("helmet"),
    cors = require("cors");

// Config file
var configs;
try {
    configs = require("../configs.json");
} catch(err) {
    configs = {};
}

// Local code
var classes = require("./classes")(configs);

// Creates a new router
var app = module.exports = express();
expressHelpers(app);

// Sets globally accessible variables
app.set("env", configs.ENV || process.env.NODE_ENV || "development") // The current environment (development|production)
    .set("views", path.join(__dirname, "/../views")) // Sets the views
    .set("subdomain offset", (configs.DOMAIN || process.env.DOMAIN || "robototes.com").split(".").length || 2) // Parses subdomains
    .set("view engine", "ejs") // Sets templating to use EJS
    .set("port", configs.PORT || process.env.PORT || 8080); // Gets the port to run on
app.locals.classes = classes;
app.locals.app = app;
app.locals.util = require("util");

// Sets up express middleware
app.use(helmet.contentSecurityPolicy({ // CSP
        directives: {
            defaultSrc: [ "'self'" ],
            scriptSrc: [
                "'self'",
                classes.constants.subdomains.full("CDN"),
                "cdnjs.cloudflare.com",
                "ajax.cloudflare.com",
                "www.google-analytics.com",
                "'unsafe-eval'",
                "'unsafe-inline'"
            ],
            styleSrc: [
                "'self'",
                classes.constants.subdomains.full("CDN"),
                "cdnjs.cloudflare.com",
                "fonts.googleapis.com",
                "'unsafe-inline'"
            ],
            fontSrc: [
                "'self'",
                classes.constants.subdomains.full("CDN"),
                "cdnjs.cloudflare.com",
                "fonts.gstatic.com"
            ],
            imgSrc: [
                "'self'",
                classes.constants.subdomains.full("CDN"),
                "www.google-analytics.com",
                "cdnjs.cloudflare.com"
            ],
            childSrc: [ "'none'" ],
            sandbox: [ "allow-forms", "allow-scripts", "allow-same-origin" ],
            objectSrc: [ "'none'" ],
        }
    }))
    .use(helmet.xssFilter())
    .use(helmet.frameguard({ action: "deny" })) // Prevents framing
    .use(helmet.hidePoweredBy()) // Removes X-Powered-By header
    .use(helmet.ieNoOpen())
    .use(helmet.noSniff()) // Prevents MIME type sniffing
    .use(cors({ origin: [ classes.constants.subdomains.full("CDN") ] })) // Enables CORS
    .use(compression()); // Compresses data for speed

app.use(function(req, res, next) {
        // Sends an error page to the client
        res.errorPage = function(code) {
            this.status(code).render(path.join(__dirname, "/../views/pages/error.ejs"), { code: code });
            this.end();
        };
        
        res.locals.current = url.parse((req.connection.encrypted ? "https" : "http") + "://" + req.headers.host + req.originalUrl, true);
        res.locals.req = req;
        res.locals.res = res;
        next();
    })
    .use("/sitemap.xml", function(req, res) {
        res.sendFile(path.join(__dirname, "/../views/sitemap.xml"));
    })
    .use(subdomain(classes.constants.subdomains.CDN, require("./routes/cdn-routes")))
    .use(subdomain(classes.constants.subdomains.PUBLIC, require("./routes/public-routes")))
    .use(function(req, res, next) { // If no subdomain specified
        if(!req.subdomains.length)
            res.redirect("//" + classes.constants.subdomains.full("PUBLIC"));
        else
            res.errorPage(404);
    })
    .use(function(err, req, res, next) { // If error occurred
        console.error(err);
        res.errorPage(500);
    });