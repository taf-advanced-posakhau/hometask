const path = require('path');
const fs= require('fs')
// const RpService = require("wdio-reportportal-service");

const downloadPath = path.join(__dirname, './../files/downloads'); 

export const localRunnerConfiguration = {
    hostname : 'localhost',
    port : 4444,
    servicesObject : ['chromedriver'],
    googleChromeOptions : {
        prefs: {
            'download.default_directory': downloadPath
        },
        args: ['--window-size=1920,1080', '--no-sandbox' , "--disable-gpu"],
       
    }
}

module.exports = {
    localRunnerConfiguration
}