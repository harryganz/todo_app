angular.module('todoApp', [])
  .controller('TodoListCtrl', ['$scope', function($scope){
    $scope.items = [
      {'name':'Meeting', 'description':'Meeting with city council'},
      {'name':'Dr. Appointement', 'description':'Appointement with Dr. Gordon'}
    ];
  }]);
