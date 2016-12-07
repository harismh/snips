var Snips = angular.module('SnipsApp', ['ngRoute', 'ui.codemirror', 'ngclipboard']);

Snips.config(function($routeProvider) {
  $routeProvider
  .when('/new', {
    templateUrl: 'views/new.html',
    controller: 'SnipsCreateCtrl'
  })
  .when('/browse', {
    templateUrl: 'views/browse.html',
    controller: 'SnipsBrowseCtrl'
  })
  .when('/display', {
    templateUrl: 'views/display.html',
    controller: 'SnipsDisplayCtrl'
  })
  .otherwise({
    redirectTo: '/browse'
  });
})

Snips.factory('database', function($http) {
  var cache = [ {title: 'Hello World', code:'console.log("Hello World")'} ];

  return {
    data: function() { this.get(); return cache; },
    display: {},
    get: function() {
      $http({
        method: 'GET',
        url: 'http://localhost:8000/api/snips',
      }).then(function(response) {
        console.log('success', response);
        cache = response.data;
      });
    },
    post: function(snippet) {
      $http({
        method: 'POST',
        url: 'http://localhost:8000/api/snips',
        data: snippet
      }).then(function(response) {
        console.log('success posting', response);
      });
    },
    delete: function(param) {
      $http({
        method: 'DELETE',
        url: 'http://localhost:8000/api/snips',
        data: param
      }).then(function(response) {
        console.log('deleting snippet...', response);
      })
    }
  };

});

Snips.controller('SnipsCtrl', function($scope, database) {
});

Snips.controller('SnipsCreateCtrl', function($scope, database) {
  $scope.editorOptions = {
    lineNumbers: true,
    hint: true
  };

  $scope.header = 'New';

  $scope.addSnippet = function() {
    database.post({
      name: $scope.name,
      code: $scope.code,
      date: new Date()
    });

    $scope.name = '';
    $scope.code = '';  
    $scope.header = 'Added';

    database.get();
  };
});

Snips.controller('SnipsBrowseCtrl', function($scope, $location, database) {
  $scope.data = database.data();

  $scope.changeDisplay = function(snippet) {
    database.display = snippet;
    $location.path('display');
  };

  $scope.deleteSnip = function(snippet) {
    database.delete(snippet.name);
  }
});

Snips.controller('SnipsDisplayCtrl', function($scope, database) {
  $scope.display = database.display;
  $scope.editorOptions = {
    lineNumbers: true,
    readOnly: 'nocursor',
    value: $scope.display.code,
    mode: 'javascript'
  };
});