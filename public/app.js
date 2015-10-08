angular.module('todoApp', [])
  .controller('TodoListCtrl', ['$scope', function($scope){
    $scope.name ='';
    $scope.description = '';
    var max_id = 0;

    $scope.items = [
      {'name':'Meeting', 'description':'Meeting with city council',
      'id':++max_id},
      {'name':'Dr. Appointment', 'description':'Appointment with Dr. Gordon',
      'id': ++max_id}
    ];

    $scope.addItem = function(){
      var name = $scope.name;
      var description = $scope.description;

      if(name && description) {
          $scope.items.push({'name': name,
           'description': description, 'id':++max_id});
          $scope.name = '';
          $scope.description = '';
      }
    };

    $scope.removeItem = function(id){
      var index = $scope.items.map(function(obj, index){
        if(obj.id === id){
          return index
        }
      }).filter(isFinite)[0]

      $scope.items.splice(index, 1);
    };
  }]);
