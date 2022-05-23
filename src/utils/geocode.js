const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmF6aW11bGhvcXVlIiwiYSI6ImNreDN6aDVoYzFkc2gydXBuMnExN2FkaGEifQ.VYaNNU2UiALxRIN4Zt_reg&limit=1'
    request({url: url, json: true}, (e, response)=>{

        if(e){
            callback('unable to connect to location services', undefined)
        }else if (response.body.features.length === 0){
            callback('unable to find address, try something else', undefined)
        }else{
            callback(undefined, {
                longitude : response.body.features[0].center[0],
                latitude  : response.body.features[0].center[1],
                place     : response.body.features[0].place_name
            })
        }

    })

}


module.exports = geocode