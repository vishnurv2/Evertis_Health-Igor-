// const baseConfig = require('./nightwatch.saucelabs.conf.js');
const baseConfig = require('./nightwatch.browserstack.conf.js');
// const baseConfig = require('./nightwatch.conf.js');
const fs = require('fs');
const path = require('path');
const { setDefaultTimeout, After, AfterAll, BeforeAll, Before } = require('cucumber');
const { createSession, closeSession, startWebDriver, stopWebDriver } = require('nightwatch-api');
const reporter = require('cucumber-html-reporter');

const attachedScreenshots = getScreenshots();

function getScreenshots() {
  try {
    const folder = path.resolve(__dirname, 'screenshots');

    const screenshots = fs.readdirSync(folder).map(file => path.resolve(folder, file));
    return screenshots;
  } catch (err) {
    return [];
  }
}

setDefaultTimeout(50000);

// BeforeAll(async () => {
//   await startWebDriver({ env: process.env.NIGHTWATCH_ENV || 'chrome' });
//   await createSession();
// });

Before(async () => {
  await startWebDriver({ env: process.env.NIGHTWATCH_ENV || 'safari' });
  await createSession();
});

AfterAll(async () => {
  setTimeout(() => {
    reporter.generate({
      theme: 'foundation',
      jsonFile: 'report/cucumber_report_safari.json',
      output: 'report/cucumber_report_safari.html',
      reportSuiteAsScenarios: true,
      launchReport: true,
    });
  }, 3000);
});

After(function() {
  closeSession();
  stopWebDriver();
  return Promise.all(
    getScreenshots()
      .filter(file => !attachedScreenshots.includes(file))
      .map(file => {
        attachedScreenshots.push(file);
        return this.attach(fs.readFileSync(file), 'image/png');
      })
  );
});
