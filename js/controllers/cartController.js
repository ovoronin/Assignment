
angular.module('myApp.controllers')
	.controller('cartController', ['$scope', '$rootScope','$route', '$location', 'ngTableParams', '$filter', 'Cart', function( $scope, $rootScope, $route, $location, ngTableParams, $filter, Cart ) {

		$scope.update = function(){
			$rootScope.count = Cart.getCount();
			$rootScope.price = Cart.getSum();
			$scope.count = Cart.getCount();
			$scope.totalPrice = Cart.getSum();
			$rootScope.active = 'cart';
		};
		
		$scope.data = Cart.get();
		if (Cart.getCount()==0)
			$location.path( '#/items' );
		
		$scope.update();

		$scope.tableParams = new ngTableParams({
	        page: 1,            // show first page
	        count: 10,           // count per page
	        filter: {
   	            name: ''       // initial filter
   	        },
   	        sorting: {
	    	    name: 'asc'     // initial sorting
	    	}
	    }, {
	        total: $scope.data.length, // length of data
	        getData: function($defer, params) {
	            var orderedData = params.filter() ?
	                   $filter('filter')($scope.data, params.filter()) :
	                	   $scope.data;
	            orderedData = params.sorting() ?
                       $filter('orderBy')(orderedData, params.orderBy()) :
                    	   orderedData;
	            var ordered = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
	            params.total(orderedData.length); // set total for recalc pagination
	            $scope.total = orderedData.length;
	            $defer.resolve(ordered);
   	        }
	    });

		$scope.dec = function(item) {
			Cart.add(item,-1);
			$scope.update();
		};
		
		$scope.inc = function(item) {
			Cart.add(item,1);
			$scope.update();
		};
		
		$scope.remove = function(item) {
			Cart.remove(item);
			$route.reload();
		};
		
	}]);
