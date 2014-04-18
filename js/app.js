'use strict';


angular.module('myApp', [
  'ngRoute',
  'ngTable',
  'myApp.services',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/items', {templateUrl: 'partials/items.html', controller: 'itemsController'});
  $routeProvider.when('/cart', {templateUrl: 'partials/cart.html', controller: 'cartController'});
  $routeProvider.otherwise({redirectTo: '/items'});
}]);
