var $ = window.$

$(function () {
  var leadershipNames = [
    'Keian Freshwater (Team Captain)',
    'Conor Miles (Outreach/Human Resources)',
    'Jacob Brouwer (Robot Lead)',
    'Eric Kline (Business)',
    'Jonathan Schladetzky (Logistics)',
    'Amanda Manea (Scouting)',
    'Timothy Eng (Digital Outreach/Programming)'
  ]
  var leadershipEmails = [
    'freshwaterk',
    'milesc',
    'brouwerj',
    'klineer',
    'schladetzkyj',
    'maneaa',
    'engt'
  ]
  var websiteNames = [
    'Timothy Eng'
  ]
  var websiteEmails = [
    'engt'
  ]
  var allNames = []
  allNames['l'] = leadershipNames
  allNames['w'] = websiteNames
  var allEmails = []
  allEmails['l'] = leadershipEmails
  allEmails['w'] = websiteEmails
  function genLinks (linkname, divname) {
    var namearr = allNames[linkname]
    for (var i = 0; i < namearr.length; i++) {
      var link = $('<div class="col-sm-6 col-xs-12"><a style="cursor: pointer" class="contactlink" id="' + linkname + 'contact_' + i + '">' + namearr[i] + '</a></div>')
      $('#' + divname).append(link)
    }
    $('.contactlink').mouseover(function () {
      var id = $(this).attr('id')
      var emailarr = allEmails[id[0]]
      var index = parseInt(id.split('_')[1], 10)
      $(this).attr('href', 'mailto:s-' + emailarr[index] + '@bsd405.org')
    })
    $('.contactlink').mouseleave(function () {
      $(this).attr('href', '')
    })
  }
  var headmentorcontact = $('<div class="col-sm-6 col-xs-12"><a style="cursor: pointer" class="contactlink2" id="lcontact_' + leadershipNames.length + '">Mrs. Herzog, Team Administrator</a></div>')
  $('#leadership_emails').append(headmentorcontact)
  $('.contactlink2').mouseover(function () {
    $(this).attr('href', 'mailto:herzogk@bsd405.org')
  })
  $('.contactlink2').mouseleave(function () {
    $(this).attr('href', '')
  })
  $('.newtablink').click(function () {
    window.open($(this).attr('href'))
  })
  genLinks('l', 'leadership_emails')
  genLinks('w', 'website_emails')
})
