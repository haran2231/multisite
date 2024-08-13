// backend/index.js
const express = require('express');
const geoip = require('geoip-lite');
const app = express();

const cors = require('cors');
app.use(cors());


app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip);
  
  // Pass the language to the frontend or store it in session/local storage
  req.userLanguage = geo ? geo.country.toLowerCase() : 'en';
  console.log(geo);
  next();
});

app.get('/api/get-language', (req, res) => {
  res.json({ language: req.userLanguage });
});

// Your other routes and middleware
app.listen(5000, () => {
  console.log('Backend running on port 5000');
});
