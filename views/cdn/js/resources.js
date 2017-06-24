var $ = window.$

$(function () {
  const leadershipNames = [
    'Keian Freshwater (Team Captain)',
    'Conor Miles (Outreach/Human Resources)',
    'Jacob Brouwer (Robot Lead)',
    'Eric Kline (Business)',
    'Jonathan Schladetzky (Logistics)',
    'Amanda Manea (Scouting)',
    'Timothy Eng (Digital Outreach/Programming)'
  ]
  const leadershipEmails = [
    'freshwaterk',
    'milesc',
    'brouwerj',
    'klineer',
    'schladetzkyj',
    'maneaa',
    'engt'
  ]
  const websiteNames = [
    'Timothy Eng'
  ]
  const websiteEmails = [
    'engt'
  ]
  let allNames = []
  allNames['l'] = leadershipNames
  allNames['w'] = websiteNames
  let allEmails = []
  allEmails['l'] = leadershipEmails
  allEmails['w'] = websiteEmails
  function genLinks (linkname, divname) {
    let namearr = allNames[linkname]
    for (let i = 0; i < namearr.length; i++) {
      let link = $('<div class="col-sm-6 col-xs-12"><a style="cursor: pointer" class="contactlink" id="' + linkname + 'contact_' + i + '">' + namearr[i] + '</a></div>')
      $('#' + divname).append(link)
    }
    $('.contactlink').mouseover(function () {
      let id = $(this).attr('id')
      let emailarr = allEmails[id[0]]
      let index = parseInt(id.split('_')[1], 10)
      $(this).attr('href', 'mailto:s-' + emailarr[index] + '@bsd405.org')
    })
    $('.contactlink').mouseleave(function () {
      $(this).attr('href', '')
    })
  }
  let headmentorcontact = $('<div class="col-sm-6 col-xs-12"><a style="cursor: pointer" class="contactlink2" id="lcontact_' + leadershipNames.length + '">Mrs. Herzog, Team Administrator</a></div>')
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
