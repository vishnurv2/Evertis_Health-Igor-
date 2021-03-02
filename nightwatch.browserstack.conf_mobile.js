const baseConfig = require('./nightwatch.conf.js');
const browserstack = require('browserstack-local');
require('dotenv').config();
const config = {
    ...baseConfig,
    webdriver: {
        'start_process': true,
        'host': 'hub-cloud.browserstack.com',
        'port': 80
    },
};

config.test_settings.default.desiredCapabilities['browserstack.user'] = "";
config.test_settings.default.desiredCapabilities['browserstack.key'] = "";
config.test_settings.default.desiredCapabilities['browserstack.debug'] = true;
config.test_settings.default.desiredCapabilities['browserstack.console'] = "errors";
config.test_settings.default.desiredCapabilities['browserstack.local'] = false;
config.test_settings.default.desiredCapabilities['browserstack.debug'] = true;
config.test_settings.default.desiredCapabilities['browserstack.console'] = "info";
config.test_settings.default.desiredCapabilities['browserstack.networkLogs'] = true;
config.test_settings.default.desiredCapabilities['browserstack.idleTimeout'] = 60;


config.test_settings.iphone12 = {
    desiredCapabilities: {
        "os_version" : "14",
        "device" : "iPhone 12",
        "real_mobile" : "true",
        "browserstack.local" : "false",
        "browserName" : "iPhone"
    }
};

config.test_settings.iphone8 = {
    desiredCapabilities: {
        "os_version" : "12",
        "device" : "iPhone 8",
        "real_mobile" : "true",
        "browserstack.local" : "false",
        "browserName" : "iPhone"
    }
};

config.test_settings.samsungs20 = {
    desiredCapabilities: {
        "os_version" : "10.0",
        "device" : "Samsung Galaxy S20",
        "real_mobile" : "true",
        // "browserName" : "Android",
        "browser": "Firefox"
    }
};

config.test_settings.samsungs9 = {
    desiredCapabilities: {
        "os_version" : "8.0",
        "device" : "Samsung Galaxy S9",
        "real_mobile" : "true",
        "browserstack.local" : "false",
        "browserName" : "Android"
    }
};

config.test_settings.ipad8 = {
    desiredCapabilities: {
        "os_version" : "14",
        "device" : "iPad 8th",
        "real_mobile" : "true",
        "browserstack.local" : "false",
        "browserName" : "iPad"
    }
};

config.test_settings.ipad6 = {
    desiredCapabilities: {
        "os_version" : "11",
        "device" : "iPad 6th",
        "real_mobile" : "true",
        "browserstack.local" : "false",
        "browserName" : "iPad"
    }
};

config.test_settings.samsungtab7 = {
    desiredCapabilities: {
        "os_version" : "10.0",
        "device" : "Samsung Galaxy Tab S7",
        "real_mobile" : "true",
        "browserstack.local" : "false",
        "browserName" : "Android"
    }
};

config.test_settings.samsungtab4 = {
    desiredCapabilities: {
        "os_version" : "8.1",
        "device" : "Samsung Galaxy Tab S4",
        "real_mobile" : "true",
        "browserstack.local" : "false",
        "browserName" : "Android"
    }
};

config.test_settings.pixel3 = {
    desiredCapabilities: {
        "os_version" : "10.0",
        "device" : "Google Pixel 3",
        "real_mobile" : "true",
        "browserstack.local" : "false",
        "browserName" : "Android"
    }
};

config.test_settings.pixel5 = {
    desiredCapabilities: {
        "os_version" : "11.0",
        "device" : "Google Pixel 5",
        "real_mobile" : "true",
        "browserstack.local" : "false",
        "browserName" : "Android"
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