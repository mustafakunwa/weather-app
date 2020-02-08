const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/11d4d647bae57332d81186fdcd5833d1/" + latitude + ',' + longitude;

    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect darksky', undefined);
        }
        else if (body.error) {
            callback(body.error, undefined);
        }
        else {
            callback(undefined, body.currently.summary + " It is  currently " + body.currently.temperature + " degrees out. There is " + body.currently.precipProbability + "%chance of rain");
        }
    })
}


module.exports = forecast;