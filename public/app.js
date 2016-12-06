var Snips = angular.module('SnipsApp', ['ngRoute', 'ui.codemirror']);

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
    redirectTo: '/'
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
  };

   $scope.addSnippet = function() {
      database.data.push({
        name: $scope.name,
        code: $scope.code,
        date: new Date()
      });

      database.display = database.data[database.data.length - 1];
      $scope.name = '';
      $scope.code = '';  
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