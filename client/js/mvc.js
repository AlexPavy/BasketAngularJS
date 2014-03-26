var siteCard = function(site) {
  var siteBegin = "<ul class='no_item'>"+
            "<li><a href=http://"+site.host+">"+site.host+"</a></li>"+
            "<li>"+site.desc+"</li>"+
            "<li>"+
              "<div id=\"slider"+site._id+"\" class=\"slider\">"+
                "<a href=\"#\" onclick=\"return false;\" id=\"next"+site._id+"\" class=\"next\">></a>"+
                "<a href=\"#\" onclick=\"return false;\" id=\"prev"+site._id+"\" class=\"prev\"><</a>"+
                "<ul class=\"srimg\">";
  var siteRepeated = "";
  var visits = site.visits;
  var visitsL = visits.length;
  for(var i=0;i<visitsL;i++) {
    var visitBegin = "<li>"+
                      "<ul class='srimg'>"+
                        "<li><a href="+visits[i].url+">"+visits[i].path+"</a></li>"+
                        "<li>"+visits[i].desc+"</li>"+
                        "<li>"+
                          "<ul class=\"srimg\">";
    var visitRepeated = "";
    for(var j in visits[i].dates) {
      visitRepeated += "<li>"+visits[i].dates[j]+"</li>";
    }
    var visitEnd =      "</ul>"+
                      "</li>"+
                    "</ul>"+
                  "</li>";
    siteRepeated += visitBegin + visitRepeated + visitEnd;
  }
  var siteEnd =       "</ul>"+
                    "</div>"+
                  "<li><button class=\"btn btn-inverse btn-small delBtn\" ng-click=\"deleteSite('"+site._id+"')\"><i class=\"icon-white icon-remove\"></i></button></li>"+
                  "</ul>"+
                "</li>";
  return siteBegin + siteRepeated + siteEnd;
};

var smallCard = function(content) {
  var card ="<ul class='no_item'>"+
              "<li><a href=http://"+content.url+">"+content.url+"</a></li>"+
              "<li>"+content.desc+"</li>"+
            "</ul>";
  return card;
};
  
var visitCard = function(visit) {
    return 
};
  
var ajsCompile;
var ajsScope;
var sites;

function setSites($scope, data) {
  $scope.sites = data;
  sites = data;
}

// public/core.js
var basketMVC = angular.module('basketMVC', ['ngAnimate'], function($compileProvider) {
  // Compile html to execute AngularJS code
  $compileProvider.directive('compile', function($compile) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.compile);
        },
        function(value) {
          element.html(value);
          $compile(element.contents())(scope);
        }
      );
    };
  })
});

function mainController($scope, $http, $sce, $compile) {
  ajsCompile = $compile;
  ajsScope = $scope;
  
  $scope.getVisits = function() {
    $http.get('/main')
    	.success(function(data) {
    		setSites($scope, data);
    		console.log(data);
    	})
    	.error(function(data) {
    		console.log('Error: ' + data);
    	});
	};
  
  $scope.getVisits();

  $scope.createSite = function() {
    var visitData = {
      'url': $scope.inURL,
      'desc': $scope.descURL
    }
		$http.post('/addURL', visitData)
			.success(function(data) {
				setSites($scope, data);
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
		setTimeout(function () {
		  $scope.getVisits();
    }, 500);
	};

	$scope.deleteSite = function(id) {
		$http.delete('/remove/' + id)
		.success(function(data) {
			setSites($scope, data);
			// console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

  $scope.siteCard = siteCard;
}

basketMVC.controller('mainController', mainController);


/* Animations ********************************************************/
basketMVC.animation('.repeated-item', function() {
  return {
    enter : function(element, done) {
      element.css('opacity',0);
      jQuery(element).animate({
        opacity: 1
      }, done);
 
      // optional onDone or onCancel callback
      // function to handle any post-animation
      // cleanup operations
      return function(isCancelled) {
        if(isCancelled) {
          jQuery(element).stop();
        }
      }
    },
    leave : function(element, done) {
      element.css('opacity', 1);
      jQuery(element).animate({
        opacity: 0
      }, done);
 
      // optional onDone or onCancel callback
      // function to handle any post-animation
      // cleanup operations
      return function(isCancelled) {
        if(isCancelled) {
          jQuery(element).stop();
        }
      }
    },
    move : function(element, done) {
      element.css('opacity', 0);
      jQuery(element).animate({
        opacity: 1
      }, done);
 
      // optional onDone or onCancel callback
      // function to handle any post-animation
      // cleanup operations
      return function(isCancelled) {
        if(isCancelled) {
          jQuery(element).stop();
        }
      }
    },
 
    // you can also capture these animation events
    addClass : function(element, className, done) {},
    removeClass : function(element, className, done) {}
  }
});
