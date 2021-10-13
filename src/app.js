const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine 
app.set('view engine','hbs')
// Setup views location
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Leon van Dyk'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Leon van Dyk'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Leon van Dyk',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {place_name, latitude, longitude} = {}) => {
        if (error) {
            return res.send({ error })
        }
        //console.log(`Place name: ${place_name}`)
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            } 
            return res.send({
                forecast: forecastData,
                location: place_name,
                address: req.query.address,
            })
        })
    })
})


//wild card matching
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Leon van Dyk',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Leon van Dyk',
        errorMessage: 'Page not found.'
    })
})

// server
app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})

