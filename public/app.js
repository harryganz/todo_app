angular.module('todoApp', [])
  .controller('TodoListCtrl', ['$scope', '$http', function($scope, $http){
    $scope.name ='';
    $scope.description = '';
    $scope.status = '';

    $http.get('/items.json').
    success(function(data) {
      $scope.items = data;
      $scope.status = '';
    }).
    error(function(err){
      $scope.status = 'Could not get items';
      $scope.items = [];
    });

    $scope.addItem = function(){
      var name = $scope.name;
      var description = $scope.description;

      if(name && description) {
        var newItem = {'name': name, 'description': description}
        $http.post('/items', newItem).
            success(function(response){
              $scope.name = '';
              $scope.description = '';
              $scope.items.push(newItem);
              $scope.status = '';
            }).
            error(function(response){
              $scope.status = 'Could not add new item';
            });
        } else {
          $scope.status = 'Missing name or description'
        }
    }

    $scope.removeItem = function(id){
      var index = $scope.items.map(function(obj){
        return obj.id;
      }).indexOf(id);

      if(index > -1){
        $http.delete('/items/'+id).
          success(function(response){
            $scope.items.splice(index, 1);
            $scope.status = '';
          }).
          error(function(response){
            $scope.status = 'Could not delete item';
          });
      } else {
        $scope.status = 'An unknown error occurred';
      }
    }

  }]);
