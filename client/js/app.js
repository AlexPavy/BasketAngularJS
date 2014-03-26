// $('#inURL').bind("enterKey", function (e) {
//   addVisit();
// });
// $('#inURL').keyup(function (e) {
//   if (e.keyCode == 13) {
//     $(this).trigger("enterKey");
//   }
// });
$("#clickme").click(function () {
  $("#book").slideUp("slow", function () {
    // Animation complete.
  });
});

function executeApp(){
  console.log("execApp");
}

$(document).ready(function () {
  
  setTimeout(function () {
    for(var i in sites){
      var slider = $('#slider'+sites[i]._id);
      console.log(slider)
  	  var slideCount = slider.find(' > ul > li').length;
    	var slideWidth = slider.find(' > ul > li').width();
    	var slideHeight = slider.find(' > ul > li').height();
    	var sliderUlWidth = slideCount * slideWidth;
    	
    	slider.css({ width: slideWidth, height: slideHeight });
    	
    	slider.find(' > ul').css({ width: sliderUlWidth });
    	
      slider.find(' > ul > li:last-child').prependTo(slider.find(' > ul'));
      
      console.log("prev", slider.find('.prev').attr('id'));
      slider.find('.prev').on("click", function (e) {
          moveLeft(this);
          return false;
      });
      
      console.log("next", slider.find('.next'));
      slider.find('.next').on("click", function (e) {
          moveRight(this);
          return false;
      });
    }
  
    function moveLeft(elem) {
      console.log($(elem).attr('id'));
      // console.log("last", $(elem).parent().find('> ul').find('> li').last())
      // console.log("first", $(elem).parent().find('> ul').find('> li').first())
      
      
      $(elem).parent().find('> ul').animate({
          left: + slideWidth
      }, 200, function () {
          $(this).find('> li:last-child').prependTo($(this));
          $(this).css({'left': '-15px'});
      });
    };
  
    function moveRight(elem) {
      console.log($(elem).attr('id'));
      
      $(elem).parent().find('> ul').animate({
          right: + slideWidth
      }, 200, function () {
          $(this).find('> li:first-child').appendTo($(this));
          $(this).css('left', '-15px');
      });
    };
  }, 2000);
});    