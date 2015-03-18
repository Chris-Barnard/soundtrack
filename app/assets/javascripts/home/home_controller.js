(function(angular) {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['DataService', '$log'];

  function HomeController(DataService, $log) {
    var vm = this;

    vm.activeUser = {};
    vm.title = 'Soundtrack For Your Life';

    activate();

    function activate() {
    	handleLogin();
    }

    function handleLogin () {
      DataService.login('testuser99', '123')
        .then(function (data) {
          vm.activeUser = data;
          DataService.getFeed()
            .then(function (data) {
              vm.activeUser.feed = data;
              $log.log(data);
            }, function (reason) {
              $log.log('Could not load feed: ' + reason.message);
            });
        }, function (reason) {
          $log.log('Could not log in: ' + reason.message);
        });
        
    }
  }

})(angular);
