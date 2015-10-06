/* Tests for Angular Controllers */
describe('TodoListCtrl', function(){

  beforeEach(module('todoApp'));

  it('Should create "items" model with 2 items', inject(function($controller){
      var scope = {},
        ctrl = $controller('TodoListCtrl', {$scope:scope});

      expect(scope.items.length).toBe(2);
    }));

  it('Should have an item named meeting', inject(function($controller){
    var scope = {},
      ctrl = $controller('TodoListCtrl', {$scope:scope});

    expect(scope.items[0].name).toBe('Meeting');
  }));

  it('Should have an item with a description containing Gordon', function($controller){
      var scope = {},
        ctrl = $controller('TodoListCtrl', {$scope:scope})

      expect(scope.items[1].description).toMatch(/Gordon/i);
    });
});
