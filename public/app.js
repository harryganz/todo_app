angular.module('todoApp', [])
  .controller('TodoListCtrl', ['$scope', '$http', function($scope, $http){
    $scope.name ='';
    $scope.description = '';
    $scope.status = '';
    $scope.items = [];
    // Load Items
    getItems();

    // Get items from server
    function getItems(){
      $http.get('/items.json').
      success(function(data) {
        $scope.status = '';
        $scope.items = data;
      }).
      error(function(err){
        $scope.status = 'Could not get items';
        $scope.items = [];
      });
    };

    $scope.addItem = function(){
      var name = $scope.name;
      var description = $scope.description;

      if(name && description) {
        var newItem = {'name': name, 'description': description}
        $http.post('/items', newItem).
            success(function(response){
              $scope.name = '';
              $scope.description = '';
              getItems();
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
      $http.delete('/items/'+id).
        success(function(response){
          getItems();
          $scope.status = '';
        }).
        error(function(response){
          $scope.status = 'Could not delete item';
        });
    }

  }]);
