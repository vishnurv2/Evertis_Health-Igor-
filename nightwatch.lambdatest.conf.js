const baseConfig = require('./nightwatch.conf.js');
// const browserstack = require('browserstack-local');
require('dotenv').config();
const config = {
    ...baseConfig,
    "selenium" : {
        "start_process" : false,
        "server_path" : "",
        "log_path" : "",
        "host" : "hub.lambdatest.com",
        "port" : 80,
        "cli_args" : {
          "webdriver.chrome.driver" : "",
          "webdriver.ie.driver" : "",
          "webdriver.firefox.profile" : ""
        }
      },
};

config.test_settings.default.desiredCapabilities['username'] = "";
config.test_settings.default.desiredCapabilities['access_key'] = "";
config.test_settings.default.desiredCapabilities['console'] = true;
config.test_settings.default.desiredCapabilities['use_w3c'] = true;
config.test_settings.default.desiredCapabilities['resolution'] = "1920 x 1080";
config.test_settings.default.desiredCapabilities['idleTimeout'] = 60;
config.test_settings.default.desiredCapabilities['selenium_version'] = "3.141.59";

config.test_settings.firefox = {
    desiredCapabilities: {
        "os" : "Windows",
        "os_version" : "10",
        "browserName" : "Firefox",
        "browser_version" : "latest",
        "selenium_version" : "3.10.0",
    }
};
config.test_settings.chrome = {
    desiredCapabilities: {
        "os" : "Windows",
        "os_version" : "10",
        "browserName" : "Chrome",
        "browser_version" : "87.0",
        "selenium_version" : "3.14.0",
        // "chromeOptions" : {
        //     "args" : ["--headless"]
        //  }
        // ['browserstack.selenium_version']: '3.141.59',
    }
};

config.test_settings.safari = {
    desiredCapabilities: {
        "os" : "OS X",
        "os_version" : "Catalina",
        "browserName" : "Safari",
        "browser_version" : "13.1",
        "selenium_version" : "3.14.0",
    }
};

config.test_settings.edge = {
    desiredCapabilities: {
        "os" : "Windows",
        "os_version" : "10",
        "browserName" : "Edge",
        "browser_version" : "latest",
        "resolution" : "1920x1080",
        "selenium_version" : "3.5.2",
    }
};
// Code to copy seleniumhost/port into test settings
for (var i in config.test_settings) {
    var test_setting = config.test_settings[i];
    test_setting['selenium_host'] = config.webdriver.host;
    test_setting['selenium_port'] = config.webdriver.port;
    test_setting['desiredCapabilities'] = test_setting['desiredCapabilities'] || {};
    for(var j in config.common_capabilities){
        test_setting['desiredCapabilities'][j] = test_setting['desiredCapabilities'][j] || config.common_capabilities[j];
      }
}

module.exports = config;