(function(angular) {
  'use strict';

  angular
    .module('app.home')
    .config(DefineRoutes);

  DefineRoutes.$inject = ['$routeProvider'];

  function DefineRoutes($routeProvider) {
    $routeProvider.when('/', {
      controller: 'HomeController',
      controllerAs: 'vm',
      templateUrl: 'assets/home/home.html',
    });
  }

})(angular);
