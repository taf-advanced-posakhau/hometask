import type { Options } from '@wdio/types'
import { bgBlue } from 'colors';
import { localRunnerConfiguration } from './localRunnerConfiguration'
import { suitesRunnerConfig } from './suitesRunnerConfiguration'


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

export const config: Options.Testrunner = {

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
        maxInstances: 5,
        'goog:chromeOptions': localRunnerConfiguration.googleChromeOptions,
        browserName: 'chrome',        
        acceptInsecureCerts: true     
    }],   
    logLevel: 'error',
    bail: 0,   
    baseUrl: 'http://localhost:8080',  
    waitforTimeout: 10000, 
    connectionRetryTimeout: 120000, 
    connectionRetryCount: 3,   
    services: ['chromedriver'],    
    framework: 'cucumber',   
    reporters: ['cucumberjs-json'],

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
            const pathToEpamLogo = [`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABOCAYAAABlsVlbAAAABmJLR0QAwgC5ALkSpM5zAAAACXBIWXMAAAs`,
                `TAAALEwEAmpwYAAAAB3RJTUUH3wEeDTABAoOYcAAADRBJREFUeNrtnXuQHEUdxz93lwR55EEIUZ6SF5cBIgHCY8BMAmY6oAixhMIqRIHSKCAikEIkFoVK5BEN`,
                `EgssoJQSgg9KJSol2mOkGKBGSEKSCzCER4BQVDhCEiGBkOTu1j+6V4fJzszu3szeXba/VVO7O9uP6Z7ft3+/7v51NxgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYG`,
                `BgYGBgYGBgYGBgYGBgYGBgYGBgY1AXhilzC5Jm3cEVheRZZprQ0e1PPRddFkWgZ4ORoAdqATwKnAIcBHwNKQBfwJvAU8BzQIz3ZU0WabQn1UpKe7I7l3Qp8Cp`,
                `gG7A9sAZYBjwFd0pOlagVTerIsSG3AEOBEnfboyPNsBl4AfOB9oLscT3oyq44qoVuXK1r24cBM4HAdby3wCLAhrf6EK1p1+JOBE4ARwCbgSWCprv9S2rMaguT`,
                `UymmhmAl8F5gCDM2I1gWsAu6VnrwjQ6AWAWfEbrcCq6UnHR1mGnA9cBKwVyUyacG4SnpyaUZ+5fK0ADcDZwETq6iKNzQRr5SefCcpD+GKzwAPVog/GDhNenKZ`,
                `JuaPgXOB8Qn5vQTMl568p6wRIsS6FLgYODZBpj4A/q7DvBuNawhSjNa4SZOjHjwDnCo9+V4loRKuWAycXSHeKunJycIVC4Ara3lk6UkvIa8yOSZqzbN3nWU6R`,
                `3ryjwl5nK41QCWcAGwFngBGVpnXD6Qnb9Bpj9dpj68y7gZgrPTkVqNBirOPfwt8qZfJrZWeHFcjQVZqYfp0jXmVtNnx74QW/nggSDGDqsX50pO/qZB+GkHuBS`,
                `4ABtWY1yyt5ebV8dwhcLT05M6BIHetff0Ath+26M/UcFq4pudADoCxwhWLa1Tzk+sgR7kRujXSx4gT/v6c3sMDwhVjauwQX1QHOQAe0uZgPaSeqE2xNJlorUY`,
                `mdnuC2H5I4Fgl2w/vS7Dl4/hHjtmfJVxxTINGWKYKV4yJElIT5gtAe46a/KoG2fYtvYw7OyPMUNsPnw4cq89JMqgPydGiybEEOEqbImnm1Qw9upOEDuBvwNv6`,
                `93BgKnBayov6rPTkijqL0KFHZzYAwwAXmJAS/lvA1bF7t6eE/wC4E1ijBxnatK3/NWBUQpwLgcvrHCnq0abYGv19qh5JqxarUCOGm4CDgC+nkOnMaB8s4VmOt`,
                `f1QBo4lmoogWmuUNcdjgKNHZFLNK+GKqSlB5ktPXhM1XSIjLLOBuxLizdR2dC39iWeAM6Un36pA5NuBbyfEPT1KEOGK0cAhCWFflZ4cG+vIlz+vA9YDH68Qbx`,
                `/hCkt6spZmdwtwi/TkvArlmQ/MSYnbrUkxS3pyQyzuXGBdQrzRVYxkdQOu7YcrgCmBY3WXZWe3NrHKBbT9cKUmR7U4KuH+dunJa6LEiJAD6cm7gX8lxD26xhb`,
                `2c9KTU6Qn34qbZvr3HOD1hPjxUaJxaaZSvIWNfJZQw8tJmFFDme7So0rzYv2i8ve5WiNUQidwsvTkKdKTG+JxpSffABbmIDKTgQ7bDwc3mhwNJUjZlrT9cITt`,
                `h501CifAoQn3H0xqjSL37kyIO6yG/FdKTz5SIe3o750prWarnogrY1RKXn5SmbQgdqImQSuhvYYy3QO8U6lM+ntJ51WxrZOefDolLsDTOYnPEcBa2w9HNLrz3`,
                `jCCRNi/uqxia8SIhPuvVxF3XQ5FyByx0YKxo8r09kz5b1NGHj3AtoQgw2sxsavoq5TqrQ/dYOSFgzVJ9mikJimcIBHNMc72wzd1QevBkF48RjcDCFUKbamAEa`,
                `b+jn2BF20/HL9bEKTcqbL98EDgZeDAXiS3O794g9pM7ZfKJCna3CqUIJoch6JmT7NUcY959wYaO6owVZfZfnh40eZWIQSJmFXH6T5CWme4E7ACx9pu5MJAN6z`,
                `bA8camtG/HAassf1wSpGapLWgAmL74WkoB7w0bASOCBxrR39wKzDoH4jIwiQtI2km91LbD88tSpO0FlEw2w9nAktSOpIALwIHBY61qUyqJsM21FBt/HrHaBCr`,
                `/LkFOAC1BiZtwOJ3th/OKEKTtOZdMNsPL0L5/qd1rJ8LHKs9cKztTaw5HkYt8IpfB6RF0vMgpWaoID3IszNwLAt4PEWTtAKe7YcX5+2/NSjHgmD74ZXAAv0Ck`,
                `8ixJHCsGfHWotmgZ8S7ssJFZ9OFK4ahFjWdhVpF2RSaRHt8T0d5RExLifJL2w/3Cxxrfl5uKYNyJMe1qIVMaZpjRZQceWpB4YqkeZIe1Oq5AQetLfYWrjgC+B`,
                `HKd6wZTa6S7YelwLGm2374qCZLEm61/fD9wLHu7BcmlibH1RFyJOFXqOWxeduJs4UrnkMtaKp0daAWWQ0UQpS/nwN4wCsol42mJEdMzkB5Tf80I/gdth/e2G9`,
                `MLOD8jP/vCRxrdpkYOZtVo0j3axpIaBeu+DrwHXq/wnB3JUlX4FhzbD/cG/hmSvALge/3F4Kk2dL3lsnRrP2NKjRGCyC1fT3Y1Ey2Jgkc6xLbDzcB1yUEzcW9`,
                `qGhfrJ8FjnWxIUdiRx2U68SrKDf1asnRDWw3JLHmkuypzUAgyBkx+9HgoxqkFfgr1Y1I9aAWN12Gctxc18x1p2VqL3bdoilXFL2isN32wxcBO3CsjUaT7ILzU`,
                `JvDpWErcBvwZ+nJ5ZpYezRzpenGdhRq77ExA5kgoNZpr7f98JDAsToLIMmf9FWP7T6kj9/1z1P+2wx8T3ryrlh/BZpkojAFo1GeGMOLzigvglxG+uqxwcDzth`,
                `9OCBxrU84kWS49+UBvO8qN3ulPuOJAYL+EvzcA7dKTm/vq+fqj1tBm1VhgBdmrQS/oF30Q/eBLyd6vaiSw0fbD6Tn3SXq1TiS6hr3BSOt3LCiTow+frz+Sw0H`,
                `tupJFjs8HjuXnIWO5TBTqz9+jJgKz/Pgftf3wSNMXYd+U/54aaJs8N4AcxwL/zLB6tgHHB471cF5WSmvOBVkOHA+8lxH8WdsPz490uPpFGRqMtD7TZkOOj5Dj`,
                `QmB5Rp3tBE4KHGtZniZ8bp30yAN1oLaleYr0XdcX2X7YFjjWfb0sUCZB9HDqyArmWIv05Nt99P7TTMMeQ47/kWMWag/hNPwHmBg4VmdMFvuPBokSJXCsELXv0`,
                `8sZIy6/tv1wbgPmSUbqju/bsasTg/5MjrmofYDT8BowpjxCmjeKNE82aE2yPiPcjbYfLqT4TRm6jegNDGhy3ARkORyuQ20s927emqNwgmhNshG1kdmqjOCzUC`,
                `dDGRhg++FQdt3HOI4ngAmBY70bOFZh80KtDWgNtgaONZnk7T+LtOUNBi7ShP4x1KbkO4p+iNYGtQig1jM8X0Dyxi28ufB44FjTgZ2NmCpoCEG0udUVONaR1O9`,
                `9mdSipJpmkTXcjSKS0WjFYUHgWE5R/Y0+I0hsdOIylO9Urfgw4f6paZH0fEJ7FSTKwj5p4fXRz20k7yFconofqn2T8ohozUFNRo4HA8e6utFe4Q0lSGTW/YvA`,
                `tTVGfyvh/nHCFZMqCW7kd5Kv1isREmVhnHDFC8IVY8vndUTz02mMJNk7tzt2jHLaqNrp8SPbynkIV1iopcSHNRE5Lg0c67xGao4y+qwVChzrFtsPe4Bbq2xZV`,
                `5N8nogUrvgG0CFc8Z5Obw9gjHDFDSnC9GSNj90OvCJc8QfgPuA14Yot2sybhJrQSqrTlbHfW1LyuVa44g3gUeGKbSjfownAV1A7mjQTrg8c6xd9tVSiL49gQ2`,
                `/PMgh9YEwGlqC8hivhE8Bi1Ax0KaYh07TkX+p8/HP0Fc0vq48TP4E2a8HTHREt08LAdanpzeDLFYFjLewLzdEnJlbc3NIkuQk1ZNeV0Zd4iJRzM7QQlW3z8pV`,
                `Wvu2oMw17W39tVZDjw7hLvvTkWvQEV4aQtDUhOXYCMwPHWti0h3jG+iSrq4xyMunbUNYCV3pyWw3hu6rQSElImhG+XJtqtaKrP7y/AuXiQ20x9PkK1AHTMmn3`,
                `7zX8//TU3uAK6cnHazwC+lngq3Xk9Sxwc8IAwv0oL9VasAV1XvtaDAxBYiM4aFPlGN1prxUvA0J6cmEd6y1apCcXAUeiTrqtBg9LT05CjWDtUh59b1qV6XWhN`,
                `pI7GLWibnCKWRY3PdPM0nqtjGq014CfExpQKjpCkpXCFcdpYbkEtflB0iGfG1HzLrcBa6Unt/dmMZL05PPCFSeizgKfgxpZiq5w6wYWATdkdcT1c7wvXHECar`,
                `HZD4G4WlsP3I1av75R10EbavRvZIUGryN2bw3qtNpKjWPWQEE38BNg/wpx11RRXR0JeRu/uz4yw/YSrhiur30qCWQVaSwWrihVuFYmpSNc0arzHFJrfgnp7ak`,
                `3qiaP9Io0e+t9hvg8Un+FcYuoQBDg7Ap/rZKenGxqyPRBDAwMDEEMDAxBDAwMQQwMDEEMDAxBDAwMQQwMDEEMDAxBdk8kud+Yo9GMMBgA89h1q8sW1PaWBgbN`,
                `i2r8hwwMDAwMDAwMDAwMeoX/AvIUC7QuAK91AAAAAElFTkSuQmCC`].join('');
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
}
