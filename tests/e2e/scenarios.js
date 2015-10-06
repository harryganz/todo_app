describe('Todo app', function(){
  describe('Item list view', function(){
    // Get index page
		beforeEach(function(){
			browser.get('index.html')
		});

		var todolist = element.all(by.repeater('item in items'));
		var names = element.all(by.css('#todo-table table tr td:first-child'));
		var descriptions = element.all(by.css('#todo-table table tr td:nth-child(2)'))

		it('should display 2 items', function(){
			expect(todolist.count()).toBe(2);
		});

		it('should have names matching Meeting/Appointment', function(){
		    expect(names.first().getText()).toMatch(/Meeting/i);
				expect(names.get(1).getText()).toMatch(/Appointment/i);
		  });

		it('should have descriptions matching council/Gordon', function(){
		    expect(descriptions.first().getText()).toMatch(/council/i);
				expect(descriptions.get(1).getText()).toMatch(/Gordon/i);
		  });
  });
});
