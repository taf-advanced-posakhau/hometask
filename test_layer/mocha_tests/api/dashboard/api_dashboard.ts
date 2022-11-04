import { Api_operations_executor } from '../../../../business_layer/api_operations/api_operations_executor';
import { Api_login_sequence } from '../../../../business_layer/api_operations/api_login_sequence';
import { assertEqualValues } from '../../../../core_layer/utilities/assertions';
import { yellow } from 'colors';
const randomWords = require('random-words');


const api_operations_executor : Api_operations_executor = new Api_operations_executor();
const api_login_sequence : Api_login_sequence = new Api_login_sequence();


describe('creates new dashboard', async () => {  
    
    let arrayNames = [];
    let dashboardName = randomWords();

    it('should create new dashboard and verify that dashbord was created', async () => {            
        let api_token = await api_login_sequence.getAPItoken();
        console.log ( `RETRIEVED API TOKEN - ${yellow(api_token)}`);
        let dashboardID = await api_operations_executor.createDashboard(dashboardName,api_token);        

        let dashboardsArray = await api_operations_executor.getDashboardsList(api_token); 
        for ( let element of dashboardsArray.content) {
            arrayNames.push (element.name)
        }
        console.log(`Dashboard ${yellow(dashboardName)}  with ID ${await dashboardID.id} created successfully.`);     
        await assertEqualValues ( arrayNames.includes( dashboardName ) , true );
    });
});


describe('updating existing dashboard', async () => {   

    let dashboardToUpdate = randomWords();
    let updatedDashboard = `${randomWords()} updated`;
    let arrayNames = [];

    it('should update already existing dashboard', async () => {            
        let api_token = await api_login_sequence.getAPItoken();
        console.log ( `RETRIEVED API TOKEN - ${yellow(api_token)}`);

        let dashboardID = await api_operations_executor.createDashboard(dashboardToUpdate,api_token);    
        console.log(`Dashboard for update ${yellow(dashboardToUpdate)}  with ID ${await dashboardID.id} created successfully.`);    
        
        await api_operations_executor.updateDashboard ( api_token, dashboardID.id , updatedDashboard );

        let dashboardsArray = await api_operations_executor.getDashboardsList(api_token); 
        for ( let element of dashboardsArray.content) {
            arrayNames.push (element.name)
        }        
               
        await assertEqualValues ( arrayNames.includes( updatedDashboard ) , true );
        
    });
});


describe('removing existing dashboard', async () => {   

    let arrayNames = [];
    let dashboardName = randomWords();

    it('should remove already existing dashboard and verify that dashbord was removed', async () => {            
        let api_token = await api_login_sequence.getAPItoken();
        console.log ( `RETRIEVED API TOKEN - ${yellow(api_token)}`);

        let dashboardID = await api_operations_executor.createDashboard(dashboardName,api_token);     
        console.log(`Dashboard for deletion ${yellow(dashboardName)}  with ID ${await dashboardID.id} created successfully.`);     

        await api_operations_executor.deleteDashboard ( api_token, dashboardID.id );

        let dashboardsArray = await api_operations_executor.getDashboardsList(api_token); 
        
        for ( let element of dashboardsArray.content) {
            arrayNames.push (element.name)
        }
        await assertEqualValues ( arrayNames.includes( dashboardName ) , false );
    });
});
