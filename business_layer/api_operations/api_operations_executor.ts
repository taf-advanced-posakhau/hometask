export class Api_operations_executor {


    public createDashboard = async ( name : string , token : string) : Promise <any> => {
      return new Promise (( resolve, reject ) => {

        const axios = require('axios');
        let data = JSON.stringify({
          "description": `${name}`,
          "name": `${name}`,
          "share": true
        });
        
        let config = {
          method: 'post',
          url: `http://localhost:8080/api/v1/DEFAULT_PERSONAL/dashboard`,
          headers: { 
            'accept': '*/*', 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          data : data
        };
        
        axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          resolve (response.data)
        })
        .catch((error) => {
          console.log(error);
        });

      });
    
      
    }

    public getDashboardsList = async ( token : string ) : Promise <any> => {

      return new Promise ((resolve , reject ) => { 

        const axios = require('axios');

        let config = {
          method: 'get',
          url: 'http://localhost:8080/api/v1/DEFAULT_PERSONAL/dashboard/shared',
          headers: { 
            'accept': '*/*', 
            'Authorization': `Bearer ${token}`
          }
        };
        
        axios(config)
        .then((response) => {
          //  console.log(JSON.stringify(response.data));
          resolve ( response.data )
        })
        .catch((error) => {
          console.log(error);
        }); 
       })
    }  
    
    public updateDashboard = async ( token : string, dashboardID : string, newDashboardName : string ) : Promise <any> => {
      return new Promise ( ( resolve , reject ) => {
        const axios = require('axios');
        let data = JSON.stringify({
          "description": "string",
          "name": `${newDashboardName}`,
          "share": true,
          "updateWidgets": [
            {
              "share": true,
              "widgetId": 0,
              "widgetName": "string",
              "widgetOptions": {},
              "widgetPosition": {
                "positionX": 0,
                "positionY": 0
              },
              "widgetSize": {
                "height": 0,
                "width": 0
              },
              "widgetType": "string"
            }
          ]
        });
        
        let config = {
          method: 'put',
          url: `http://localhost:8080/api/v1/DEFAULT_PERSONAL/dashboard/${dashboardID}`,
          headers: { 
            'accept': '*/*', 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          data : data
        };
        
        axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          resolve(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
        
      });
    }

    public deleteDashboard = async ( token : string, dashboardID : string ) : Promise <any> => {
        return new Promise ( ( resolve , reject ) => {
          const axios = require('axios');

          let config = {
            method: 'delete',
            url: `http://localhost:8080/api/v1/DEFAULT_PERSONAL/dashboard/${dashboardID}`,
            headers: { 
              'accept': '*/*', 
              'Authorization': `Bearer ${token}`
            }
          };
          
          axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            resolve(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
          
        });
    }

}