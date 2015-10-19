describe('Todo list view', function(){
    // Get index page
		beforeEach(function(){
			browser.get('index.html')
		});

		var todolist = element.all(by.repeater('item in items'));
		var names = element.all(by.css('#todo-table table tr td:first-child'));
		var descriptions = element.all(by.css('#todo-table table tr td:nth-child(2)'));
    var name = element(by.id('name'));
    var description = element(by.id('description'));
    var submitBtn = element(by.id('add-item'));
    var deleteBtns = element.all(by.css('#todo-table table tr td:nth-child(3) button'));

    it('should add a new item', function(){
        name.sendKeys('New Item');
        description.sendKeys('A new item');
        submitBtn.click();

        expect(names.last().getText()).toBe('New Item');
        expect(descriptions.last().getText()).toBe('A new item');
    });

    it('should delete the item it just added', function(){
        deleteBtns.last().click();
        expect(names.last().getText()).not.toBe('New Item');
    });
});
