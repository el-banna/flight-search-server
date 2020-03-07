const express = require('express')
const airports = Object.values(require('./airports.json'));
const app = express()
const port = 3000

app.get('/airports', (req, res) => {
  const query = req.query.query;
  if (!query) return res.json([]);

  const pattern = new RegExp(query, 'i')
  return res.json(airports.filter(airport =>
    pattern.test(airport.name) ||
    pattern.test(airport.city) ||
    pattern.test(airport.iata)
  ));
});

app.listen(port, () => console.log(`App listening on port ${port}!`))