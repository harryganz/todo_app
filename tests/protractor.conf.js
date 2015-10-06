exports.config = {
	allScriptsTimeout: 1100,
	specs: ['e2e/*.js'],
	capabilities: {
		'browserName': 'chrome'
	},
	chromeOnly: true,
	baseUrl: 'http://localhost:3000/',
	framework: 'jasmine',
	jasmineNodeOpts: {
		defaultTimeOutInterval: 30000
	}
};
