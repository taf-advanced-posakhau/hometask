var axios = require('axios');

export class API_Slack_Notifier {
    public PostSlackNotification = async ( value : string ) : Promise <void> => {
       
        var data = JSON.stringify({
            "text": `${value}`
        });

        var config = {
        method: 'post',
        url: 'https://hooks.slack.com/services/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',
        headers: { 
            'Content-type': 'application/json'
        },
            data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });
    }
}