const request = require('request');

const geocode = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiYXJ1bjk5NCIsImEiOiJjankxcHF4YmEwNW5xM2d1bWt5enJwMmx2In0.cJjW8b5gCbXtbs_BwUGqXg&limit=1`;
    request({ url, json: true }, (err, { body } = {}) => {
        let errMsg, location;
        if (err) errMsg = 'Unable to connect to the location service.';
        else if (body.features.length === 0 ) errMsg = 'Unable to find location. Try another search';
        else {
            const {center: pos, place_name} = body.features[ 0 ];
            location = { latitude: pos[ 1 ], longitude: pos[ 0 ], location: place_name };
        }
        callback(errMsg, location);
    })
}

module.exports = geocode;