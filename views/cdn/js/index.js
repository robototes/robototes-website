var $ = window.$

$(document).ready(() => {
  $('.main-carousel').flickity({
    wrapAround: true,
    autoPlay: 2500, // Rotate images every 2.5 seconds
    contain: true,
    imagesLoaded: true,
    pageDots: false
  })
})
