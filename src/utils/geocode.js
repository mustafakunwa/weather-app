const request = require('request');



const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibXVzdGFmYWt1bndhIiwiYSI6ImNrNW84ZHJ1bjAzazkza3Fqdjg5OHY1YXUifQ.lwLzcI2kt5UE836cKrA-Rg&limit=1"
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        }
        else if (body.error) {
            callback(body.error, undefined);
        }
        else if (body.features.length == 0) {
            callback('No results found, Try another search', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;