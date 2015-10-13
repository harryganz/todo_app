/* Tests for Angular Controllers */
describe('TodoListCtrl', function(){

  // Load module before each test
  beforeEach(module('todoApp'));

  // Declare scope, controller, and mock back-end
  var $httpBackend, $rootScope, createController;

  // Mock up backend, inject scope and controller before each test
  beforeEach(inject(function($injector){
    //Set-up mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // Inject scope (rootscope)
    $rootScope = $injector.get('$rootScope');
    // Inject controller service
    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('TodoListCtrl', {'$scope' : $rootScope});
    };

    // Default responses (should be overriden)
    $httpBackend.when('GET', '/items.json').
      respond(300);
  }));

  it('Should get two items', function(){
      var controller = createController();
      $httpBackend.expectGET('/items.json').
        respond([
          {'name':'Meeting', 'description':'Meeting with city council',
          'id':1},
          {'name':'Dr. Appointment', 'description':'Appointment with Dr. Gordon',
          'id': 2}
        ]);
      expect($rootScope.items).toBeUndefined();
      $httpBackend.flush();
      expect($rootScope.items.length).toBe(2);
      expect($rootScope.items[0].name).toMatch(/Meeting/i)
  });

  it('Should return "Could not get items" error', function(){
    var controller = createController();
    $httpBackend.expectGET('/items.json').
      respond(500);
    expect($rootScope.items).toBeUndefined();
    $httpBackend.flush();
    expect($rootScope.status).toBe('Could not get items');
    expect($rootScope.items.length).toBe(0);
  });

  it('Should add a new item', function(){
    // Create controller and add items to scope
    var controller = createController();
    $httpBackend.expect('POST','/items').
        respond(201, '3');
    $rootScope.name = 'NewItem';
    $rootScope.description = 'A new item';
    $rootScope.addItem();
    $httpBackend.flush();
    expect($rootScope.status).toBe('');
  });

  it('Should change status to "Missing name or description"', function(){
    // Create controller and add items to scope
    var controller = createController();
    // Add item if missing both name and description
    $rootScope.addItem();
    expect($rootScope.status).toBe("Missing name or description");
    // Add item missing description
    $rootScope.name = "Name";
    expect($rootScope.status).toBe("Missing name or description");
    // Add item missing Name
    $rootScope.name = null;
    $rootScope.description = "A descritpion";
    $rootScope.addItem();
    expect($rootScope.status).toBe("Missing name or description");
  });

  it('Should change status to "Could not add new item"', function(){
    // Create controller and add items to scope
    var controller = createController();
    $rootScope.name = 'Name';
    $rootScope.description = "A description";
    // Expect server error
    $httpBackend.expect('POST','/items').respond(500);
    // Add Item look at status
    expect($rootScope.status).toBe('');
    $rootScope.addItem();
    $httpBackend.flush();
    expect($rootScope.status).toBe("Could not add new item")
  });
});
