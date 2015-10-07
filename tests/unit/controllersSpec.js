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

    it('Should add item with name "NewItem" and description "A new item"', inject(function($controller){
        var scope = {},
          ctrl = $controller('TodoListCtrl', {$scope:scope})

        scope.name = 'NewItem';
        scope.description = 'A new item';
        scope.addItem();

        expect(scope.items[2].name).toBe('NewItem');
        expect(scope.items[2].description).toBe('A new item');

        scope.removeItem('NewItem')
    }));

    it('Should remove item with specified index', inject(function($controller){
      var scope = {},
          ctrl = $controller('TodoListCtrl', {$scope: scope});

          scope.name = 'NewItem';
          scope.description = 'A new item';
          scope.addItem();

          expect(scope.items.length).toBe(3);
          expect(scope.items[2].name).toBe('NewItem');

          scope.removeItem(2);

          expect(scope.items.length).toBe(2);
          expect(scope.items.indexOf(function(element, index, arr){
            element.name === "NewItem"
          })).toBe(-1);
    }));

});
