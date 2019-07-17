const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/3972d817ff616b09e7477874c84972ce/${ latitude },${ longitude }?units=si`;
    request({ url, json: true }, (err, { body } = {}) => {
        let errMsg, forecastMsg;
        if (err) errMsg = 'Unable to connect to weather service.';
        else if (body.error) errMsg = 'Unable to find location';
        else {
            const { currently, daily } = body;
            const dataDaily = daily.data;
            const { temperature, precipProbability, summary } = currently;
            forecastMsg = `${summary}. ${ dataDaily[ 0 ].summary } It is currently ${ temperature } degrees out. There is a ${ precipProbability }% chance of rain`;
        }
        callback(errMsg, forecastMsg);
    })
}

module.exports = forecast;