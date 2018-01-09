const $      = require("jquery");
const easing = require("jquery.easing");
// const TweenMax = require("gsap");

const _ua = ((u) => {
  return {
    Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
      || u.indexOf("ipad") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
      || u.indexOf("kindle") != -1
      || u.indexOf("silk") != -1
      || u.indexOf("playbook") != -1,
    Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
      || u.indexOf("iphone") != -1
      || u.indexOf("ipod") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
      || u.indexOf("blackberry") != -1
  }
})(window.navigator.userAgent.toLowerCase());

const g = {
  isSp:function(){ return ( g.winW() <= g.point )? true : false ; },// SP or PC
  winW:function(){ return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; },
  winH:function(){ return $( window ).height(); },
  winT:function(){ return $( window ).scrollTop(); },
  point: 768
}

let Common = function(){};

$(function() {

    Common.smoothScroll();

  });

Common = {

  //スムーススクロール
  smoothScroll : function() {

    $('a[href^="#"]').click(function() {
      $('html,body').animate({ scrollTop:
      $($(this).attr('href')).offset().top }, '600','easeInCubic');
      return false;
    });

  },
  share : function() {
    var shareTitle = encodeURI($('title').html());
    var shareUrl = encodeURI(document.URL);
    var shareUrlComponent = encodeURIComponent(document.URL);
    $('.js-twitterShare').attr("href", "http://twitter.com/share?url="+ shareUrl + "&text=" + shareTitle);
    $('.js-facebookShare').attr("href", "http://www.facebook.com/sharer.php?u="+ shareUrl +"&t=" + shareTitle);
    $('.js-lineShare').attr("href", "http://line.me/R/msg/text/?"+ shareUrl);
    $('.js-pocketShare').attr("href", "http://getpocket.com/edit?url="+ shareUrl + "&title=" + shareTitle);
  }

}
