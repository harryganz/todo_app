/* Tests for Angular Controllers */
describe('TodoListCtrl', function(){

  beforeEach(module('todoApp'));

  it('Should create "items" model with 2 items', inject(function($controller){
      var scope = {},
        ctrl = $controller('TodoListCtrl', {$scope:scope});

      expect(scope.items.length).toBe(2);
    }));

  it('Should have an item named meeting and an id of 1', inject(function($controller){
    var scope = {},
      ctrl = $controller('TodoListCtrl', {$scope:scope});

    expect(scope.items[0].name).toBe('Meeting');
    expect(scope.items[0].id).toBe(1);
  }));

  it('Should have an item with a description containing Gordon and an id of 2', function($controller){
      var scope = {},
        ctrl = $controller('TodoListCtrl', {$scope:scope})

      expect(scope.items[1].description).toMatch(/Gordon/i);
      expect(scope.items[1].id).toBe(2);
    });

    it('Should add item with name "NewItem", description "A new item", and id 3',
     inject(function($controller){
        var scope = {},
          ctrl = $controller('TodoListCtrl', {$scope:scope})

        scope.name = 'NewItem';
        scope.description = 'A new item';
        scope.addItem();

        expect(scope.items[2].name).toBe('NewItem');
        expect(scope.items[2].description).toBe('A new item');
        expect(scope.items[2].id).toBe(3);

        scope.removeItem('NewItem')
    }));

    it('Should remove item with specified id', inject(function($controller){
      var scope = {},
          ctrl = $controller('TodoListCtrl', {$scope: scope});

          expect(scope.items.length).toBe(2);
          expect(scope.items[1].name).toMatch(/Appointment/i);

          scope.removeItem(2);

          expect(scope.items.length).toBe(1);
          expect(scope.items.filter(function(item){
            item.id === 2;
          }).length).toBe(0);
    }));

});
