// backend/index.js
const express = require('express');
const geoip = require('geoip-lite');
const app = express();

const cors = require('cors');
app.use(cors());


app.use((req, res, next) => {
  try {
    // Extract IP address
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
    
    // Lookup geolocation
    const geo = geoip.lookup(ip);

    // Log the results
    if (geo) {
      console.log('Geo Information:', geo);
    } else {
      console.log('No geolocation data found for IP:', ip);
    }
  } catch (error) {
    console.error('Error during geolocation lookup:', error);
  }
  next();
});


app.get('/api/get-language', (req, res) => {
  res.json({ language: req.userLanguage });
});

// Your other routes and middleware
app.listen(5000, () => {
  console.log('Backend running on port 5000');
});
