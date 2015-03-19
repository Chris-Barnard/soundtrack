(function(angular) {
  'use strict';

  angular
    .module('app.newmessage')
    .config(DefineRoutes);

  DefineRoutes.$inject = ['$routeProvider'];

  function DefineRoutes($routeProvider) {
    $routeProvider.when('/app/newmessage', {
      controller : 'NewMessageController'
    , controllerAs : 'vm'
    , templateUrl : 'assets/newmessage/newMessage.html'
    });
  }

})(angular);
