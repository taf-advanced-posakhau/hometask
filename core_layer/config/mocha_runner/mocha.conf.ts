import type { Options } from '@wdio/types'


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
        './test/specs/**/*.ts'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
  
    maxInstances: 10,
  
    capabilities: [{          
        maxInstances: 5,        
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
    
    framework: 'mocha',
    
    reporters: ['spec'],

  

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
