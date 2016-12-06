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

Snips.factory('database', function() {
  return {
    data: [],
    display: {},
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
      database.data.push({
        name: $scope.name,
        code: $scope.code,
        date: new Date()
      });

      database.display = database.data[database.data.length - 1];
      $scope.name = '';
      $scope.code = '';  
      $scope.header = 'Added';

      console.log('added', database);
  };
});

Snips.controller('SnipsBrowseCtrl', function($scope, $location, database) {
  $scope.data = database.data;
  $scope.changeDisplay = function(snippet) {
    database.display = snippet;
    $location.path('display');
  };
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