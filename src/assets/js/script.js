import 'jquery.easing'

const g = {
  isSp: function () { return (g.winW() <= g.point) ? true : false },
  winW: function () { return window.innerWidth || document.documentElement.clientWid12th || document.body.clientWidth },
  winH: function () { return $(window).height() },
  winT: function () { return $(window).scrollTop() },
  point: 768
}

let Common = function () {}

$(function () {
  Common.smoothScroll()
})

Common = {
  smoothScroll: function () {
    $('a[href^="#"]').click(function () {
      $('html,body').animate({ scrollTop:
      $($(this).attr('href')).offset().top }, '600', '')
      return false
    })
  },

  share: function () {
    const shareTitle = encodeURI($('title').html())
    const shareUrl = encodeURI(document.URL)
    $('.js-twitterShare').attr('href', `http://twitter.com/share?url=${shareUrl}&text=${shareTitle}`)
    $('.js-facebookShare').attr('href', `http://www.facebook.com/sharer.php?u=${shareUrl}&t=${shareTitle}`)
    $('.js-lineShare').attr('href', `http://line.me/R/msg/text/?${shareUrl}`)
    $('.js-pocketShare').attr('href', `http://getpocket.com/edit?url=${shareUrl}&title=${shareTitle}`)
    $('.js-hatenaShare').attr('href', `http://b.hatena.ne.jp/entry/${window.location}`)

    $('.js-shareBtn').on('click', function () {
      window.open(this.href, 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1')
      return false
    })
  }

}
