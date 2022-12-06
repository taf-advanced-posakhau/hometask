import { Api_operations_executor } from '../../../../business_layer/api_operations/api_operations_executor';
import { Api_login_sequence } from '../../../../business_layer/api_operations/api_login_sequence';
import { assertEqualValues } from '../../../../core_layer/utilities/assertions';
import { yellow } from 'colors';
const randomWords = require('random-words');
import { API_Slack_Notifier } from '../../../../business_layer/api_operations/api_slack_notifier';
const api_slack_notifier : API_Slack_Notifier = new API_Slack_Notifier();

const api_operations_executor : Api_operations_executor = new Api_operations_executor();
const api_login_sequence : Api_login_sequence = new Api_login_sequence();

describe('creates new widget', async () => {  
    
    let arrayNames = [];
    let widgetName = randomWords();

    it('should create new widget and verify that widget was created', async () => {            
        let api_token = await api_login_sequence.getAPItoken();
        console.log ( `RETRIEVED API TOKEN - ${yellow(api_token)}`);
        
        let widgetID = await api_operations_executor.createNewWidget( api_token , widgetName );        

        let widgetsArray = await api_operations_executor.getWidgetsList(api_token); 
        for ( let element of widgetsArray.content) {
            arrayNames.push (element)
        }
       
        console.log(`Widget ${yellow(widgetName)}  with ID ${await widgetID.id} created successfully.`);     
        await assertEqualValues ( arrayNames.includes( widgetName ) , true );
        await api_operations_executor.deleteWidget ( api_token , widgetID.id );        
    });
    
});



describe('modify widget', async () => {  
    
    let arrayNames = [];
    let widgetName = randomWords();
    let modifiedWidget = `${randomWords()}_updated`;

    it('should create new widget and then modify it. then verify that widget was modified', async () => {            
        let api_token = await api_login_sequence.getAPItoken();
        console.log ( `RETRIEVED API TOKEN - ${yellow(api_token)}`);
        
        let widgetID = await api_operations_executor.createNewWidget( api_token , widgetName );       
        console.log(`Widget for modifying ${yellow(widgetName)}  with ID ${await widgetID.id} created successfully.`);
        
        await api_operations_executor.modifyWidget ( api_token ,await widgetID.id , modifiedWidget );

        let widgetsArray = await api_operations_executor.getWidgetsList(api_token); 
        for ( let element of widgetsArray.content) {
            arrayNames.push (element)
        }
         
        await assertEqualValues ( arrayNames.includes( modifiedWidget ) , true );
        await api_operations_executor.deleteWidget ( api_token , widgetID.id );        
    });
    
});


describe('delete widget', async () => {  
   
    let arrayNames = [];
    let widgetName = randomWords();

    it('should create new widget, delete it and verify that widget was deleted', async () => {            
        let api_token = await api_login_sequence.getAPItoken();
        console.log ( `RETRIEVED API TOKEN - ${yellow(api_token)}`);
        
        let widgetID = await api_operations_executor.createNewWidget( api_token , widgetName );   
        console.log(`Widget for deletion ${yellow(widgetName)}  with ID ${await widgetID.id} created successfully.`);     
        
        await api_operations_executor.deleteWidget ( api_token , widgetID.id );

        let widgetsArray = await api_operations_executor.getWidgetsList(api_token); 
        for ( let element of widgetsArray.content) {
            arrayNames.push (element)
        }
        
        await assertEqualValues ( arrayNames.includes( widgetName ) , false );
    });
    
});