/*
Copyright (C) 2017 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited.
 */
// System imports
const path = require('path')

// External libraries
const express = require('express')
const minify = require('express-minify')
const serveStatic = require('serve-static')

// Simple CDN static and dynamic routing
module.exports = express.Router()
    .use('/robots.txt', function (req, res) {
      let robots = '';
      [
            { key: 'User-Agent', value: '*' },
            { key: 'Disallow', value: '/' }
      ].forEach(function (current) {
        robots += (current.line || current.key) + ': ' + current.value + '\n'
      })
      res.send(robots)
    })
    .use(function (req, res, next) {
      if (!req.app.get('debug')) minify()
      next()
    })
    .use(serveStatic(path.join(__dirname, '/../../views/cdn')))
