import $ from 'jquery';
import 'jquery.easing';
// import TweenMax from 'gsap';

const g = {
  isSp: function() { return ( g.winW() <= g.point )? true : false ; },// SP or PC
  winW: function() { return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; },
  winH: function() { return $( window ).height(); },
  winT:function() { return $( window ).scrollTop(); },
  point: 768
}

let Common = function() {};

$(function() {

    Common.smoothScroll();

  });

Common = {

  //スムーススクロール
  smoothScroll : function() {

    $('a[href^="#"]').click(function() {
      $('html,body').animate({ scrollTop:
      $($(this).attr('href')).offset().top }, '600','');
      return false;
    });

  },
  share : function() {
    var shareTitle = encodeURI($('title').html());
    var shareUrl = encodeURI(document.URL);
    $('.js-twitterShare').attr('href', 'http://twitter.com/share?url='+ shareUrl + '&text=' + shareTitle);
    $('.js-facebookShare').attr('href', 'http://www.facebook.com/sharer.php?u='+ shareUrl +'&t=' + shareTitle);
    $('.js-lineShare').attr('href', 'http://line.me/R/msg/text/?'+ shareUrl);
    $('.js-pocketShare').attr('href', 'http://getpocket.com/edit?url='+ shareUrl + '&title=' + shareTitle);
  }

}
