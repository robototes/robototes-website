/*
Copyright (C) 2017 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

This file is part of the robototes-website project.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium without the express permission of Robotics Leadership is strictly prohibited.
 */

// External libraries
const expect = window.chai.expect
const jQuery = window.jQuery
const Mocha = window.Mocha
const describe = window.describe
const it = window.it
var $ = window.$
let mocha = window.mocha

$(document).ready(function () {
  $('[data-action=run-tests]').click(function () {
    $('#mocha').empty() // Clears previous tests

    mocha = new Mocha()
    mocha.reporter('html') // Will output tests to #mocha div

    mocha.suite.emit('pre-require', window, null, mocha) // Prepares for tests

        // Checks for required libraries
    describe('Dependencies', function () {
      describe('jQuery', function () {
        it('should be loaded', function () {
          expect(jQuery).to.not.be.equal(null)
        })
        it('should be the latest version', function () {
          expect(jQuery.fn.jquery).to.be.equal('3.1.0')
        })
      })
    })

    mocha.run()
  })
})
