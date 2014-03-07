var siteCard = function(site) {
    return "<ul class='no_item'>"+
              "<li>"+site.host+"</li>"+
              "<li>"+site.desc+"</li>"+
              "<ul class=\"rig columns-3\">"+
                "<li ng-repeat=\"visit in site.visits\" class=\"repeated-item\"><div compile=\"visitCard(visit)\"></div></li>"+
              "</ul>"+
              "<li><button class=\"btn btn-inverse btn-small delBtn\" ng-click=\"deleteSite('"+site._id+"')\"><i class=\"icon-white icon-remove\"></i></button></li>"+
            "</ul>";
};
  
var visitCard = function(visit) {
    return "<ul class='no_item'>"+
              "<li>"+visit.path+"</li>"+
              "<li>"+visit.desc+"</li>"+
              "<ul class=\"rig columns-3\">"+
                "<li ng-repeat=\"date in visit.dates\" class=\"repeated-item\">{{date}}</li>"+
              "</ul>"+
            "</ul>";
};
  
var ajsCompile;
var ajsScope;

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
  $http.get('/main')
		.success(function(data) {
			$scope.sites = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

  $scope.createSite = function() {
    var visitData = {
      'url': $scope.inURL,
      'desc': $scope.descURL
    }
		$http.post('/addURL', visitData)
			.success(function(data) {
				$scope.sites = data;
				// console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.deleteSite = function(id) {
    alert("gonna del");
		$http.delete('/remove/' + id)
			.success(function(data) {
				$scope.sites = data;
				// console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	

  $scope.to_trusted = function(html_code) {
    return $sce.trustAsHtml(html_code);
}

  $scope.siteCard = siteCard;
  $scope.html = 'Hello {{name}}';
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