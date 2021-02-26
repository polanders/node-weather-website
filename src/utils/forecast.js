const request = require('request')

const forecast = (latitude, longitude, callback) => {

    // e.g. http://api.weatherstack.com/current?access_key=b5cfbb6774b5c68fefc980467ac50dc2&query=53.592262,-6.184537

    const url = `http://api.weatherstack.com/current?access_key=b5cfbb6774b5c68fefc980467ac50dc2&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const { current } = body;
            callback(undefined, {
                forecast: `It is currently ${current.temperature} degress out. There is a ${current.precip}% chance of rain.`,
            });
        }
    })
}

module.exports = forecast