angular.module('todoApp', [])
  .controller('TodoListCtrl', ['$scope', '$http', function($scope, $http){
    $scope.name ='';
    $scope.description = '';
    var max_id = 0;

    $http.get('/items.json').
    success(function(data) {
      $scope.items = data;
    }).
    error(function(err){
      // TODO error handling
      $scope.items = [];
    });

    $scope.addItem = function(){
      var name = $scope.name;
      var description = $scope.description;


      if(name && description) {
        var newItem = {'name': name, 'description': description}
        $http.post('/items', newItem).
            success(function(){
              $scope.name = '';
              $scope.description = '';
              $scope.items.push(newItem);
            }).
            error(function(err){
              // TODO error handling
            });
        }
  }

    $scope.removeItem = function(id){
      var index = $scope.items.map(function(obj, index){
        if(obj.id === id){
          return index
        }
      }).filter(isFinite)[0]

      $scope.items.splice(index, 1);
    };
  }]);
