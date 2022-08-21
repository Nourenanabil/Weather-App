
const request = require("request");

const geocode = (address, callback) => {

    const geoCodeUrl = "https://api.geoapify.com/v1/geocode/search?text=" + encodeURIComponent(address) + "&apiKey=364fbfb98f95479ca2401b7df6c61d44";

    request({ url: geoCodeUrl, json: true }, (error, response) => {

        if (error) {

            callback("unable to connect to the location required", undefined)
        }
        else if (!response.body.features) {

            callback("no data returned", undefined)

        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].properties.lat,
                longititude: response.body.features[0].properties.long,
                city: response.body.features[0].properties.city,
                country: response.body.features[0].properties.country
            });

        }
    });


}
module.exports =  geocode;  
