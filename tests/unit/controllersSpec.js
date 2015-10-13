/* Tests for Angular Controllers */
describe('TodoListCtrl', function(){

  // Load module before each test
  beforeEach(module('todoApp'));

  // Declare scope, controller, and mock back-end
  var scope, ctrl, $httpBackend;

  describe('Get list of items', function(){
    // Mock up backend responses before each test
    beforeEach(inject(function(_$httpBackend_,
      $rootScope, $controller){
        // Set up backend
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('/items.json').
          respond([
            {'name':'Meeting', 'description':'Meeting with city council',
            'id':1},
            {'name':'Dr. Appointment', 'description':'Appointment with Dr. Gordon',
            'id': 2}
          ]);

        // Set up scope and controller
        scope = $rootScope.$new();
        ctrl = $controller('TodoListCtrl', {$scope: scope});
    }));

      it('Should create "items" model with 2 items', function(){
        expect(scope.items).toBeUndefined();
        $httpBackend.flush();

        expect(scope.items.length).toBe(2);
      });

    it('Should have an item named meeting and an id of 1', function(){
      expect(scope.items).toBeUndefined();
      $httpBackend.flush();

      expect(scope.items[0].name).toBe('Meeting');
      expect(scope.items[0].id).toBe(1);
    });

    it('Should have an item with a description containing Gordon and an id of 2', function(){
      expect(scope.items).toBeUndefined();
      $httpBackend.flush();

      expect(scope.items[1].description).toMatch(/Gordon/i);
      expect(scope.items[1].id).toBe(2);
      });
  });

  // describe('Add new item', function(){
  //   beforeEach(inject(function(_$httpBackend_, $rootScope, $controller){
  //     // Set up backend
  //     $httpBackend = _$httpBackend_;
  //     $httpBackend.expectPOST('/item',
  //       {'name': 'newItem', 'description': 'A new item'}).
  //       respond(201, '3');
  //
  //     scope = $rootScope.$new();
  //     scope.name = 'newItem';
  //     scope.description = 'A new item';
  //     ctrl = $controller('TodoListCtrl', {$scope: scope});
  //   }));
  //
  //   it('Adds an item to items', function(){
  //     $httpBackend.flush();
  //
  //     scope.addItem();
  //   })
  // });
});
