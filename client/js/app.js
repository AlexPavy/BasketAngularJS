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

function moveLeft(elem) {
  var slider_ul = $(elem).parent().find('> ul');
  var slideWidth = slider_ul.find('> li').width();
  console.log("slideWidth", slideWidth);
  slider_ul.find('> li:last-child').prependTo(slider_ul);
  slider_ul.css({'left': -slideWidth});
  
  $(elem).parent().find('> ul').animate({
      left: ''
  }, 1000, function () {
    console.log($(this).find('> li:last-child'))
      // $(this).find('> li:last-child').prependTo($(this));
      $(this).css({'left': ''});
  });
};

function moveRight(elem) {
  // console.log($(elem).attr('id'));
  var slideWidth = $(elem).parent().find(' > ul > li').width();
  console.log("slideWidth", slideWidth);
  
  $(elem).parent().find('> ul').animate({
      left: - slideWidth
  }, 1000, function () {
      $(this).find('> li:first-child').appendTo($(this));
      $(this).css('left', '');
  });
};

var sliderSet; // Execute once trick

function executeApp(){
  console.log("execApp");
  
  if(!sliderSet) {
    sliderSet = true;
    setTimeout(function () {
      for(var i in sites){
        var slider = $('#slider'+sites[i]._id);
        console.log(slider)
    	  var slideCount = slider.find(' > ul > li').length;
      	var slideWidth = slider.find(' > ul > li').width();
      	var slideHeight = slider.find(' > ul > li').height();
      	console.log("slideHeight", slideHeight);
      	var sliderUlWidth = slideCount * slideWidth +100;
      	
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
      sliderSet = false;
    }, 200);
    sliderSet = true;
  }
}

function setSliders(){
  
}

$(document).ready(function () {
  sliderSet = false;
});    