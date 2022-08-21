const request = require("request");

const forecast =(latitude,longititude,callback)=>{

    const url = "http://api.weatherstack.com/current?access_key=26a40455f8db3da1d1e63b2b288104f0&query="+ latitude+","+longititude+"&units=m"


    request({url:url,json:true},(error,response)=>{

        if (error) {

            callback("unable to connect to the location required", undefined)
        }
        else if (response.body.error) {

            callback("no data returned", undefined)

        }
        else {
            callback(undefined,response.body.current.weather_descriptions+ " the temperature is "+ response.body.current.temperature + " and it feels like " + response.body.current.feelslike)

        }

    })
}
module.exports = forecast;