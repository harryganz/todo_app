angular.module('todoApp', [])
  .controller('TodoListCtrl', ['$scope', function($scope){
    $scope.name ='';
    $scope.description = '';

    $scope.items = [
      {'name':'Meeting', 'description':'Meeting with city council'},
      {'name':'Dr. Appointment', 'description':'Appointment with Dr. Gordon'}
    ];

    $scope.addItem = function(){
      var name = $scope.name;
      var description = $scope.description;

      if(name && description) {
          $scope.items.push({'name': name,
           'description': description});
          $scope.name = '';
          $scope.description = '';
      }
    };

    $scope.removeItem = function(index){
        $scope.items.splice(index, 1);
    };
  }]);
