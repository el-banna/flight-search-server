const express = require('express');
const countryCodeToName = require("./iso-countries");
const airports = Object.values(require('./airports.json')).map(airport => {
  airport.country = countryCodeToName[airport.country];
  return airport;
});
const app = express()
const port = 1337

app.get('/airports', (req, res) => {
  const query = req.query.query;
  if (!query) return res.json([]);

  const pattern = new RegExp(query, 'i')
  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.json(airports.filter(airport =>
    pattern.test(airport.name) ||
    pattern.test(airport.city) ||
    pattern.test(airport.iata)
  ));
});

app.listen(port, () => console.log(`App listening on port ${port}!`))