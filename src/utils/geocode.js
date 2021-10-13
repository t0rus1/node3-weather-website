const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidDBydXMxIiwiYSI6ImNrdWU0OXBwNDFneWoydW1vZ2FwajRxZWwifQ.RQf4bewhghLx-s0jMbrh4g&limit=1'

    request({ url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('unable to connect to location services', undefined)            
        } else if (body.features.length === 0) {
            callback('unable to find location. Try another search.', undefined)
        } else {
            const {features} = body
            const [longitude, latitude] = features[0].center
            const {place_name} = features[0]
            //const msg = `${place_name}; latitude = ${latitude} Longitude = ${longitude}`
            callback(undefined, {
                latitude,
                longitude,
                place_name
            })
        }
    })

}

module.exports = geocode