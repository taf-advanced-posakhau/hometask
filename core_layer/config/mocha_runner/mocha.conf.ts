import type { Options } from '@wdio/types'
import { yellow } from 'colors';
const rimraf = require('rimraf');
import { headlessRunnerConfiguration } from '../headlessRunnerConfiguration'
import { HOST } from '../../tokens/api_token';
import { API_Slack_Notifier } from '../../../business_layer/api_operations/api_slack_notifier';

const api_slack_notifier : API_Slack_Notifier = new API_Slack_Notifier();
 
console.log ( yellow ( `Executing mocha runner. Solution executing in ${process.env.parallel} flows in headless mode. ` ));

let executePath = `test_layer/mocha_tests/specs/**/*.ts`;
if (process.env.suite == 'api') {
    executePath = `test_layer/mocha_tests/api/**/*.ts`
}

export const config: Options.Testrunner = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    //
    // =====================
    // ts-node Configurations
    // =====================
    //
    // You can write tests using TypeScript to get autocompletion and type safety.
    // You will need typescript and ts-node installed as devDependencies.
    // WebdriverIO will automatically detect if these dependencies are installed
    // and will compile your config and tests for you.
    // If you need to configure how ts-node runs please use the
    // environment variables for ts-node or use wdio config's autoCompileOpts section.
    //

    autoCompileOpts: {
        autoCompile: true,     
        tsNodeOpts: {
            transpileOnly: true,
            project: 'core_layer/config/tsconfig.json'
        }     
    },
   
    specs: [
        executePath
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
  
    maxInstances: 10,
  
    capabilities: [{          
        maxInstances: parseInt(process.env.parallel),            
        browserName: 'chrome',
        'goog:chromeOptions': headlessRunnerConfiguration.googleChromeOptions,
        acceptInsecureCerts: true   
    }],
    
    logLevel: 'error',
    
    bail: 0,
    
    baseUrl: `http://${HOST}:8080`,
   
    waitforTimeout: 10000,
    
    connectionRetryTimeout: 120000,
    
    connectionRetryCount: 3,
    
    services: ['chromedriver'],    
    
    framework: 'mocha',
    
    reporters: ['spec',
        ['mochawesome', {
            outputDir: 'reports/json/',
            outputFileFormat: (opts: any) => {
                return `results.json`
            }
        }]
    ],
 

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        mochawesomeOpts: {
            includeScreenshots: true,
            screenshotUseRelativePath: true
        },
    },

    beforeTest: async function (test) {
        await api_slack_notifier.PostSlackNotification ( `Execution of feature - ${test.parent} - has been started.` );       
    },

    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        await api_slack_notifier.PostSlackNotification ( `Execution of feature - ${test.parent} - has been finished.` );
        if (!passed) {
            await browser.takeScreenshot();
        }
    },

    onPrepare() {
        rimraf.sync(`./Results*`);
        rimraf.sync(`./reports*`);
    },

    onComplete: function (exitCode, config, capabilities, results) {
        // const mergeResults = require('wdio-mochawesome-reporter/mergeResults')
        // mergeResults('./reports/json/*', "results-*");
    },
}
