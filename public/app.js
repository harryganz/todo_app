angular.module('todoApp', [])
  .controller('TodoListCtrl', ['$scope', function($scope){
    $scope.items = [
      {'name':'Meeting', 'description':'Meeting with city council'},
      {'name':'Dr. Appointment', 'description':'Appointment with Dr. Gordon'}
    ];
  }]);
