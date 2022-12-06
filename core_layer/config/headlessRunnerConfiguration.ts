const path = require('path');
const fs= require('fs')
// const RpService = require("wdio-reportportal-service");
import { HOST } from '../../core_layer/tokens/api_token';




export const headlessRunnerConfiguration = {
    hostname : `${HOST}`,
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