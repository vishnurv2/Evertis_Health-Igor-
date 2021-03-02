var reporter = require('cucumber-html-reporter')

var options = {
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber.json',
    output: 'reports/cucumber_report.html',
    screenshotsDirectory: 'reports/screenshots/',
    storeScreenshots: true,
    launchReport: true
};

reporter.generate(options);