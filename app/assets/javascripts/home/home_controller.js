(function(angular) {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['DataService', 'UserAuth','$log'];

  function HomeController(DataService, UserAuth, $log) {
    var vm = this;

    vm.activeUser = null;
    vm.getFeed = getFeed;
    vm.getLoginError = UserAuth.getLoginError;
    vm.handleLogin = handleLogin;
    vm.handleLogout = UserAuth.logout;
    vm.isLoggedIn = UserAuth.isLoggedIn;
    vm.title = 'Soundtrack For Your Life';

    activate();

    function activate() {
      vm.activeUser = UserAuth.getActiveUser();

      if (vm.activeUser) { getFeed() }
    }

    function getFeed () {
      return DataService.getFeed().then(function (feed) {
        vm.activeUser.feed = feed;
        return vm.activeUser.feed;
      });
    }

    function handleLogin (username, password) {
      return UserAuth.login(username, password).then(function (data) {
        vm.activeUser = data;
        getFeed();
      });
    }
  }

})(angular);
