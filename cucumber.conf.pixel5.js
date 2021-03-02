// const baseConfig = require('./nightwatch.saucelabs.conf.js');
const baseConfig = require('./nightwatch.browserstack.conf_mobile.js');
// const baseConfig = require('./nightwatch.conf.js');
const fs = require('fs');
const path = require('path');
const { setDefaultTimeout, After, AfterAll, BeforeAll, Before } = require('cucumber');
const { createSession, closeSession, startWebDriver, stopWebDriver, client } = require('nightwatch-api');
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

setDefaultTimeout(60 * 1000);

// BeforeAll(async () => {
//   await startWebDriver({ env: process.env.NIGHTWATCH_ENV || 'chrome' });
//   await createSession();
// });

Before(async () => {
  await startWebDriver({ env: process.env.NIGHTWATCH_ENV || 'pixel5' });
  await createSession();
});

AfterAll(async () => {
  await setTimeout(async () => {
    reporter.generate({
      theme: 'foundation',
      jsonFile: 'report/cucumber_report_pixel5.json',
      output: 'report/cucumber_report_pixel5.html',
      reportSuiteAsScenarios: true,
      launchReport: true,
    });
  }, 0);
});

After(async () =>{
  await closeSession();
  await stopWebDriver();
  await Promise.all(
    getScreenshots()
      .filter(file => !attachedScreenshots.includes(file))
      .map(file => {
        attachedScreenshots.push(file);
        this.attach(fs.readFileSync(file), 'image/png');
      })
  );
});
