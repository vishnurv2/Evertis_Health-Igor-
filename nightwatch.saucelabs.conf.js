const baseConfig = require('./nightwatch.conf.js');

const config = {
    ...baseConfig,
    webdriver: {
        'start_process': true,
        'host': 'ondemand.us-west-1.saucelabs.com',
        'port': 443
    },
};

config.test_settings.default.desiredCapabilities['username'] = process.env.SOUCELABS_USER;
config.test_settings.default.desiredCapabilities['access_key'] = process.env.SOUCELABS_KEY;
;
config.test_settings.default.desiredCapabilities.chromeOptions.args = [];

// Code to copy seleniumhost/port into test settings
for (var i in config.test_settings) {
    var test_setting = config.test_settings[i];
    test_setting['selenium_host'] = config.webdriver.host;
    test_setting['selenium_port'] = config.webdriver.port;
};
module.exports = config;