(function(angular) {
  'use strict';

  angular
    .module('app.core')
    .factory('DataService', DataService);

  DataService.$inject = ['$http', '$q'];

  function DataService ($http, $q) {
    var baseUrl = '/api/v1/';
    var token = {}; /* access token for api */
    var key = ''; /* username that must match access token */
    var service = {
      login : login
    , getFeed : getFeed
    };

    return service;

    function login (username, password) {
      var deferred = $q.defer();
      var body = {};
      body.username = username;
      body.password = password;

      $http.post('/login', body)
        .success(function (data) {
          token = data.token;
          key = data.user.username;
          deferred.resolve(data.user);
        })
        .error(function (reason) {
          token = null;
          key = null;
          deferred.reject(reason);
        });

      return deferred.promise;
    }

    function getFeed () {
      var deferred = $q.defer();

      if (!token) {
        deferred.reject({ message : 'Login required' });
      }

      $http.get(baseUrl + 'users/self/feed' + '?x_key=' + key + '&access_token=' + token)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (reason) {
          deferred.reject(reason);
        });

      return deferred.promise;

    }

  }

})(angular);
