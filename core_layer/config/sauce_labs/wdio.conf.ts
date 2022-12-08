const SAUCE_USERNAME = `oauth-taf.advanced.posakhau-fd38a`;
const SAUCE_ACCESS_KEY = `bf9d4626-8617-4a25-b155-f5e3a9398d8a`;

const RpService = require("wdio-reportportal-service");
const { Reporter } = require('@reportportal/agent-js-webdriverio');

const rpConfig = {
    token: '8dea83a4-ddcf-4810-b255-9821af48c9ce',
    endpoint: 'http://localhost:8080/api/v1',
    project: 'default_personal',
    launch: 'default_TEST_EXAMPLE',
    mode: 'DEFAULT',
    debug: false,
    description: "Static launch description",
    attributes: [{ key: 'key', value: 'value' }, { value: 'value' }],
    attachPicturesToLogs: true,

    reportSeleniumCommands: true, // add selenium commands to log
    seleniumCommandsLogLevel: 'debug', // log level for selenium commands
    autoAttachScreenshots: true, // automatically add screenshots
    screenshotsLogLevel: 'info', // log level for screenshots
    parseTagsFromTestTitle: true, // parse strings like `@foo` from titles and add to Report Portal
    cucumberNestedSteps: false, // report cucumber steps as Report Portal steps
    autoAttachCucumberFeatureToScenario: true, // requires cucumberNestedSteps to be true for use
    sanitizeErrorMessages: true, // strip color ascii characters from error stacktrace
    sauceLabOptions : {
        enabled: true, // automatically add SauseLab ID to rp tags.
        sldc: "US" // automatically add SauseLab region to rp tags.
    }
};



import type { Options } from '@wdio/types'
import { bgBlue, yellow } from 'colors';
import { localRunnerConfiguration } from './../localRunnerConfiguration'
import { headlessRunnerConfiguration } from './../headlessRunnerConfiguration'
import { suitesRunnerConfig } from './../suitesRunnerConfiguration'
import { PATH_LOGO } from '../../constants/constants';

console.log ( yellow ( `Executing in SAUCE LABS. ` ));

let stepNumber = 1;
let startTime;

const rimraf = require('rimraf');
const { removeSync } = require('fs-extra');
const fs = require('fs');
const htmlReporter = require('cucumber-html-reporter');
const { generate } = require('multiple-cucumber-html-reporter');
const cucumberJson = require('wdio-cucumberjs-json-reporter').default;

const pathToJsonReportsDir = `.tmp/json`;
const pathToTestReportsDir = 'core_layer/reporter/test_reports/test_artifacts/trr/';
const pathToHtmlReportDir = `${pathToTestReportsDir}html/`;
const pathToHtmlReport = `${pathToHtmlReportDir}cucumber_report.html`;
const pathToCucumberJsonReport = `${pathToJsonReportsDir}cucumber_report.json`;

let options = {
    theme: 'bootstrap',
    jsonDir: `${pathToJsonReportsDir}`,
    output: `${pathToHtmlReport}`,
    screenshotsDirectory: 'screenshots/',
    storeScreenshots: true,
    ignoreBadJsonFile: true,
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    name: 'Test results : WebdriverIO',
    brandTitle: 'TAF ADVANCED',
    metadata: {},
    format: [
        `json:${pathToCucumberJsonReport}`
    ]
};

let environmentRunnerOptions = null;
if (process.env.runType == 'headless') { 
    environmentRunnerOptions = headlessRunnerConfiguration;    
} else {
    environmentRunnerOptions = localRunnerConfiguration;    
}

export const config = {   
    user: SAUCE_USERNAME,
    key: SAUCE_ACCESS_KEY,
    region: 'eu', // or 'eu' or 'apac'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {}
        }], 
        [RpService, {}]
    ],
        autoCompileOpts: {
        autoCompile: true,      
        tsNodeOpts: {
            transpileOnly: true,
            project: 'core_layer/config/tsconfig.json'
        }     
    },   
    specs: [
        '.test_layer/features/**/*.feature'
    ],
    suites: suitesRunnerConfig,  
    exclude: [
        // 'path/to/excluded/files'
    ],   
    maxInstances: 10,  
    capabilities: [{
        maxInstances:1,  
        'goog:chromeOptions': environmentRunnerOptions.googleChromeOptions,
        browserName: 'chrome',
        acceptInsecureCerts: true,       
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options
        'sauce:options': {
            tunnelIdentifier: 'oauth-taf.advanced.posakhau-fd38a_tunnel_name',            
            build: 'Localhost tunnel',
            screenResolution: '1920x1080',            
        },      
    }],   
    logLevel: 'error',
    bail: 0,   
    baseUrl: 'http://localhost:8080',  
    waitforTimeout: 10000, 
    connectionRetryTimeout: 120000, 
    connectionRetryCount: 3,       
    framework: 'cucumber',   
    reporters: [[Reporter, rpConfig] ,'cucumberjs-json'],

    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        require: ['./business_layer/step_definitions/**/**.ts'],
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <boolean> hide step definition snippets for pending steps
        format: [`json:${pathToCucumberJsonReport}`, require.resolve('cucumber-pretty')],
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: '',
        // <number> timeout for step definitions
        timeout: 60000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    },
    onPrepare() {
        rimraf.sync(`./Results*`);
        rimraf.sync(`./reports*`);
        rimraf.sync(`${pathToJsonReportsDir}*`);
        rimraf.sync(`${pathToHtmlReportDir}*`);       
        const date = new Date();
        startTime = date.getTime();
        require('ts-node').register({
            project: 'core_layer/config/tsconfig.json'
        });
    },

     beforeStep: function (step, scenario, context) {
        console.log(bgBlue(`Executing step No ${stepNumber} :: ${step.text}`));
        stepNumber++;
    },
   
     onComplete() {
        console.log(`STARTED AFTER SESSION HOOK ...................................... `);
        generate({         
            jsonDir: pathToJsonReportsDir,
            reportPath: 'core_layer/reporter/test_reports/test_artifacts/trr/html',
           
        });

        const date1 = new Date();
        const endTime = date1.getTime();
        const totalTime = endTime - startTime;
        const h = Math.floor(totalTime / (60 * 60 * 1000));
        const m = Math.floor((totalTime % (60 * 60 * 1000)) / (60 * 1000));
        const s = Math.floor((totalTime % (60 * 1000)) / 1000);
        const time = `${h} hour(s), ${m} minutes, ${s} seconds`;

        options.metadata = {
            'Total Test(s) Execution Time': time
        };
        htmlReporter.generate(options, () => {
            console.log(`STARTED REPORT GENERATION ...................................... `);
            rimraf.sync(`${pathToJsonReportsDir}*`);
        });

        if (fs.existsSync(pathToHtmlReport)) {
            let originalReport = fs.readFileSync((pathToHtmlReport), { encoding: 'utf-8' }).toString().split('\n');
            const pathToEpamLogo = PATH_LOGO.join('');
            const htmlCodeForEpamLogo = [`<a href=""><img class="navbar-header"
                  width="158" height="56" src="${pathToEpamLogo}" alt="EPAM Logo"/></a>`].join('');

            originalReport.splice(278, 0, htmlCodeForEpamLogo);
            const modTrr = originalReport.join('\n');
            fs.writeFileSync(pathToHtmlReport, modTrr, function (err) {
                if (err) {
                    console.log(err);
                    return fs.closeSync(fs.openSync(pathToHtmlReport, 'w'));
                }
                return fs.closeSync(fs.openSync(pathToHtmlReport, 'w'));
            });
        }
    },
};

