
const request = require('request')


// const url = 'http://api.weatherstack.com/current?access_key=f20b29d7d591508720d0968caaebff29&query=37.8267,-122.4233'

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f20b29d7d591508720d0968caaebff29&query='+lat+','+long+'&units=f'

    request({url: url, json: true},(error, response)=>{


        if(error){
            callback("Could not make request :"+error, undefined)
        }else if (response.body.error){
            callback("youre request failed with these coordinates ("+lat+","+long+"), try again with a different long lat :"+ response.body, undefined)
        }else{
            //         //because json option is set to true, the response object is a json object 
        //console.log(response.body.current)
            callback(undefined, {
            temp : response.body.current.temperature,
            rain : response.body.current.precip,
            feelslike : response.body.current.feelslike,
            description : response.body.current.weather_descriptions
            })
        }

    })

    
}



module.exports = forecast