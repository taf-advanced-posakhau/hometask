const path = require('path');
const fs= require('fs')
// const RpService = require("wdio-reportportal-service");



export const headlessRunnerConfiguration = {
    hostname : 'localhost',
    port : 4444,
    servicesObject : ['chromedriver'],
    googleChromeOptions : {        
        // args: ['--window-size=1920,1080', '--no-sandbox' , "--disable-gpu"],
        args: ["--headless", '--window-size=1920,1080', '--no-sandbox' , "--disable-gpu"],
       
    }
}

module.exports = {
    headlessRunnerConfiguration
}