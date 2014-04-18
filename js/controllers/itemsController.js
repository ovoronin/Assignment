angular.module('myApp.controllers')
	.controller('itemsController', ['$scope','$rootScope','$http','ngTableParams', '$filter', 'Cart', function($scope, $rootScope, $http, ngTableParams, $filter, Cart) {

		$scope.update = function(){
			$rootScope.count = Cart.getCount();
			$rootScope.price = Cart.getSum();
			$rootScope.active = 'items';
		};
		
		$http.get("data/product-feed.json").success(function(allData) {
			allData.forEach(function(item){
		       item.toOrder = 1;
			});
			$scope.data = (allData);
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
			$scope.update();

		});
		
		$scope.addToCart = function(item) {
			Cart.add(item, item.toOrder);
			$scope.update();
		};
		
		$scope.inc = function(item) {
			item.toOrder = Math.min( item.quantity, item.toOrder+1 );
		};
		
		$scope.dec = function(item) {
			item.toOrder = Math.max( 1, item.toOrder-1 );
		};
	
		
	}])