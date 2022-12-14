import { API_AUTHORIZATION_TOKEN, HOST } from '../../core_layer/tokens/api_token';
export class Api_login_sequence {

  public getAPItoken = async () : Promise <any> => {

        return new Promise ((resolve, reject)=>{
          const axios = require('axios');
 
          let config = {
            method: 'get',
            url: `http://${HOST}:8080/uat/sso/me/apitoken`,
            headers: { 
              'Host': `${HOST}:8080`, 
              'Connection': 'keep-alive', 
              'sec-ch-ua': '"Not-A.Brand";v="99", "Opera GX";v="91", "Chromium";v="105"', 
              'Accept': 'application/json, text/plain, */*', 
              'Authorization': `bearer ${API_AUTHORIZATION_TOKEN}`, 
              'sec-ch-ua-mobile': '?0', 
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 OPR/91.0.4516.106', 
              'sec-ch-ua-platform': '"Windows"', 
              'Sec-Fetch-Site': 'same-origin', 
              'Sec-Fetch-Mode': 'cors', 
              'Sec-Fetch-Dest': 'empty', 
              'Referer': `http://${HOST}:8080/ui/`, 
              'Accept-Encoding': 'gzip, deflate, br', 
              'Accept-Language': 'en-US,en;q=0.9', 
              'Cookie': '_ga=GA1.1.1392687408.1667470479; _gid=GA1.1.997938312.1667470479; _gat=1'
            }
          };
          
            axios(config)
            .then((response) => {
              // console.log(JSON.stringify(response.data));
              resolve (response.data.access_token);
             })
            .catch((error) => {
              console.log(error);
            });
        });
  }

    }
