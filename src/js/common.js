
window.onunload = function(){};

var Common = function(){};

Common = {

  //スムーススクロール
  smoothScroll : function(){

    $('a[href^="#"]').click(function() {
      $('html,body').animate({ scrollTop:
      $($(this).attr('href')).offset().top }, '600','easeInCubic');
      return false;
    });

  }

}

$(function () {

  Common.smoothScroll();

});
