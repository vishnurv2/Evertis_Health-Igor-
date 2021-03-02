// module.exports = (function(settings) {
//   console.log(settings["test_settings"]["default"]["username"])
//   settings["test_settings"]["default"]["username"] = "";
//   settings["test_settings"]["default"]["access_key"] = "";
//   settings.selenium.host = "hub.lambdatest.com";
//   return settings;
// })(require('./nightwatch.json'));

module.exports = {

  "src_folders": [
    "tests"
  ],
  "output_folder": "reports",
  "page_objects_path": "",
  "globals_path": "",

  

  "test_workers": { 
    "enabled": true,
    "workers": "auto"
  },
  "live_output": true,

  "test_settings": {
    "default": {
     
      "request_timeout_options": {
        "timeout": 1500000
      },
      "selenium_port": 80,
      "selenium_host": "hub.lambdatest.com",

      "username":"YOUR USERNAME HERE",
      "access_key":"YOUR ACCESS KEY HERE",
      "silent": false,
      "screenshots": {
        "enabled": true,
        "path": ""
      },
      "skip_testcases_on_fail": false,
      "desiredCapabilities": {
      }
    },
    "firefox": {
      "desiredCapabilities": {
        "browserName": "firefox",
        "platform": "Windows 10",
        "version": "85.0",
        "enableCustomTranslation": true,
       // "w3c" : true,
      }
  },
  
  "chrome": {
    "desiredCapabilities": {
      "browserName": "chrome",
      "platform": "Windows 10",
      "version": "latest",
      "enableCustomTranslation": true,
    },
  },
    "edge":{
      "desiredCapabilities": {
        "browserName": "MicrosoftEdge",
        "platform": "Windows 10",
        "version": "latest",
        "enableCustomTranslation": true,
      },

    }
}
}