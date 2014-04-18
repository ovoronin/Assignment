angular.module('app',['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
    		.when('/item/:id', {controller: 'itemsController'})
        	.when('', {controller: 'itemsController'})
        	.otherwise({redirectTo: ''});
    }]);

function itemsController($scope, $http, $route, $routeParams, $location) {

	$scope.$on('$routeChangeSuccess', function() { 
		if (!$scope.data) {
			$http.get("data/product-feed.json").success(function(allData) {
				$scope.data = (allData);
				if ($routeParams.id)
					$scope.navigate($routeParams.id);
			});
		} else {
			if ($routeParams.id)
				$scope.navigate($routeParams.id);
			else
	        	$scope.close();
		}
	});
	
	$scope.imageSrc = function(wine) {
		if (wine.picture)
			return "images/"+wine.picture;
		else
			return "images/no-photo.jpg";
	};
	
	$scope.getWineById = function(id) {
		var lookup = [];
		for (var i = 0, len = $scope.wines.length; i < len; i++) {
		    lookup[$scope.wines[i].id] = $scope.wines[i];
		}
		if (lookup.length > 0) 
			return lookup[id];
		else
			return null;
	};
	
	$scope.navigate = function(id) {
		var w = $scope.getWineById(id);
		if (w)
			$scope.open(w);
	};
	
	$scope.open = function(item) {
		$scope.opened = item;
	};
	
	$scope.isOpened = function() {
		return $scope.opened !== undefined;
	};
	
	$scope.close = function() {
		$scope.opened = undefined;
	};
};

function itemDetailsController($scope) {

};

$(document).ready(function(){

});