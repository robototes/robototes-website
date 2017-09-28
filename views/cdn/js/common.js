var $ = window.$

$(document).ready(() => {
  $('img.lazy').lazyload({
    effect: 'fadeIn'
  })
})
