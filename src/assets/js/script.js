const $ = require("jquery");
const easing = require("jquery.easing");
//common
const point = require("./_point");
const ua = require("./_ua");


let Common = function(){};

$(function() {

    if( _ua.Mobile || _ua.Tablet ){}

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
