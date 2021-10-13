const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const key = '62c9af6f96c885b3071867d2beb72ec9'
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}&units=m`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out.")
        }        
    } )
}

module.exports = forecast
