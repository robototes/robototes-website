var $ = window.$

$(document).ready(() => {
  console.log('Lazy loading images')
  $('img.lazy').lazyload({
    effect: 'fadeIn'
  })
})
