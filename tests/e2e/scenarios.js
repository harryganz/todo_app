describe('Todo app', function(){
  // TODO fix persistence
  describe('Item list view', function(){
    // Get index page
		beforeEach(function(){
			browser.get('index.html')
		});

		var todolist = element.all(by.repeater('item in items'));
		var names = element.all(by.css('#todo-table table tr td:first-child'));
		var descriptions = element.all(by.css('#todo-table table tr td:nth-child(2)'));

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

  describe('Add/Remove in list view', function(){
    var name = element(by.id('name'));
    var description = element(by.id('description'));
    var submitBtn = element(by.id('add-item'));
    var names = element.all(by.css('#todo-table table tr td:first-child'));
		var descriptions = element.all(by.css('#todo-table table tr td:nth-child(2)'));
    var deleteBtns = element.all(by.css('#todo-table table tr td:nth-child(3) button'))

    it('should add a new item', function(){
        name.sendKeys('New Item');
        description.sendKeys('A new item');
        submitBtn.click();

        expect(names.last().getText()).toBe('New Item');
        expect(descriptions.last().getText()).toBe('A new item');
    });

    it('Should remove an item', function(){
        deleteBtns.last().click();

        expect(names.last().getText()).toMatch(/Appointment/i);
      });

  });
});
