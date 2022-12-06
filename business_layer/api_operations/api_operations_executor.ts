import { red } from "colors";
import { API_AUTHORIZATION_TOKEN, HOST } from "../../core_layer/tokens/api_token";

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
          url: `http://${HOST}:8080/api/v1/DEFAULT_PERSONAL/dashboard`,
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
          url: `http://${HOST}:8080/api/v1/DEFAULT_PERSONAL/dashboard/shared`,
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
          url: `http://${HOST}:8080/api/v1/DEFAULT_PERSONAL/dashboard/${dashboardID}`,
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
            url: `http://${HOST}:8080/api/v1/DEFAULT_PERSONAL/dashboard/${dashboardID}`,
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

    public createNewWidget = async ( token : string , name : string ) : Promise <any> => {

        return new Promise ( ( resolve , reject ) => {
         
          const axios = require('axios');
          let data = JSON.stringify({
  "widgetType": "statisticTrend",
  "contentParameters": {
    "contentFields": [
      "statistics$executions$total",
      "statistics$executions$passed",
      "statistics$executions$failed",
      "statistics$executions$skipped",
      "statistics$defects$product_bug$pb001",
      "statistics$defects$automation_bug$ab001",
      "statistics$defects$system_issue$si001",
      "statistics$defects$no_defect$nd001",
      "statistics$defects$to_investigate$ti001"
    ],
    "itemsCount": "50",
    "widgetOptions": {
      "zoom": false,
      "timeline": "launch",
      "viewMode": "area-spline"
    }
  },
  "filters": [
    {
      "value": "114",
      "name": "api_tests"
    }
  ],
  "name": `${name}`,
  "description": "",
  "share": true,
  "filterIds": [
    "114"
  ]
          });

let config = {
  method: 'post',
  url: `http://${HOST}:8080/api/v1/api/widget/`,
  headers: { 
    'Accept': 'application/json, text/plain, */*', 
    'Accept-Language': 'en-US,en;q=0.9', 
    'Authorization': `bearer ${token}`, 
    'Connection': 'keep-alive', 
    'Content-Type': 'application/json', 
    'Cookie': '_ga=GA1.1.1710169005.1667724095; _gid=GA1.1.1487771043.1667724095; _gat=1', 
    'Origin': `http://${HOST}:8080`, 
    'Referer': `http://${HOST}:8080/ui/`, 
    'Sec-Fetch-Dest': 'empty', 
    'Sec-Fetch-Mode': 'cors', 
    'Sec-Fetch-Site': 'same-origin', 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 OPR/92.0.0.0', 
    'sec-ch-ua': '"Chromium";v="106", "Not.A/Brand";v="24", "Opera";v="92"', 
    'sec-ch-ua-mobile': '?0', 
    'sec-ch-ua-platform': '"Windows"'
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

    public getWidgetsList = async ( token : string ) : Promise <any> => {

        return new Promise ((resolve , reject ) => { 
          const axios = require('axios');

          let config = {
            method: 'get',
            url: `http://${HOST}:8080/api/v1/api/widget/names/all`,
            headers: { 
              'accept': '*/*', 
              'Authorization': `bearer ${API_AUTHORIZATION_TOKEN}`
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
          
        })
    }

    public modifyWidget = async ( token : string, widgetID : string, newWidgetName : string ) : Promise <any> => {

      return new Promise ( ( resolve , reject ) => {
        const axios = require('axios');
        let data = JSON.stringify({
          "contentParameters": {
            "contentFields": [
              "string"
            ],
            "itemsCount": 5,
            "widgetOptions": {}
          },
          "description": "string",
          "filterIds": [
            0
          ],
          "name": `${newWidgetName}`,
          "share": true,
          "widgetType": "oldLineChart"
        });
        
        let config = {
          method: 'put',
          url: `http://${HOST}:8080/api/v1/api/widget/${widgetID}`,
          headers: { 
            'accept': '*/*', 
            'Content-Type': 'application/json', 
            'Authorization': `bearer ${token}`
          },
          data : data
        };
        
        axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          resolve (response.data);
        })
        .catch((error) => {
          console.log(error);
        });
        
      });
    }

    public deleteWidget = async ( token : string, widgetID : string ) : Promise <any> => {
      return new Promise ( ( resolve , reject ) => {

        const axios = require('axios');

        let config = {
          method: 'delete',
          url: `http://${HOST}:8080/api/v1/api/dashboard/113/${widgetID}`,
          headers: { 
            'accept': '*/*', 
            'Authorization': `bearer ${token}`
          }
        };
        
        axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          console.log ( red ( `....... widget ${widgetID} was deleted.` ) );
          resolve ( response.data );
        })
        .catch((error) => {
          console.log(error);
        });
      });
    }

}