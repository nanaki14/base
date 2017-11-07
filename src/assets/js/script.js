const $ = require("jquery");
const easing = require("jquery.easing");

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

  }

}
