const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Path for Config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup for static directory
app.use(express.static(publicDir));

//Setup for handlebar 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Home',
        name: 'Mustafa kunwa'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Mustafa kunwa'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Mustafa kunwa',
        message: 'This is help message please look into it.....'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address',
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error)
            return res.send({
                error,
            })

        forecast(latitude, longitude, (error, forecastData) => {
            if (error)
                return res.send({
                    error,
                })
            res.send({
                location,
                address: req.query.address,
                forecast: forecastData,
            });
        })
    })


});

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide search term',
        })
    }
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Mustafa kunwa',
        message: 'Help article not found',
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Mustafa kunwa',
        message: 'Page Not Found',
    })
})
app.listen(port, () => {
    console.log('Server running on port ' + port);
});