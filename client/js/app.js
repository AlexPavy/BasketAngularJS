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

$(document).ready(function () {
  
  setTimeout(function () {
    for(var i in sites){
      console.log("setting slider")
      console.log('#slider'+sites[i]._id+' > ul')
  	  var slideCount = $('#slider'+sites[i]._id+' > ul > li').length;
    	var slideWidth = $('#slider'+sites[i]._id+' > ul > li').width();
    	var slideHeight = $('#slider'+sites[i]._id+' > ul > li').height();
    	var sliderUlWidth = slideCount * slideWidth;
    	
    	$('#slider'+sites[i]._id).css({ width: slideWidth, height: slideHeight });
    	
    	$('#slider'+sites[i]._id+' > ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
    	
      $('#slider'+sites[i]._id+' > ul > li:last-child').prependTo('#slider'+sites[i]._id+' > ul');
      
      console.log("setting click for , #prev"+sites[i]._id);
      $('#prev'+sites[i]._id).on("click", function (e) {
        console.log("moving left "+sites[i]._id)
          moveLeft(sites[i]._id);
          return false;
      });
      console.log("set click for ", sites[i]._id)
  
      $('#next'+sites[i]._id).on("click", function (e) {
        console.log("moving right "+sites[i]._id)
          moveRight(sites[i]._id);
          return false;
      });
    }
  
    function moveLeft(sid) {
      
      console.log(sid);
      
        $('#slider'+sid+' > ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider'+sid+' > ul > li:last-child').prependTo('#slider'+sid+' > ul');
            $('#slider'+sid+' > ul').css('left', '');
        });
    };
  
    function moveRight(sid) {
        $('#slider'+sid+' > ul').animate({
            right: + slideWidth
        }, 200, function () {
            $('#slider'+sid+' > ul > li:first-child').appendTo('#slider'+sid+' > ul');
            $('#slider'+sid+' > ul').css('right', '');
        });
    };
  }, 2000);
});    