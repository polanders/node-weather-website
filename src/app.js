const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Weather getter',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'the name',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'the name',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help',
    errorMessage: 'Help article not found'
  });
});

app.get('/weather', (req, res) => {

  debugger

  const { address } = req.query;
  if (!address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  geocode(address, (
    error,
    {
      location,
      latitude,
      longitude,
    } = {}
  ) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, { forecast } = {}) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast,
        location,
        address: req.query.address,
      });
    })
  });
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  res.send({
    products: [],
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Not found',
    errorMessage: 'Page not found'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
