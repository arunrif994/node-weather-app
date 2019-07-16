const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Arun Prabhu'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Arun Prabhu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Arun Prabhu',
        helpText: 'This is some helpful Text.'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address)
        return res.send({
            error: 'Address must be provided!'
        })
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error });
        forecast(latitude, longitude, (error, forecast) => {
            if (error) return res.send({ error });
            res.send({ forecast, location, address })
        })
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg: 'Help Article Not Found',
        name: 'Arun Prabhu'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg: 'Page Not Found',
        name: 'Arun Prabhu'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})