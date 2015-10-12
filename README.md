# todo_app #
----------------------
## Description 
A very simple to do list application intended to demonstrate 
angular.js and express being used together in a node web 
application 

## Installation
To get this app up and running on your computer 
you must have <a href="http://nodejs.org">node</a>, <a href="http://npmjs.com">npm</a>,
and <a href="http://git-scm.com">git</a> installed on your computer. You can clone 
the project by typing
``` 
git clone https://github.com/harryganz/todo_app.git
```
into the command line in the directory you would like the application to reside. 

To start the server, navigate to the todo_app directory and type:
```
npm start
```
This will automatically install the dependencies and everything else needed to run the web application.

## Dependencies
The scripts in package.json are designed to automatically install the dependencies using 
the "npm install" and "bower install" commands before running the server; however there is 
one development dependency that will not be installed this way. In order to run the 
edge to edge protractor tests, you must have the <a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html">Java development kit</a> installed on your computer. This will allow protractor to 
run the selenium web server. 

TODO: Redis installation

## Tests 
There are three different test packages used in this project: angular.js unit tests using karma, back-end unit tests
using mocha, and edge to edge tests using protractor. 

The angular unit tests can be started with the command: 
```
npm test
```

The mocha back-end unit tests can be started with the command:
```
npm run mocha
```

And the protractor e2e tests can be started with the command"
```
npm run protractor
```

For a full list of npm scripts take a look at the pakage.json file.
