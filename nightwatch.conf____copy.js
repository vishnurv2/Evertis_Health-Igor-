require('dotenv').config();
const chromedriver = require('chromedriver');
const firefoxdriver = require('geckodriver');
module.exports = {
    'src_folders': ['step-definitions'],
    // 'webdriver': {
    //     'start_process': false,
    //     'server_path': chromedriver.path,
    //     // 'server_path': firefoxdriver.path,
    //     // 'port':4444
    //     // 'port': 9515
    //     'port': 80
    // },
    "test_workers": {
      "enabled": true,
      "workers": "auto"
    },
    "skip_testcases_on_fail": false,
    'test_settings': {
        'default': {
          'skip_testcases_on_fail': false,
            'screenshots': {
                'enabled': false,
                'on_failure': true,
                'on_error': true,
                'path': 'tests_output/screenshots',
            },
            'desiredCapabilities': {
                'browserName': 'chrome',
            }
        },
        "chrome" : {
            "webdriver": {
              // "server_path": "node_modules/chromedriver",
              'port':9515,
              "cli_args": [
                "--headless"
              ],
            },
            'skip_testcases_on_fail': false,
            'screenshots': {
                'enabled': true,
                'on_failure': true,
                'on_error': true,
                'path': 'tests_output/screenshots',
            },
            "desiredCapabilities" : {
              "browserName" : "chrome",
              "loggingPrefs": {"driver": "INFO", "server": "OFF", "browser": "INFO"}
            }
        },

        "firefox" : {
          'skip_testcases_on_fail': false,
            "desiredCapabilities" : {
              "os" : "Windows",
              "os_version" : "10",
              "browserName" : "Firefox",
              "browser_version" : "latest-beta",
              "browserstack.selenium_version" : "3.5.2",
            }
        },
        "safari" : {
          "desiredCapabilities" : {
            "browserName" : "safari",
            "javascriptEnabled" : true,
            "acceptSslCerts" : true
          }
        },
    }
};