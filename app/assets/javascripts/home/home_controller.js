(function(angular) {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = [];

  function HomeController() {
    var vm = this;

    vm.title = 'Soundtrack For Your Life';
  }

})(angular);
