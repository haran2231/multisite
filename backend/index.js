// backend/index.js
const express = require('express');
const geoip = require('geoip-lite');
const app = express();

const cors = require('cors');
app.use(cors());


app.use((req, res, next) => {
  try {
    // Extract IP address
    const forwardedFor = req.headers['x-forwarded-for'];
    let ip = forwardedFor ? forwardedFor.split(',')[0].trim() : req.connection.remoteAddress || req.socket.remoteAddress;

    // Check if the IP is private (e.g., 10.x.x.x, 192.168.x.x, etc.)
    const isPrivateIp = ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('172.');

    if (isPrivateIp) {
      console.log('Skipping geolocation for private IP:', ip);
    } else {
      // Lookup geolocation
      const geo = geoip.lookup(ip);
      if (geo) {
        console.log('Geo Information:', geo);
      } else {
        console.log('No geolocation data found for IP:', ip);
      }
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
